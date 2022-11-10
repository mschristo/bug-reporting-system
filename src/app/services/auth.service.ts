import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // use a fake api from reqres

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

    constructor(private http: HttpClient, public router: Router) { }

    register(data: any): Observable<any> {
      const url = 'http://localhost:3000/register';

      return this.http.post<any>(url, data, this.httpOptions).pipe(
        tap(result => this.saveToken(result)),
        catchError(error => throwError(() => `Something went wrong: ${error.message}`))
      );
    }

  login(data: any): Observable<any> {
    const url = 'http://localhost:3000/login';

    return this.http.post<any>(url, data, this.httpOptions).pipe(
      tap(result => this.saveToken(result)),
      catchError(error => throwError(() => `Something went wrong: ${error.message}`))
    );
  }

  // do not forget to open developer's tool and application tab
  // to view the localstorage
  private saveToken(data: any) {
    localStorage.setItem('token', data.accessToken);
  }


  logout() {
    localStorage.clear(); // removeItem
    this.router.navigate(['login']);
  }
}
