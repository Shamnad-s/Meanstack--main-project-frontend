import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Event } from '../model/event';
import { environment } from 'environments/environment';
import { Routes } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class EventsService {
    apiURLevents = environment.apiUrl + 'event';
    constructor(private http: HttpClient) {}

    getEvents(categoriesFilter?: string[]): Observable<Event[]> {
        let params = new HttpParams();
        if (categoriesFilter) {
            params = params.append('categories', categoriesFilter.join(','));
        }
        return this.http.get<Event[]>(this.apiURLevents, { params: params });
    }
    createEvent(eventData: FormData): Observable<Event> {
        return this.http.post<Event>(this.apiURLevents, eventData);
    }
    getEvent(eventId: string): Observable<Event> {
        return this.http.get<Event>(`${this.apiURLevents}/${eventId}`);
    }
    updateEvent(eventData: FormData, eventid: string): Observable<Event> {
        return this.http.put<Event>(`${this.apiURLevents}/${eventid}`, eventData);
    }
    deleteEvent(eventId: string): Observable<any> {
        return this.http.delete<any>(`${this.apiURLevents}/${eventId}`);
    }
    getEventsCount(): Observable<number> {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return this.http.get<number>(`${this.apiURLevents}/get/count`).pipe(map((objectValue: any) => objectValue.productCount));
    }
    getFeaturedEvents(count: number): Observable<Event[]> {
        return this.http.get<Event[]>(`${this.apiURLevents}/get/featured/${count}`);
    }
}
