import { Injectable } from '@angular/core';
import { environment } from '../../../../back/environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User } from '../../../../back/models/user.model';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private readonly apiUrl = `http://${environment.server.host}:${environment.server.port}`

  constructor(private http: HttpClient) { }

  // Méthode pour enregistrer un utilisateur
  register(username: string, password: string): Observable<any> {
    const userData = { username, password };
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  // Méthode pour vérifier si un utilisateur existe déjà
  checkDuplicateUser(username: string): Observable<boolean> {
    const url = `${this.apiUrl}/checkDuplicateUser/${username}`;
    return this.http.get<boolean>(url);
  }

  // Méthode pour se connecter
  login(username: string, password: string): Observable<User> {
    const body = { username, password };
    return this.http.post<User>(`${this.apiUrl}/login`, body).pipe(
        tap(response => {
          if (response.token) {
            localStorage.setItem('access_token', response.token);
          }
        })
    );
  }

  // Méthode pour vérifier si l'utilisateur est authentifié
  isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    return !!token;  // Retourne true si le token existe, sinon false
  }

  // Méthode pour se déconnecter
  logout(): void {
    localStorage.removeItem('access_token');
  }

  // Méthode pour récupérer tous les utilisateurs
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  // Méthode pour récupérer un utilisateur par son ID
  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  }

  // Méthode pour supprimer un utilisateur
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${id}`);
  }
}
