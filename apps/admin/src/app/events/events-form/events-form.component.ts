/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular-main-project/forms';
import { ActivatedRoute } from '@angular/router';
// import { CategoriesService, Product, ProductsService } from '@angular-main-project/events';
import { EventsService } from '@angular-main-project/event';
import { CategoriesService } from '@angular-main-project/event';
import { MessageService } from 'primeng/api';
import { from, Subject, timer } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
// import { firstValueFrom } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Event } from 'libs/event/src/lib/model/event';
// import { Category } from '@angular-main-project/event';
import { FormControlName } from '@angular/forms';
@Component({
    selector: 'angular-main-project-events-form',
    templateUrl: './events-form.component.html',
    styles: []
})
export class EventsFormComponent implements OnInit, OnDestroy {
    editmode = false;
    form: FormGroup;
    isSubmitted = false;
    categories = [];
    imageDisplay: string | ArrayBuffer;
    currentEventId: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    endsubs$: Subject<any> = new Subject();
    constructor(
        private formBuilder: FormBuilder,
        private eventsService: EventsService,
        private categoriesService: CategoriesService,
        private messageService: MessageService,
        private location: Location,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this._initForm();
        this._getCategories();
        this._checkEditMode();
    }
    ngOnDestroy() {
        this.endsubs$.next(true);
        this.endsubs$.complete();
    }

    private _initForm() {
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            brand: ['', Validators.required],
            price: ['', Validators.required],

            category: ['', Validators.required],
            countInStock: ['', Validators.required],
            description: ['', Validators.required],
            richDescription: [''],
            image: ['', Validators.required],
            isFeatured: [false]
        });
    }
    private _getCategories() {
        this.categoriesService
            .getCategories()
            .pipe(takeUntil(this.endsubs$))
            .subscribe((categories) => {
                this.categories = categories;
            });
    }

    private _addEvent(eventData: FormData) {
        this.eventsService
            .createEvent(eventData)
            .pipe(takeUntil(this.endsubs$))
            .subscribe({
                next: (event: Event) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: `Event ${event.name} is created!`
                    });
                    from(timer(2000))
                        .pipe()
                        .subscribe(() => {
                            this.location.back();
                        });
                },
                error: () => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Event is not created!'
                    });
                }
            });
    }
    // private _updateEvent(eventFormData: FormData) {
    //     this.eventsService
    //         .updateEvent(eventFormData, this.currentEventId)
    //         .pipe(takeUntil(this.endsubs$), first())
    //         .subscribe({
    //             next: (response) => {
    //                 console.log(response);
    //                 this.messageService.add({
    //                     severity: 'success',
    //                     summary: 'Success',
    //                     detail: 'Product is updated!'
    //                 });
    //                 this.location.back();
    //             },
    //             error: (error) => {
    //                 console.log(error);

    //                 this.messageService.add({
    //                     severity: 'error',
    //                     summary: 'Error',
    //                     detail: 'Product is not updated!'
    //                 });
    //             }
    //         });
    // }
    private _updateEvent(eventFormData: FormData) {
        this.eventsService
            .updateEvent(eventFormData, this.currentEventId)
            .pipe(takeUntil(this.endsubs$))
            .subscribe({
                next: () => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Product is updated!'
                    });
                    timer(2000)
                        .toPromise()
                        .then(() => {
                            this.location.back();
                        });
                },
                error: () => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Product is not updated!'
                    });
                }
            });
    }

    private _checkEditMode() {
        this.route.params.pipe(takeUntil(this.endsubs$)).subscribe((params) => {
            if (params.id) {
                this.editmode = true;
                this.currentEventId = params.id;
                this.eventsService
                    .getEvent(params.id)
                    .pipe(takeUntil(this.endsubs$))
                    .subscribe((event) => {
                        console.log(event.category.id);

                        this.eventForm.name.setValue(event.name);
                        this.eventForm.category.setValue(event.category.id);
                        this.eventForm.brand.setValue(event.brand);
                        this.eventForm.price.setValue(event.price);
                        this.eventForm.countInStock.setValue(event.countInStock);
                        this.eventForm.isFeatured.setValue(event.isFeatured);
                        this.eventForm.description.setValue(event.description);
                        this.eventForm.richDescription.setValue(event.richDescription);
                        this.imageDisplay = event.image;
                        this.eventForm.image.setValidators([]);
                        this.eventForm.image.updateValueAndValidity();
                    });
            }
        });
    }

    onSubmit() {
        this.isSubmitted = true;
        if (this.form.invalid) {
            console.log('i am stuck');
        }

        const eventFormData = new FormData();
        Object.keys(this.eventForm).map((key) => {
            eventFormData.append(key, this.eventForm[key].value);

            console.log(this.eventForm[key].value);
        });
        if (this.editmode) {
            this._updateEvent(eventFormData);
        } else {
            this._addEvent(eventFormData);
        }
    }
    onCancle() {
        this.location.back();
    }
    onImageUpload(event) {
        console.log(event);

        const file = event.target.files[0];
        if (file) {
            this.form.patchValue({ image: file });
            this.form.get('image').updateValueAndValidity();
            const fileReader = new FileReader();
            fileReader.onload = () => {
                this.imageDisplay = fileReader.result;
            };
            fileReader.readAsDataURL(file);
        }
    }
    get eventForm() {
        return this.form.controls;
    }
}
