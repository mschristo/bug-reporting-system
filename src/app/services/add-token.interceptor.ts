import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class AddTokenInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token = localStorage.getItem('token');
    request = request.clone({
      headers: request.headers.set('Authorization', 'Bearer ' + token)
    });

    return next.handle(request).pipe(
      catchError(error => {
        console.error('Error caught in Interceptor');
        console.error(error);

        if (error instanceof HttpErrorResponse) {
          console.log(`Error Status : ${error.status} ${error.statusText}`);
          switch (error.status) {
            case 401: // unauthorised - req lacks valid auth. credentials
              console.log('Redirect to 401 page');
              break;
            case 403: // unauthorised - Forbidden - no reason to re-auth.
              console.log('Redirect to 403 page');
              break;
          }
        }
         return throwError(() => new Error(`Something went wrong ${error.message}`));
      })
    );
  }
}
