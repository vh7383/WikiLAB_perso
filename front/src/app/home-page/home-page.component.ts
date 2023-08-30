import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {

  constructor(private userService: UserService) { }

  /*
  onSubmit(): void {
    this.userService.login(this.username, this.password).subscribe(
      response => {
        console.log('Connexion réussie');        
      },
      error => {
        console.log('Echec de la connexion', error);
        
      }
    )
  }
  */
}