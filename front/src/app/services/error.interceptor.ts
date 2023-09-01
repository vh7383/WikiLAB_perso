import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(catchError((error: HttpErrorResponse) => {
                let errorMessage = '';
                if (error.error instanceof ErrorEvent) {
                    // Erreur côté client
                    errorMessage = `Erreur : ${error.error.message}`;
                } else {
                    // Erreur côté serveur
                    errorMessage = `Code : ${error.status}\nMessage : ${error.message}`;
                }
                // Affichage de l'erreur
                console.log(errorMessage);
                return throwError(errorMessage);
            })
        );
    }
}

