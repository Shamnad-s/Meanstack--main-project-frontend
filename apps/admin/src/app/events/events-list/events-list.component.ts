import { Component, OnInit } from '@angular/core';
import { EventsService } from '@angular-main-project/event';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as events from 'events';
@Component({
    selector: 'angular-main-project-events-list',
    templateUrl: './events-list.component.html',
    styles: []
})
export class EventsListComponent implements OnInit {
    events = [];
    endsubs$: Subject<any> = new Subject();
    constructor(
        private eventsService: EventsService,
        private router: Router,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit(): void {
        this._getEvents();
    }
    ngOnDestroy() {
        this.endsubs$.next(true);
        this.endsubs$.complete();
    }
    private _getEvents() {
        this.eventsService
            .getEvents()

            .subscribe((events) => {
                this.events = events;
            });
    }

    updateEvent(eventid: string) {
        this.router.navigateByUrl(`events/form/${eventid}`);
    }
    deleteEvent(eventId: string) {
        this.confirmationService.confirm({
            message: 'Do you want to delete this Product?',
            header: 'Delete Product',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.eventsService
                    .deleteEvent(eventId)
                    .pipe(takeUntil(this.endsubs$))
                    .subscribe(
                        () => {
                            this._getEvents();
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Success',
                                detail: 'Event is deleted!'
                            });
                        },
                        () => {
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Error',
                                detail: 'Event is not deleted!'
                            });
                        }
                    );
            }
        });
    }
}
