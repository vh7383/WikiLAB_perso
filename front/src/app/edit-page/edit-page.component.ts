import { Component } from '@angular/core';
import {PageService} from "../services/page.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
    selector: 'app-edit-page',
    templateUrl: './edit-page.component.html',
    styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent {

    public content!: string;
    public title!: string;
    form!: FormGroup;

    public froalaOptions: any = {
        toolbarButtons: ['bold', 'italic', 'underline'],
        theme: 'gray',
        language: 'fr',
        placeholderText: 'Écrivez quelque chose...'
    };


    constructor(private pageService: PageService,
                private formBuilder: FormBuilder) {
        this.form = this.formBuilder.group({
            title: ['', [Validators.required]],
            content: ['', [Validators.required]]
        });
    }
    savePage() {
        const title = this.form.get('title')?.value;
        const content = this.form.get('content')?.value;
        this.pageService.addPage(title, content).subscribe(response => {
            alert('Page ajoutée avec succès !');
        }, error => {
            console.log('Erreur lors de l’ajout de la page', error);
        });
    }
}