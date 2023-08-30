import { Injectable } from '@angular/core';
import { environment } from "../../../../back/environment/environment";
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";
import { Page } from "../../../../back/models/page.model";

@Injectable({
  providedIn: 'root'
})
export class PageService {
  private apiUrl = `http://${environment.server.host}:${environment.server.port}`

  constructor(private http: HttpClient) {
  }

  getPages(): Observable<Page[]> {
    return this.http.get<Page[]>(`${this.apiUrl}/pages`);
  }

  getPage(id: string): Observable<Page> {
    return this.http.get<Page>(`${this.apiUrl}/pages/${id}`);
  }

  addPage(title: string, content: string) {
    const body = {
      title,
      content
    };
    console.log("Title type:", typeof title);
    console.log("Content type:", typeof content);
    return this.http.post(`${this.apiUrl}/pages`, body);
  }

  updatePage(page: Page): Observable<Page> {
    return this.http.put<Page>(`${this.apiUrl}/pages/${page.id}`, page);
  }

  deletePage(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/pages/${id}`);
  }
}