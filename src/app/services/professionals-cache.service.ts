import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfessionalsCacheService {
  private apiUrl = `${environment.apiUrl}/user/professionals`;
  private professionals: User[] = [];
  private loaded = false;
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  constructor(private http: HttpClient) {}

  loadAllProfessionals(): Observable<User[]> {
    if (this.loaded && this.professionals.length > 0) {
      return of(this.professionals);
    }

    this.loadingSubject.next(true);
    return this.http.get<User[]>(this.apiUrl).pipe(
      tap(professionals => {
        this.professionals = professionals;
        this.loaded = true;
        this.loadingSubject.next(false);
      })
    );
  }

  getProfessionalById(id: number | string): Observable<User | undefined> {
    const numericId = typeof id === 'string' ? parseInt(id) : id;
    
    if (this.loaded) {
      return of(this.professionals.find(p => p.id === numericId));
    }

    return this.loadAllProfessionals().pipe(
      map(professionals => professionals.find(p => p.id === numericId))
    );
  }

  clearCache(): void {
    this.professionals = [];
    this.loaded = false;
  }
}
