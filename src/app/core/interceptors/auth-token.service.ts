import { HttpContextToken, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from './../../auth/services/auth.service';

export const BYPASS_JW_TOKEN = new HttpContextToken(() => false);

@Injectable({
  providedIn: 'root'
})
export class AuthTokenService implements HttpInterceptor {

  constructor(private authService: AuthService, private _router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (req.context.get(BYPASS_JW_TOKEN) === true) {
      return next.handle(req);
    }

    const authToken = this.authService.getToken();

    const authReq = req.clone({
      setHeaders: { Authorization: 'Bearer ' + authToken },
    });

    return next.handle(authReq).pipe(
      catchError((err: HttpErrorResponse) => {

        if (err.status === 401) {
          this._router.navigateByUrl('/auth/login');
        }

        return throwError(() => new Error('No Autorizado'));

      })
    );
  }
}
