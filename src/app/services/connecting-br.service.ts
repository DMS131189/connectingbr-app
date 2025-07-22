import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";

const API_BASE_URL = "http://localhost:3000";

export interface User {
  id: number;
  name: string;
  surname: string;
  email: string;
  businessName?: string;
  businessDescription?: string;
  photos?: string[];
  website?: string;
  categoryId?: number;
  category?: Category;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
  icon?: string;
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Review {
  id: number;
  rating: number;
  comment?: string;
  reviewerId: number;
  professionalId: number;
  reviewer?: User;
  professional?: User;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  surname: string;
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
  businessName?: string;
  businessDescription?: string;
  photos?: string[];
  website?: string;
}

export interface CreateReviewRequest {
  rating: number;
  comment?: string;
  professionalId: number;
}

export interface AuthResponse {
  message: string;
  user: User;
  token: string;
}

export interface AverageRatingResponse {
  average: number;
  count: number;
}

@Injectable({
  providedIn: "root"
})
export class ConnectingBrService {
  private apiUrl = API_BASE_URL;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem("connectingbr_token");
    return new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": token ? `Bearer ${token}` : ""
    });
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = "An error occurred";
    
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = error.error?.message || `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    
    console.error("API Error:", errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem("connectingbr_token");
  }

  getCurrentUser(): User | null {
    const token = localStorage.getItem("connectingbr_token");
    if (!token) return null;
    
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.user || null;
    } catch {
      return null;
    }
  }

  register(userData: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/register`, userData)
      .pipe(
        map((response: AuthResponse) => {
          if (response.token) {
            localStorage.setItem("connectingbr_token", response.token);
          }
          return response;
        }),
        catchError(this.handleError)
      );
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, credentials)
      .pipe(
        map((response: AuthResponse) => {
          if (response.token) {
            localStorage.setItem("connectingbr_token", response.token);
          }
          return response;
        }),
        catchError(this.handleError)
      );
  }

  logout(): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/auth/logout`, {}, {
      headers: this.getAuthHeaders()
    }).pipe(
      map((response: { message: string }) => {
        localStorage.removeItem("connectingbr_token");
        return response;
      }),
      catchError(this.handleError)
    );
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/category`)
      .pipe(catchError(this.handleError));
  }

  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/category/${id}`)
      .pipe(catchError(this.handleError));
  }

  searchCategories(name: string): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/category/search/${encodeURIComponent(name)}`)
      .pipe(catchError(this.handleError));
  }

  getProfessionals(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/user/professionals`)
      .pipe(catchError(this.handleError));
  }

  searchProfessionals(query: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/user/search?q=${encodeURIComponent(query)}`)
      .pipe(catchError(this.handleError));
  }

  getProfessionalsByCategory(categoryId: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/user/category/${categoryId}`)
      .pipe(catchError(this.handleError));
  }

  getProfessionalById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/user/${id}`)
      .pipe(catchError(this.handleError));
  }

  getReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/review`)
      .pipe(catchError(this.handleError));
  }

  getReviewsByProfessional(professionalId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/review/professional/${professionalId}`)
      .pipe(catchError(this.handleError));
  }

  getAverageRating(professionalId: number): Observable<AverageRatingResponse> {
    return this.http.get<AverageRatingResponse>(`${this.apiUrl}/review/professional/${professionalId}/average`)
      .pipe(catchError(this.handleError));
  }

  createReview(reviewData: CreateReviewRequest): Observable<Review> {
    return this.http.post<Review>(`${this.apiUrl}/review`, reviewData, {
      headers: this.getAuthHeaders()
    }).pipe(catchError(this.handleError));
  }

  updateReview(id: number, reviewData: Partial<CreateReviewRequest>): Observable<Review> {
    return this.http.patch<Review>(`${this.apiUrl}/review/${id}`, reviewData, {
      headers: this.getAuthHeaders()
    }).pipe(catchError(this.handleError));
  }

  deleteReview(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/review/${id}`, {
      headers: this.getAuthHeaders()
    }).pipe(catchError(this.handleError));
  }

  testConnection(): Observable<{ categories: number; professionals: number }> {
    return this.http.get<Category[]>(`${this.apiUrl}/category`).pipe(
      map((categories: Category[]) => ({ categories: categories.length, professionals: 0 })),
      catchError(this.handleError)
    );
  }

  clearAuth(): void {
    localStorage.removeItem("connectingbr_token");
  }
}
