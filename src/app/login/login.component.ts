import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  username?: string;
  password?: string;

  constructor(private userService: UserService,
    private router: Router) { }

  loginUser() {
    if (!this.username || !this.password) {
      return;
    }
    this.userService.login(this.username, this.password)
      .subscribe(
        response => {
          console.log('Utilisateur connecté avec succès');
          this.username = '';
          this.password = '';
        },
        error => {
          console.log('Erreur lors de la connexion de l\'utilisateur', error);
        }
      )
  }

  goBack() {
    this.router.navigate(['/']);
  }
}