import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { User } from '../models/user';
import { map } from 'rxjs/operators';
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
}
