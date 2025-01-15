import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Jersey } from '../models/Jersey';
import { Jerseys } from '../models/Jerseys';
import { Cart } from '../models/Cart';
import { Users } from '../models/Users';
import { Statistics} from '../models/Statistics';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000';
  private http = inject(HttpClient);
  private currentUser: Users | null = null;
  private sessionId: string;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.loadCurrentUser();
  }

  private generateSessionId(): string {
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  getSessionId(): string {
    return this.sessionId;
  }

  private loadCurrentUser(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this.currentUser = JSON.parse(user);
      console.log('Usuario cargado desde localStorage:', this.currentUser);
      if (this.currentUser) {
        console.log('ID de usuario:', this.currentUser._id); // Agrega esta línea
      }
    } else {
      console.log('No hay usuario en localStorage.');
    }
  }

  createUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Users/register`, userData);
  }

  login(userData: any): Observable<Users> {
    return this.http.post<any>(`${this.apiUrl}/Users/loginPlain`, userData).pipe(
      map(response => {
        const user = response.user; // Asegúrate de que la propiedad 'user' existe
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUser = user;
        console.log('ID de usuario:', user.userId); // Asegúrate de registrar el ID del usuario
        return user;
      })
    );
  }

  createStatistic(statistics: any): Observable<any> {
    return this.http.post<Statistics>(`${this.apiUrl}/Statistics`, statistics);
  }

  getLastStatistics(filters: { dataInici?: string; dataFinal?: string; llocEvent?: string; tipusEvent?: string } = {}): Observable<Statistics[]> {
    return this.http.get<Statistics[]>(`${this.apiUrl}/Statistics/last`, { params: filters });
  }

  createJersey(jersey: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Jerseys`, jersey);
  }

  getAllJerseys(): Observable<Jerseys> {
    return this.http.get<Jerseys>(`${this.apiUrl}/Jerseys`);
  }

  getJerseyById(id: string): Observable<Jersey> {
    return this.http.get<Jersey>(`${this.apiUrl}/Jerseys/${id}`);
  }

  getJerseyByLeague(league: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/Jerseys/league/${league}`);
  }

  getJerseyByTeam(team: string): Observable<Jersey[]> {
    return this.http.get<Jersey[]>(`${this.apiUrl}/Jerseys/team/${team}`);
  }

  getCartByUser(userId: string): Observable<Cart> {
    return this.http.get<Cart>(`${this.apiUrl}/cart/${userId}`);
  }

  addToCart(cart: { userId: string; jerseyId: string; quantity: number }): Observable<any> {
    return this.http.post(`${this.apiUrl}/cart/${cart.jerseyId}`, {
      userId: cart.userId,
      quantity: cart.quantity
    });
  }

  deleteFromCart(jerseyId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/cart/${jerseyId}`);
  }

  createCart(cart: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/cart`, cart);
  }

  updateCartItem(item: { userId: string; jerseyId: string; quantity: number }): Observable<any> {
    return this.http.put(`${this.apiUrl}/cart/${item.jerseyId}`, item);
  }

  isLoggedIn(): boolean {
    const user = this.getLoggedInUser();
    console.log('Usuario autenticado:', user);
    return !!user;
  }

  getLoggedInUser(): Users | null {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    console.log('Usuario obtenido:', user);
    return user;
  }

  logout(): void {
    localStorage.removeItem('user');
    this.currentUser = null;
  }
}
