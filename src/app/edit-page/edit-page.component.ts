import { Component } from '@angular/core';
import '../config/tinymce-config.js';

@Component({
    selector: 'app-edit-page',
    templateUrl: './edit-page.component.html',
    styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent {

    public text: string = '';


}