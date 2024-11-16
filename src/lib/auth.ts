import type { LoginRequest, LoginResponse, User } from '@/models/auth';

const ARTIFICIAL_DELAY = 500;
const TOKEN_KEY = 'wireguard-auth-token';
const USER_KEY = 'wireguard-user';

// Mock user for demo
const mockUser: User = {
  id: '1',
  username: 'admin',
  email: 'admin@example.com',
  role: 'admin',
};

export async function login(credentials: LoginRequest): Promise<LoginResponse> {
  await new Promise(resolve => setTimeout(resolve, ARTIFICIAL_DELAY));

  if (credentials.username === 'admin' && credentials.password === 'admin') {
    const response: LoginResponse = {
      user: mockUser,
      token: 'mock-jwt-token',
    };
    
    localStorage.setItem(TOKEN_KEY, response.token);
    localStorage.setItem(USER_KEY, JSON.stringify(response.user));
    
    return response;
  }

  throw new Error('Invalid credentials');
}

export function logout(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function getStoredAuth(): { user: User | null; token: string | null } {
  const token = localStorage.getItem(TOKEN_KEY);
  const userJson = localStorage.getItem(USER_KEY);
  
  return {
    token,
    user: userJson ? JSON.parse(userJson) : null,
  };
}