import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../services/database.service';
import { Page } from '../models/page.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-single-page',
  templateUrl: './single-page.component.html',
  styleUrls: ['./single-page.component.scss']
})
export class SinglePageComponent implements OnInit {

  page?: Page;

  constructor(
    private route: ActivatedRoute,
    private databaseService: DatabaseService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadPage();
  }

  loadPage() {
    const id = this.route.snapshot.params['id'];
    this.databaseService.getPage(id).subscribe({
      next: (page) => this.page = page,
      error: (error) => console.log(error)
    });
  }

  goBack() {
    this.router.navigate(['/pages']);
  }
}
