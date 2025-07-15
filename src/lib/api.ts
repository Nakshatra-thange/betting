interface ApiClient {
    auth: {
      login: (email: string, password: string) => Promise<AuthResponse>;
      register: (email: string, password: string, name: string) => Promise<AuthResponse>;
      logout: () => Promise<void>;
    };
    predictions: {
      generate: (data: PredictionRequest) => Promise<PredictionResponse>;
      getHistory: () => Promise<Prediction[]>;
    };
    subscriptions: {
      create: () => Promise<{ subscriptionId: string; clientSecret: string }>;
      cancel: () => Promise<void>;
    };
  }
  
  class ApiClientImpl implements ApiClient {
    private baseUrl: string;
    
    constructor(baseUrl: string = '/api') {
      this.baseUrl = baseUrl;
    }
    
    private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'API request failed');
      }
      
      return response.json();
    }
    
    auth = {
      login: (email: string, password: string) =>
        this.request<AuthResponse>('/auth/login', {
          method: 'POST',
          body: JSON.stringify({ email, password }),
        }),
        
      register: (email: string, password: string, name: string) =>
        this.request<AuthResponse>('/auth/register', {
          method: 'POST',
          body: JSON.stringify({ email, password, name }),
        }),
        
      logout: () =>
        this.request<void>('/auth/logout', { method: 'POST' }),
    };
    
    predictions = {
      generate: (data: PredictionRequest) =>
        this.request<PredictionResponse>('/predictions/generate', {
          method: 'POST',
          body: JSON.stringify(data),
        }),
        
      getHistory: () =>
        this.request<Prediction[]>('/predictions/history'),
    };
    
    subscriptions = {
      create: () =>
        this.request<{ subscriptionId: string; clientSecret: string }>('/subscriptions/create', {
          method: 'POST',
        }),
        
      cancel: () =>
        this.request<void>('/subscriptions/cancel', { method: 'POST' }),
    };
  }
  
  export const apiClient = new ApiClientImpl();