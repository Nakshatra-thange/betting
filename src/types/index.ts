export interface User {
    id: string;
    email: string;
    name?: string;
    plan: 'FREE' | 'PREMIUM';
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface Prediction {
    id: string;
    userId: string;
    sport: string;
    homeTeam: string;
    awayTeam: string;
    prediction: {
      prediction: 'home_win' | 'away_win' | 'draw';
      confidence: number;
      reasoning: string;
      scorePrediction: string;
      keyFactors: string[];
      advancedInsights?: string;
    };
    confidence: number;
    result?: string;
    isCorrect?: boolean;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface AuthResponse {
    user: User;
    token?: string;
    message: string;
  }
  
  export interface PredictionResponse {
    prediction: Prediction['prediction'];
    predictionId: string;
    remainingQueries: number | 'unlimited';
  }