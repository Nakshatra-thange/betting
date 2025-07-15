'use client';

import React, { useState } from 'react';
import { Brain, TrendingUp, Target, Zap } from 'lucide-react';

interface Prediction {
  predictedScoreA: number;
  predictedScoreB: number;
  prediction: 'home_win' | 'away_win' | 'draw';
  confidence: number;
  reasoning: string;
  scorePrediction: string;
  keyFactors: string[];
  advancedInsights?: string;
}

const AIPrediction: React.FC = () => {
  const [homeTeam, setHomeTeam] = useState('');
  const [awayTeam, setAwayTeam] = useState('');
  const [sport, setSport] = useState('Football');
  const [matchDate, setMatchDate] = useState('');
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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

  return (
    <div id='pred'
    className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-500/30 rounded-full px-6 py-3 mb-6">
            <Brain className="w-6 h-6 text-purple-400" />
            <span className="text-purple-300 font-medium">Powered by Advanced AI</span>
          </div>

          <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-4">
            AI Predictions
          </h1>

          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Input your match details and let AI predict the outcome based on historical data and team dynamics.
          </p>
        </div>

        {/* Prediction Form */}
        <div className="mb-10 p-6 bg-slate-800/30 rounded-2xl shadow-lg">
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setLoading(true);
              setError('');
              setPrediction(null);
              try {
                const res = await fetch('/api/predictions/generate', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ sport, homeTeam, awayTeam, matchDate }),
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || 'Prediction failed');
                setPrediction(data.prediction);
              } catch (err: any) {
                setError(err.message || 'Unexpected error');
              } finally {
                setLoading(false);
              }
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <input
              className="p-3 rounded bg-slate-700/50 text-white placeholder:text-slate-400"
              placeholder="Home Team"
              value={homeTeam}
              onChange={(e) => setHomeTeam(e.target.value)}
              required
            />
            <input
              className="p-3 rounded bg-slate-700/50 text-white placeholder:text-slate-400"
              placeholder="Away Team"
              value={awayTeam}
              onChange={(e) => setAwayTeam(e.target.value)}
              required
            />
            <input
              type="date"
              className="p-3 rounded bg-slate-700/50 text-white"
              value={matchDate}
              onChange={(e) => setMatchDate(e.target.value)}
              required
            />
            <select
              className="p-3 rounded bg-slate-700/50 text-white"
              value={sport}
              onChange={(e) => setSport(e.target.value)}
            >
              <option value="Football">Football</option>
              <option value="Basketball">Basketball</option>
              <option value="Cricket">Cricket</option>
              <option value="Tennis">Tennis</option>
              <option value="Racing">Racing</option>
            </select>
            <button
              type="submit"
              className="col-span-full py-3 mt-2 bg-purple-600 hover:bg-purple-700 rounded text-white font-semibold"
            >
              {loading ? 'Predicting...' : 'Generate Prediction'}
            </button>
            {error && <p className="col-span-full text-red-400">{error}</p>}
          </form>
        </div>

        {/* Prediction Result */}
        {prediction && (
          <div className="bg-slate-800/40 rounded-3xl p-8 border border-slate-700/40">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 bg-slate-700/50 rounded-full px-4 py-2">
                <span className="text-sm text-slate-300 font-medium">{sport}</span>
              </div>
              <div className="text-xs text-slate-400">{matchDate}</div>
            </div>

            <h2 className="text-2xl font-bold text-white mb-4">
              {homeTeam} vs {awayTeam}
            </h2>

            <div className="flex items-center justify-between mb-6">
              <div className="text-center">
                <div className="text-lg text-white">{homeTeam}</div>
                <div className="text-4xl font-bold text-green-400">{prediction.predictedScoreA}</div>
              </div>
              <div className="text-slate-500 text-2xl">:</div>
              <div className="text-center">
                <div className="text-lg text-white">{awayTeam}</div>
                <div className="text-4xl font-bold text-red-400">{prediction.predictedScoreB}</div>
              </div>
            </div>

            <div className="bg-slate-700/30 rounded-2xl p-4 mb-4">
              <div className="text-sm text-slate-400 mb-1">Predicted Winner</div>
              <div className="text-xl font-bold text-white">
                {prediction.predictedScoreA > prediction.predictedScoreB
                  ? homeTeam
                  : prediction.predictedScoreB > prediction.predictedScoreA
                  ? awayTeam
                  : 'Draw'}
              </div>
            </div>

            <div className="mb-3 flex items-center gap-2 text-sm text-slate-300">
              {getConfidenceIcon(prediction.confidence * 100)}
              <span>AI Confidence: {Math.round(prediction.confidence * 100)}%</span>
            </div>

            <div className="w-full bg-slate-700/50 rounded-full h-3 overflow-hidden mb-6">
              <div
                className={`h-full bg-gradient-to-r ${getConfidenceColor(prediction.confidence * 100)} rounded-full`}
                style={{ width: `${prediction.confidence * 100}%` }}
              />
            </div>

            <p className="text-sm text-slate-400 italic mb-3">{prediction.reasoning}</p>

            <ul className="list-disc pl-6 text-slate-300 text-sm space-y-1">
              {prediction.keyFactors.map((factor, idx) => (
                <li key={idx}>{factor}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIPrediction;
