import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = `http://${environment.server.host}:${environment.server.port}`

  constructor(private http: HttpClient) { }

  // Méthode pour enregistrer un utilisateur
  register(username: string, password: string): Observable<any> {
    const hashedPassword = bcrypt.hashSync(password, 10); // Hashage du mot de passe
    const userData = { username, password: hashedPassword };
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  // Méthode pour vérifier si un utilisateur existe déjà
  checkDuplicateUser(username: string): Observable<boolean> {
    const url = `${this.apiUrl}/checkDuplicateUser/${username}`;
    return this.http.get<boolean>(url);
  }

  // Méthode pour se connecter
  login(username: string, password: string): Observable<User> {
    const loginUrl = `${this.apiUrl}/login`;
    const body = { username, password: password };
    return this.http.post<User>(loginUrl, body);
  }

  // Méthode pour se déconnecter
  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {});
  }
}
