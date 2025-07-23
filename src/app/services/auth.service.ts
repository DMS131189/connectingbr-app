import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface User {
  id: string;
  email: string;
  name: string;
  type: 'client' | 'provider';
  professionalId?: string; // ID do perfil profissional
}

export interface LoginResponse {
  success: boolean;
  message: string;
  user?: User;
  token?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface BackendLoginResponse {
  success: boolean;
  message: string;
  data?: {
    user: User;
    token: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private apiUrl = 'http://localhost:3000';

  // Mock database of users (fallback)
  private mockUsers: (User & { password: string })[] = [
    {
      id: '1',
      email: 'deyse@test.com',
      password: '123456',
      name: 'Deyse Silva',
      type: 'client'
    },
    {
      id: '2',
      email: 'provider@test.com',
      password: '123456',
      name: 'Maria Santos',
      type: 'provider',
      professionalId: '5' // Salon Maria
    },
    {
      id: '3',
      email: 'admin@connectingbr.com',
      password: 'admin123',
      name: 'Admin User',
      type: 'client'
    },
    {
      id: '4',
      email: 'beauty@test.com',
      password: '123456',
      name: 'Ana Beauty',
      type: 'provider',
      professionalId: '6' // Beauty Studio Ana
    }
  ];

  constructor(private http: HttpClient) {
    // Check if user is already logged in on service initialization
    this.checkStoredAuth();
  }

  /**
   * Login method with backend integration
   */
  login(email: string, password: string): Observable<LoginResponse> {
    // Validate input
    if (!email || !password) {
      return of({
        success: false,
        message: 'Email and password are required'
      });
    }

    if (!this.isValidEmail(email)) {
      return of({
        success: false,
        message: 'Please enter a valid email address'
      });
    }

    const loginData: LoginRequest = {
      email: email.toLowerCase(),
      password: password
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Try backend first, fallback to mock if backend is unavailable
    return this.http.post<BackendLoginResponse>(`${this.apiUrl}/auth/login`, loginData, { headers })
      .pipe(
        map((response: any) => {
          debugger;
         
            const userProfile = response?.user;
            const token = response?.token;
            
            // Store authentication
            this.storeAuth(userProfile, token);
            this.currentUserSubject.next(userProfile);

            return {
              success: true,
              message: response.message || 'Login successful',
              user: userProfile,
              token
            };
       
        }),
        catchError((error) => {
          console.warn('Backend login failed, falling back to mock:', error);
          // Fallback to mock login
          return this.mockLogin(email, password);
        })
      );
  }

  /**
   * Mock login method (fallback)
   */
  private mockLogin(email: string, password: string): Observable<LoginResponse> {
    return of(null).pipe(
      delay(1500), // Simulate network delay
      map(() => {
        const user = this.mockUsers.find(u => 
          u.email.toLowerCase() === email.toLowerCase() && u.password === password
        );

        if (user) {
          const userProfile: User = {
            id: user.id,
            email: user.email,
            name: user.name,
            type: user.type
          };

          const token = this.generateToken(user.id);
          
          // Store authentication
          this.storeAuth(userProfile, token);
          this.currentUserSubject.next(userProfile);

          return {
            success: true,
            message: 'Login successful (mock)',
            user: userProfile,
            token
          };
        } else {
          return {
            success: false,
            message: 'Invalid email or password'
          };
        }
      })
    );
  }

  /**
   * Register new user
   */
  register(email: string, password: string, name: string, type: 'client' | 'provider' = 'client'): Observable<LoginResponse> {
    if (!email || !password || !name) {
      return of({
        success: false,
        message: 'All fields are required'
      });
    }

    if (!this.isValidEmail(email)) {
      return of({
        success: false,
        message: 'Please enter a valid email address'
      });
    }

    if (password.length < 6) {
      return of({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }

    return of(null).pipe(
      delay(1000),
      map(() => {
        // Check if user already exists
        const existingUser = this.mockUsers.find(u => 
          u.email.toLowerCase() === email.toLowerCase()
        );

        if (existingUser) {
          return {
            success: false,
            message: 'User with this email already exists'
          };
        }

        // Generate professional ID for providers
        let professionalId: string | undefined;
        if (type === 'provider') {
          // Generate a new professional ID (in a real app, this would come from the backend)
          const existingProfessionalIds = this.mockUsers
            .filter(u => u.professionalId)
            .map(u => parseInt(u.professionalId!))
            .sort((a, b) => b - a);
          
          const nextId = existingProfessionalIds.length > 0 ? existingProfessionalIds[0] + 1 : 14;
          professionalId = nextId.toString();
        }

        // Create new user
        const newUser: User & { password: string } = {
          id: (this.mockUsers.length + 1).toString(),
          email: email.toLowerCase(),
          password,
          name,
          type,
          professionalId
        };

        this.mockUsers.push(newUser);

        const userProfile: User = {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          type: newUser.type,
          professionalId: newUser.professionalId
        };

        const token = this.generateToken(newUser.id);
        
        // Store authentication
        this.storeAuth(userProfile, token);
        this.currentUserSubject.next(userProfile);

        return {
          success: true,
          message: 'Account created successfully',
          user: userProfile,
          token
        };
      })
    );
  }

  /**
   * Logout user
   */
  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('current_user');
    this.currentUserSubject.next(null);
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token') && !!this.currentUserSubject.value;
  }

  /**
   * Get current user
   */
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * Get professional ID for current user
   */
  getProfessionalId(): string | null {
    const user = this.getCurrentUser();
    return user?.professionalId || null;
  }

  /**
   * Check if current user is a professional
   */
  isProfessional(): boolean {
    const user = this.getCurrentUser();
    return user?.type === 'provider';
  }

  /**
   * Validate email format
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Generate mock JWT token
   */
  private generateToken(userId: string): string {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({ 
      userId, 
      exp: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
    }));
    const signature = btoa('mock_signature');
    return `${header}.${payload}.${signature}`;
  }

  /**
   * Store authentication data
   */
  private storeAuth(user: User, token: string): void {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('current_user', JSON.stringify(user));
  }

  /**
   * Check for stored authentication on app start
   */
  private checkStoredAuth(): void {
    const token = localStorage.getItem('auth_token');
    const userStr = localStorage.getItem('current_user');

    if (token && userStr) {
      try {
        const user: User = JSON.parse(userStr);
        
        // Validate token expiration (mock validation)
        const payload = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Date.now();
        
        if (payload.exp && payload.exp > currentTime) {
          // Token is valid
          this.currentUserSubject.next(user);
        } else {
          // Token expired, clear stored data
          this.logout();
        }
      } catch (error) {
        // Clear invalid stored data
        this.logout();
      }
    }
  }

  /**
   * Clear authentication data - useful for login page
   */
  clearAuth(): void {
    this.logout();
  }
}


