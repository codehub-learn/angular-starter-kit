import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SimpleService {
  isLoggedIn = true;

  constructor(private http: HttpClient) { }

  doSomething(): void {}

  getSomething(): Observable<any> {
    return this.http.get('http://www.codehub.gr');
  }

  postSomething(obj?: any): Observable<any> {
    return this.http.post('http://www.codehub.gr', obj ?? {name: 'Fake text'});
  }
}
