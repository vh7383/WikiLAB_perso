import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    registerForm!: FormGroup;
    duplicateError = false;
    duplicateErrorMessage = 'Cet utilisateur existe déjà.';

    constructor(private formBuilder: FormBuilder,
                private userService: UserService,
                private router: Router) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    // Méthode appelée lors de la soumission du formulaire
    registerUser() {
        if (this.registerForm.invalid) {
            // Afficher des messages d'erreur ou empêcher la soumission
            return;
        }

        const username = this.registerForm.get('username')?.value;
        const password = this.registerForm.get('password')?.value;

        this.userService.checkDuplicateUser(username).subscribe(
            isDuplicate => {
                if (isDuplicate) {
                    // Afficher un message d'erreur à l'utilisateur
                    this.duplicateError = true;
                    this.duplicateErrorMessage = 'Cet utilisateur existe déjà.';
                } else {
                    // Pas de doublon, enregistrer l'utilisateur
                    this.userService.register(username, password).subscribe(
                        error => {
                            console.log('Erreur lors de l\'enregistrement de l\'utilisateur', error);
                            this.duplicateError = false;
                            this.duplicateErrorMessage = '';
                            // Autres actions en cas d'erreur d'enregistrement
                        }
                    );
                }
            },
            error => {
                console.log('Erreur lors de la vérification de l\'utilisateur', error);
                this.duplicateError = false;
                this.duplicateErrorMessage = '';
                // Autres actions en cas d'erreur de vérification
            }
        );
    }


    goBack() {
        this.router.navigate(['/']);
    }
}
