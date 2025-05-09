export function average(prices: number[]): number {
    return prices.reduce((a, b) => a + b, 0) / prices.length;
  }
  
  export function standardDeviation(prices: number[]): number {
    const mean = average(prices);
    const variance = prices.reduce((sum, p) => sum + (p - mean) ** 2, 0) / (prices.length - 1);
    return Math.sqrt(variance);
  }
  
  export function covariance(x: number[], y: number[]): number {
    const meanX = average(x);
    const meanY = average(y);
    const cov = x.reduce((sum, xi, i) => sum + (xi - meanX) * (y[i] - meanY), 0);
    return cov / (x.length - 1);
  }
  
  export function correlation(x: number[], y: number[]): number {
    return covariance(x, y) / (standardDeviation(x) * standardDeviation(y));
  }
  