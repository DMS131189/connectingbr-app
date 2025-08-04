import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Service } from '../models/service.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfessionalService {
  private apiUrl = `${environment.apiUrl}/professionals`;

  constructor(private http: HttpClient) {}

  getById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  getServices(professionalId: number): Observable<Service[]> {
    return this.http.get<Service[]>(`${this.apiUrl}/${professionalId}/services`);
  }

  // Busca profissionais com filtros
  search(params: {
    categoryId?: number;
    query?: string;
    minRating?: number;
  }): Observable<User[]> {
    const queryParams = new URLSearchParams();
    
    if (params.categoryId) {
      queryParams.set('categoryId', params.categoryId.toString());
    }
    if (params.query) {
      queryParams.set('query', params.query);
    }
    if (params.minRating) {
      queryParams.set('minRating', params.minRating.toString());
    }

    const queryString = queryParams.toString();
    const url = queryString ? `${this.apiUrl}?${queryString}` : this.apiUrl;

    return this.http.get<User[]>(url);
  }

  // Busca os profissionais em destaque
  getFeatured(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/featured`);
  }

  update(id: number, data: { 
    businessName?: string;
    businessDescription?: string;
    photos?: string;
  }): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/${id}`, data);
  }

  addRating(id: number, rating: number): Observable<{ newRating: number; totalReviews: number }> {
    return this.http.post<{ newRating: number; totalReviews: number }>(
      `${this.apiUrl}/${id}/ratings`,
      { rating }
    );
  }
}
