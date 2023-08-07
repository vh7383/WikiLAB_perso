import { Component, OnInit } from '@angular/core';
import { Page } from "../models/page.model";
import { DatabaseService } from "../services/database.service";

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  pages!: Page[];
  valeurTitle!: string;
  valeurContent!: string;
  id!: number;
  indexOfAppareil!: number;

  constructor(private databaseService: DatabaseService) { }

  ngOnInit(): void {
    this.loadPages();
  }

  loadPages(): void {
    this.databaseService.getPages().subscribe({
      next: (pages) => this.pages = pages,
      error: (error) => console.log(error)
    });
  }

  addPage(title: string, content: string) {
    // @ts-ignore
    const page: Page = { id: null, title, content };
    this.databaseService.addPage(page).subscribe({
      next: (page) => {
        this.pages.push(page);
        this.loadPages();
      },
      error: (error) =>
        console.log('NOK')
    });
  }

  updatePage(page: Page) {
    this.databaseService.updatePage(page).subscribe({
      next: (page) => {
        const index = this.pages.findIndex(p => p.id === page.id);
        this.pages[index] = page;
      },
      error: (error) => console.log(error)
    });
  }

  deletePage(id: number) {
    this.databaseService.deletePage(id).subscribe(
      () => {
        const index = this.pages.findIndex(p => p.id === id);
        if (index !== -1) {
          this.pages.splice(index, 1);
        }
      },
      error => console.log(error)
    );
  }
}
