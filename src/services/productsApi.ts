import { Product } from '../data/products';

const API_BASE_URL = 'https://api-admindev.actecal.com';

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

// Auto-fetch products when service loads
let productsPromise: Promise<Product[]> | null = null;

export const productsApi = {
  /**
   * Fetch products from the API
   */
  async getProducts(): Promise<Product[]> {
    if (!productsPromise) {
      productsPromise = (async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/get-products`);
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const result = await response.json();
          console.log("API Response:", result);

          // Handle both direct array and wrapped response formats
          if (Array.isArray(result)) {
            return result;
          } else if (result.data && Array.isArray(result.data)) {
            return result.data;
          } else {
            throw new Error('Invalid API response format');
          }
        } catch (error) {
          console.error('Error fetching products:', error);

          const { PRODUCTS } = await import('../data/products');
          return PRODUCTS;
        }
      })();
    }
    return productsPromise;
  },
  /**
   * Get a single product by name
   */
  async getProductByName(name: string): Promise<Product | null> {
    const products = await this.getProducts();
    return products.find(p => p.name.toLowerCase() === name.toLowerCase()) || null;
  },

  /**
   * Get products with caching
   */
  async getCachedProducts(): Promise<Product[]> {
    // Check if we have cached data that's less than 5 minutes old
    const cached = localStorage.getItem('products_cache');
    const cacheTime = localStorage.getItem('products_cache_time');
    
    if (cached && cacheTime) {
      const timeDiff = Date.now() - parseInt(cacheTime);
      if (timeDiff < 5 * 60 * 1000) { // 5 minutes
        return JSON.parse(cached);
      }
    }
    
    // Fetch fresh data
    const products = await this.getProducts();
    
    // Cache the results
    localStorage.setItem('products_cache', JSON.stringify(products));
    localStorage.setItem('products_cache_time', Date.now().toString());
    
    return products;
  },

  /**
   * Clear products cache
   */
  clearCache(): void {
    localStorage.removeItem('products_cache');
    localStorage.removeItem('products_cache_time');
  }
};

// Initialize products fetch when service loads
productsApi.getProducts();

export default productsApi;
