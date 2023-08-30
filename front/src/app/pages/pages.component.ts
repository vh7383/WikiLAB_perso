import { Component, OnInit } from '@angular/core';
import { Page } from '../../../../back/models/page.model';
import { PageService } from '../services/page.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  pages: Page[] = [];

  constructor(private pageService: PageService) { }

  ngOnInit(): void {
    this.loadPages();
  }

  loadPages(): void {
    this.pageService.getPages().subscribe(
        pages => this.pages = pages,
        error => console.log(error)
    );
  }
}
