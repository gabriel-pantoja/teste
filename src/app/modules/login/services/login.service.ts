import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
  ) { }

  login(login: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${environment.urlApi}/auth/login`, login)
      .pipe(map(res => {
        localStorage.setItem('token', res.token);
      }));
  }

}
