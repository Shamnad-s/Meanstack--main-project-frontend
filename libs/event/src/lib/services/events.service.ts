import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

    getEvents(): Observable<Event[]> {
        return this.http.get<Event[]>(this.apiURLevents);
    }
    createEvent(eventData: FormData): Observable<Event> {
        return this.http.post<Event>(this.apiURLevents, eventData);
    }
    getEvent(eventId: string): Observable<Event> {
        return this.http.get<Event>(`${this.apiURLevents}/${eventId}`);
    }
    updateEvent(eventData: FormData, eventtid: string): Observable<Event> {
        return this.http.put<Event>(`${this.apiURLevents}/${eventtid}`, eventData);
    }
    deleteEvent(eventId: string): Observable<any> {
        return this.http.delete<any>(`${this.apiURLevents}/${eventId}`);
    }
    getEventsCount(): Observable<number> {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return this.http.get<number>(`${this.apiURLevents}/get/count`).pipe(map((objectValue: any) => objectValue.productCount));
    }
}
