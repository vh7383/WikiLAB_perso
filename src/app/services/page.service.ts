import { Injectable } from '@angular/core';
import { environment } from "../environment/environment";
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";
import { Page } from "../models/page.model";

@Injectable({
  providedIn: 'root'
})
export class PageService {
  private apiUrl = `http://${environment.server.host}:${environment.server.port}`
  constructor(private http: HttpClient) { }
  getPages(): Observable<Page[]> {
    return this.http.get<Page[]>(`${this.apiUrl}/pages`);
  }
  getPage(id: string): Observable<Page> {
    return this.http.get<Page>(`${this.apiUrl}/pages/${id}`);
  }
  addPage(page: Page): Observable<Page> {
    return this.http.post<Page>(`${this.apiUrl}/pages`, page);
  }
  updatePage(page: Page): Observable<Page> {
    return this.http.put<Page>(`${this.apiUrl}/pages/${page.id}`, page);
  }
  deletePage(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/pages/${id}`);
  }
  /*
  getFilteredPages(filterType: string): Observable<Page[]> {
    if (filterType === 'all') {
      return this.http.get<Page[]>(`${this.apiUrl}/pages`);
    } else if (filterType === 'projet') {
      return this.http.get<Page[]>(`${this.apiUrl}/pages?type=projet`);
    } else if (filterType === 'recent') {
      return this.http.get<Page[]>(`${this.apiUrl}/pages?type=recent`);
    }
  }
  */
}