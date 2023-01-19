/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { LocalstoragesService } from './localstorages.service';
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    apiURLUsers = environment.apiUrl + 'users';
    constructor(private http: HttpClient, private token: LocalstoragesService, private router: Router) {}

    login(email: string, password: string): Observable<User> {
        return this.http.post<User>(`${this.apiURLUsers}/login`, { email, password });
    }

    logout() {
        this.token.removeToken();
        this.router.navigate(['/login']);
    }
}
