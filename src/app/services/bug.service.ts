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

  addNewBug(bug: Bug) {
    return this.http.post('http://localhost:3000/bugs', bug);
  }

  deleteBug(id: number) {
    return this.http.delete(`http://localhost:3000/bugs/${id}`);
  }
}
