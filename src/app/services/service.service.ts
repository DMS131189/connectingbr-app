import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Service } from '../models/service.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private apiUrl = `${environment.apiUrl}/services`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Service[]> {
    return this.http.get<Service[]>(this.apiUrl);
  }

  getAllByCategory(categoryId: number): Observable<Service[]> {
    return this.http.get<Service[]>(`${this.apiUrl}?categoryId=${categoryId}`);
  }

  getById(id: string): Observable<Service> {
    return this.http.get<Service>(`${this.apiUrl}/${id}`);
  }

  create(service: Partial<Service>): Observable<Service> {
    return this.http.post<Service>(this.apiUrl, service);
  }

  update(id: string, service: Partial<Service>): Observable<Service> {
    return this.http.put<Service>(`${this.apiUrl}/${id}`, service);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Método auxiliar para buscar serviços com filtros
  search(params: {
    categoryId?: number;
    query?: string;
    minPrice?: number;
    maxPrice?: number;
    minRating?: number;
  }): Observable<Service[]> {
    // Construir query string com os parâmetros fornecidos
    const queryParams = new URLSearchParams();
    
    if (params.categoryId) {
      queryParams.set('categoria', params.categoryId.toString());
    }
    if (params.query) {
      queryParams.set('q', params.query);
    }
    if (params.minPrice) {
      queryParams.set('precoMin', params.minPrice.toString());
    }
    if (params.maxPrice) {
      queryParams.set('precoMax', params.maxPrice.toString());
    }
    if (params.minRating) {
      queryParams.set('avaliacaoMin', params.minRating.toString());
    }

    const queryString = queryParams.toString();
    const url = queryString ? `${this.apiUrl}/search?${queryString}` : `${this.apiUrl}/search`;

    return this.http.get<Service[]>(url);
  }
}
