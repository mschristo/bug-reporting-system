import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bug } from '../interfaces/bug';

@Injectable({
  providedIn: 'root'
})
export class BugService {

  constructor(public http: HttpClient) { }

  getBugs(): Observable<Bug[]>{
    return this.http.get<Bug[]>('http://localhost:3000/bugs');
  }
}