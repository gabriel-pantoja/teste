import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token!: string;
  lastUrl!: string;
  constructor(
    private router: Router
  ) {
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.lastUrl = e.url;
      }
    });
  }

  handleLogin(path: string = this.lastUrl): void {
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    this.token = localStorage.getItem('token') || '';
    return this.token !== null;
  }
}
