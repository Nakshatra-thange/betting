import { NextRequest } from 'next/server';

const rateLimit = new Map();

export function checkRateLimit(request: NextRequest, limit: number = 10) {
  const ip = request.ip || request.headers.get('X-Forwarded-For') || 'unknown';
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute window
  
  const key = `${ip}:${Math.floor(now / windowMs)}`;
  const current = rateLimit.get(key) || 0;
  
  if (current >= limit) {
    return false;
  }
  
  rateLimit.set(key, current + 1);
  
  // Clean up old entries
  for (const [k, v] of rateLimit.entries()) {
    if (parseInt(k.split(':')[1]) < Math.floor(now / windowMs) - 5) {
      rateLimit.delete(k);
    }
  }
  
  return true;
}