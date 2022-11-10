import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: any;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, public router: Router) { }

  isQA() {
    return this.user.role = 'qa';
  }

  isDEV() {
    return this.user.role = 'dev';
  }

  isPO() {
    return this.user.role = 'po';
  }

  register(data: any): Observable<any> {
    const url = 'http://localhost:3000/register';

    return this.http.post<any>(url, data, this.httpOptions).pipe(
      tap(result => this.saveUser(result)),
      catchError(error => throwError(() => `Something went wrong: ${error.message}`))
    );
  }

  login(data: any): Observable<any> {
    const url = 'http://localhost:3000/login';

    return this.http.post<any>(url, data, this.httpOptions).pipe(
      tap(result => this.saveUser(result)),
      catchError(error => throwError(() => `Something went wrong: ${error.message}`))
    );
  }

  private saveUser(user: any) {
    this.user = user;
    localStorage.setItem('token', this.user.accessToken);
  }


  logout() {
    localStorage.clear(); // removeItem
    this.router.navigate(['login']);
  }
}
