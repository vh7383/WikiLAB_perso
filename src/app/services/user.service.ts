import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = `http://${environment.server.host}:${environment.server.port}`

  constructor(private http: HttpClient) { }

  register(username: string, password: string): Observable<any> {
    const userData = { username, password };
    return this.http.post(`${this.apiUrl}/users`, userData);
  }

  login(username: string, password: string): Observable<User> {
    const loginUrl = `${this.apiUrl}/login`;
    const body = { username, password };
    return this.http.post<User>(loginUrl, body);
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {});
  }
}
