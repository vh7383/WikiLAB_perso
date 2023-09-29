import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PageService} from "../services/page.service";

@Component({
    selector: 'app-detail-page',
    templateUrl: './detail-page.component.html',
    styleUrls: ['./detail-page.component.scss']
})
export class DetailPageComponent {

    id: string | null = null;
    page: any;

    constructor(private route: ActivatedRoute,
                private pageService: PageService) {
    }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        this.id = id;

        if (this.id !== null) {
            this.loadPage(this.id);
        } else {
            console.log("L'id est null");
        }
    }

    // Utilisez l'ID pour faire un appel API pour récupérer les données de la page
    loadPage(id: string): void {
        this.pageService.getPageById(id).subscribe({
            next: page => this.page = page,
            error: error => console.log(error)
        });
    }
}
