import { useState } from 'react';
import { Prediction, PredictionResponse } from '../types';
import { apiClient } from '../lib/api';

export function usePredictions() {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generatePrediction = async (
    sport: string,
    homeTeam: string,
    awayTeam: string,
    matchDate: string
  ): Promise<PredictionResponse> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiClient.predictions.generate({
        sport,
        homeTeam,
        awayTeam,
        matchDate
      });
      
      // Refresh predictions history
      await loadPredictions();
      
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate prediction';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const loadPredictions = async () => {
    setLoading(true);
    try {
      const response = await apiClient.predictions.getHistory();
      setPredictions(response);
    } catch (err) {
      setError('Failed to load predictions');
    } finally {
      setLoading(false);
    }
  };

  return {
    predictions,
    loading,
    error,
    generatePrediction,
    loadPredictions
  };
}