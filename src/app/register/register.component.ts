import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  username?: string;
  password?: string;

  constructor(private userService: UserService,
    private router: Router) { }

  registerUser() {
    if (!this.username || !this.password) {
      return;
    }

    this.userService.register(this.username, this.password)
      .subscribe(
        response => {
          console.log('Utilisateur enregistré avec succès');
          this.username = '';
          this.password = '';
        },
        error => {
          console.log('Erreur lors de l\'enregistrement de l\'utilisateur', error);
        }
      );
  }

  goBack() {
    this.router.navigate(['/']);
  }
}