import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

interface PredictionRequest {
  sport: string;
  homeTeam: string;
  awayTeam: string;
  matchDate: string;
}

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token');
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token.value, process.env.NEXTAUTH_SECRET!) as any;
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: { dailyQueries: true }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check daily query limit for free users
    if (user.plan === 'FREE') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const dailyQuery = await prisma.dailyQuery.findFirst({
        where: {
          userId: user.id,
          date: {
            gte: today,
            lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
          }
        }
      });

      if (dailyQuery && dailyQuery.count >= 5) {
        return NextResponse.json({ 
          error: 'Daily query limit reached. Upgrade to Premium for unlimited queries.' 
        }, { status: 429 });
      }
    }

    const { sport, homeTeam, awayTeam, matchDate } = await request.json() as PredictionRequest;

    // Get sports data (you can integrate with actual sports APIs)
    const sportsData = await getSportsData(sport, homeTeam, awayTeam);

    // Generate mock AI prediction
    const aiPrediction = await generateAIPrediction(sport, homeTeam, awayTeam, sportsData, user.plan);

    // Save prediction to database
    const prediction = await prisma.prediction.create({
      data: {
        userId: user.id,
        sport,
        homeTeam,
        awayTeam,
        prediction: aiPrediction,
        confidence: aiPrediction.confidence
      }
    });

    // Update daily query count
    if (user.plan === 'FREE') {
      await prisma.dailyQuery.upsert({
        where: {
          userId_date: {
            userId: user.id,
            date: new Date(new Date().setHours(0, 0, 0, 0))
          }
        },
        create: {
          userId: user.id,
          date: new Date(new Date().setHours(0, 0, 0, 0)),
          count: 1
        },
        update: {
          count: { increment: 1 }
        }
      });
    }

    return NextResponse.json({
      prediction: aiPrediction,
      predictionId: prediction.id,
      remainingQueries: user.plan === 'FREE' ? 4 - (user.dailyQueries?.[0]?.count || 0) : 'unlimited'
    });

  } catch (error) {
    console.error('Prediction error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

async function getSportsData(sport: string, homeTeam: string, awayTeam: string) {
  return {
    homeTeam: {
      name: homeTeam,
      recentForm: ['W', 'W', 'L', 'W', 'D'],
      stats: {
        wins: 15,
        losses: 8,
        draws: 2,
        goalsFor: 42,
        goalsAgainst: 28
      }
    },
    awayTeam: {
      name: awayTeam,
      recentForm: ['L', 'W', 'W', 'D', 'L'],
      stats: {
        wins: 12,
        losses: 10,
        draws: 3,
        goalsFor: 35,
        goalsAgainst: 32
      }
    },
    headToHead: {
      totalMeetings: 20,
      homeWins: 8,
      awayWins: 7,
      draws: 5
    }
  };
}

async function generateAIPrediction(
  sport: string, 
  homeTeam: string, 
  awayTeam: string, 
  sportsData: any, 
  userPlan: string
) {
  return {
    prediction: "home_win",
    confidence: 0.88,
    reasoning: `${homeTeam} has a strong recent record and home advantage. ${awayTeam} has struggled defensively in recent matches.`,
    scorePrediction: "2-1",
    keyFactors: [
      "Home team form: 4 wins in last 5",
      "Higher goal conversion rate",
      "Away team injuries"
    ],
    ...(userPlan === 'PREMIUM' && {
      advancedInsights:
        "Expect aggressive pressing from the home team in the first half. Betting tip: Over 2.5 total goals."
    })
  };
}
