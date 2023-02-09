import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { Category } from '../model/category';
import { environment } from 'environments/environment';
@Injectable({
    providedIn: 'root'
})
export class CategoriesService {
    apiURLCategories = environment.apiUrl + 'categories';
    constructor(private http: HttpClient) {}

    getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(this.apiURLCategories);
    }
    getCategory(categoryId: string): Observable<Category> {
        return this.http.get<Category>(`${this.apiURLCategories}/${categoryId}`);
    }
    updateCategory(category: Category): Observable<Category> {
        return this.http.put<Category>(`${this.apiURLCategories}/` + category.id, category);
    }
    createCategory(category: Category) {
        return this.http.post(`${this.apiURLCategories}`, category);
    }
    deleteCategory(categoryId: string): Observable<Category> {
        return this.http.delete<Category>(`${this.apiURLCategories}/${categoryId}`);
    }
    checkCategoryTaken(name: string): Observable<boolean> {
        return this.http.post<boolean>(`${this.apiURLCategories}/check-category`, { name }).pipe(
            catchError((error) => {
                if (error.error && error.error.categoryExist) {
                    return of(true);
                } else {
                    return of(false);
                }
            })
        );
    }
}
