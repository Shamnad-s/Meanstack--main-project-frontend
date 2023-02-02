/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { environment } from 'environments/environment';
import { User } from '../models/user';
import { catchError, map } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
})
export class UsersService {
    apiURLUsers = environment.apiUrl + 'users';
    constructor(private http: HttpClient) {}

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.apiURLUsers);
    }
    getUser(userId: string): Observable<User> {
        return this.http.get<User>(`${this.apiURLUsers}/${userId}`);
    }
    createUser(user: User): Observable<User> {
        return this.http.post<User>(this.apiURLUsers, user);
    }
    newUser(user: User): Observable<User> {
        return this.http.post<User>(this.apiURLUsers, user);
    }
    updateUser(user: User): Observable<User> {
        return this.http.put<User>(`${this.apiURLUsers}/${user.id}`, user);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    deleteUser(userId: string): Observable<any> {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return this.http.delete<any>(`${this.apiURLUsers}/${userId}`);
    }
    getUsersCount(): Observable<number> {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return this.http.get<number>(`${this.apiURLUsers}/get/count`).pipe(map((objectValue: any) => objectValue.userCount));
    }
    // checkEmailExists(email: string) {
    //     return this.http.get(`http://localhost:3000/api/v1/users?email=${email}`).pipe(
    //         catchError((error) => {
    //             if (error.status === 409) {
    //                 return throwError(new Error('Email already exists'));
    //             }
    //             return throwError(new Error('An error occured'));
    //         })
    //     );
    // }

    // checkEmailExists(email: string): Observable<boolean> {
    //     return this.http.get<boolean>(`http://localhost:3000/api/v1/users?email=${email}`).pipe(
    //         map((response) => {
    //             if (response === true) {
    //                 return true;
    //             } else {
    //                 return false;
    //             }
    //         })
    //     );
    // }
    checkEmailTaken(email: string): Observable<boolean> {
        return this.http.post<boolean>(`${this.apiURLUsers}/check-email`, { email }).pipe(
            catchError((error) => {
                if (error.error && error.error.emailExist) {
                    return of(true);
                } else {
                    return of(false);
                }
            })
        );
    }
}
