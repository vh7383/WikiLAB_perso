import { Component } from '@angular/core';
import { Page } from '../models/page.model';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-page-view',
  templateUrl: './page-view.component.html',
  styleUrls: ['./page-view.component.scss']
})
export class PageViewComponent {

  pages!: Page[];
  valeurTitle!: string;
  valeurContent!: string;
  id!: number;
  page?: Page;

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

  updatePage(id: number, valeurTitle: string, valeurContent: string) {
    this.page = {
      id: id,
      title: valeurTitle,
      content: valeurContent
    };
    this.databaseService.updatePage(this.page).subscribe({
      next: (page) => {
        const index = this.pages.findIndex(p => p.id === page.id);
        this.pages[index] = page;
        console.log('Page mise à jour avec succès');
      },
      error: (error) => console.log(error)
    });
    this.loadPages();
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
    this.loadPages();
  }

}
