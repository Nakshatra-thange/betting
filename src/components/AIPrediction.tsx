import React, { useState } from 'react';
import { Brain, TrendingUp, Target, Zap } from 'lucide-react';

interface Match {
  id: string;
  title: string;
  teamA: string;
  teamB: string;
  predictedScoreA: number;
  predictedScoreB: number;
  confidence: number;
  category: string;
  matchDate: string;
}

const AIPrediction: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const matches: Match[] = [
    {
      id: '1',
      title: 'Champions League Final',
      teamA: 'Manchester City',
      teamB: 'Real Madrid',
      predictedScoreA: 2,
      predictedScoreB: 1,
      confidence: 87,
      category: 'Football',
      matchDate: '2025-07-15'
    },
    {
      id: '2',
      title: 'NBA Finals Game 7',
      teamA: 'Lakers',
      teamB: 'Celtics',
      predictedScoreA: 108,
      predictedScoreB: 103,
      confidence: 76,
      category: 'Basketball',
      matchDate: '2025-07-20'
    },
    {
      id: '3',
      title: 'World Cup Semifinal',
      teamA: 'Brazil',
      teamB: 'Argentina',
      predictedScoreA: 3,
      predictedScoreB: 2,
      confidence: 92,
      category: 'Football',
      matchDate: '2025-07-25'
    },
    {
      id: '4',
      title: 'Tennis Grand Slam',
      teamA: 'Djokovic',
      teamB: 'Alcaraz',
      predictedScoreA: 3,
      predictedScoreB: 1,
      confidence: 68,
      category: 'Tennis',
      matchDate: '2025-07-30'
    },
    {
      id: '5',
      title: 'Formula 1 Grand Prix',
      teamA: 'Verstappen',
      teamB: 'Hamilton',
      predictedScoreA: 1,
      predictedScoreB: 2,
      confidence: 84,
      category: 'Racing',
      matchDate: '2025-08-05'
    },
    {
      id: '6',
      title: 'Cricket World Cup',
      teamA: 'India',
      teamB: 'Australia',
      predictedScoreA: 287,
      predictedScoreB: 275,
      confidence: 79,
      category: 'Cricket',
      matchDate: '2025-08-10'
    }
  ];

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 85) return 'from-emerald-500 to-green-400';
    if (confidence >= 70) return 'from-yellow-500 to-orange-400';
    return 'from-red-500 to-pink-400';
  };

  const getConfidenceIcon = (confidence: number) => {
    if (confidence >= 85) return <Target className="w-4 h-4" />;
    if (confidence >= 70) return <TrendingUp className="w-4 h-4" />;
    return <Zap className="w-4 h-4" />;
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Football': return '⚽';
      case 'Basketball': return '🏀';
      case 'Tennis': return '🎾';
      case 'Racing': return '🏎️';
      case 'Cricket': return '🏏';
      default: return '🏆';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-500/30 rounded-full px-6 py-3 mb-6">
            <Brain className="w-6 h-6 text-purple-400" />
            <span className="text-purple-300 font-medium">Powered by Advanced AI</span>
          </div>
          
          <h1 className="text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-4">
            AI Predictions
          </h1>
          
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Advanced machine learning algorithms analyze thousands of data points to predict match outcomes with unprecedented accuracy.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {matches.map((match) => (
            <div
              key={match.id}
              className={`group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 cursor-pointer ${
                hoveredCard === match.id ? 'ring-2 ring-purple-500/50' : ''
              }`}
              onMouseEnter={() => setHoveredCard(match.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Animated Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Category Badge */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 bg-slate-700/50 rounded-full px-4 py-2">
                  <span className="text-2xl">{getCategoryIcon(match.category)}</span>
                  <span className="text-sm font-medium text-slate-300">{match.category}</span>
                </div>
                <div className="text-xs text-slate-400">{match.matchDate}</div>
              </div>

              {/* Match Title */}
              <h3 className="text-2xl font-bold text-white mb-8 group-hover:text-purple-200 transition-colors duration-300">
                {match.title}
              </h3>

              {/* Teams and Scores */}
              <div className="space-y-6 mb-8">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="text-lg font-semibold text-white mb-1">{match.teamA}</div>
                    <div className="text-sm text-slate-400">Team A</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-4xl font-bold text-green-400">{match.predictedScoreA}</div>
                    <div className="text-slate-500 text-2xl">:</div>
                    <div className="text-4xl font-bold text-red-400">{match.predictedScoreB}</div>
                  </div>
                  <div className="flex-1 text-right">
                    <div className="text-lg font-semibold text-white mb-1">{match.teamB}</div>
                    <div className="text-sm text-slate-400">Team B</div>
                  </div>
                </div>
              </div>

              {/* Winner Prediction */}
              <div className="bg-slate-700/30 rounded-2xl p-4 mb-6">
                <div className="text-sm text-slate-400 mb-2">AI Predicted Winner</div>
                <div className="text-xl font-bold text-white">
                  {match.predictedScoreA > match.predictedScoreB ? match.teamA : match.teamB}
                </div>
              </div>

              {/* Confidence Level */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getConfidenceIcon(match.confidence)}
                    <span className="text-sm font-medium text-slate-300">AI Confidence</span>
                  </div>
                  <span className="text-lg font-bold text-white">{match.confidence}%</span>
                </div>
                
                <div className="w-full bg-slate-700/50 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${getConfidenceColor(match.confidence)} transition-all duration-1000 ease-out rounded-full relative`}
                    style={{ width: `${match.confidence}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Floating Animation Dots */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Stats */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-8 bg-slate-800/50 backdrop-blur-sm rounded-2xl px-8 py-4 border border-slate-700/50">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">98.7%</div>
              <div className="text-sm text-slate-400">Accuracy Rate</div>
            </div>
            <div className="w-px h-12 bg-slate-700" />
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-400">1.2M+</div>
              <div className="text-sm text-slate-400">Predictions Made</div>
            </div>
            <div className="w-px h-12 bg-slate-700" />
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">24/7</div>
              <div className="text-sm text-slate-400">AI Monitoring</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIPrediction;