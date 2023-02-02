import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Category } from '@angular-main-project/event';
import { MessageService } from 'primeng/api';
import { map, Observable, Subject, timer } from 'rxjs';
import { Location } from '@angular/common';

@Component({
    selector: 'angular-main-project-categories-form',
    templateUrl: './categories-form.component.html',
    styles: []
})
export class CategoriesFormComponent implements OnInit {
    form: FormGroup;
    isSubmitted = false;
    editmode = false;
    currentCategoryId: string;
    authError = false;
    authMessage = '';
    endsubs$: Subject<any> = new Subject();
    constructor(
        private messageService: MessageService,
        private formBuilder: FormBuilder,
        private categoriesService: CategoriesService,
        private location: Location,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            icon: ['', Validators.required],
            color: ['#fff']
        });

        this._checkEditMode();
    }

    onSubmit() {
        this.authError = false;
        this.isSubmitted = true;
        if (this.form.invalid) {
            return;
        }
        const category: Category = {
            id: this.currentCategoryId,
            name: this.categoryForm.name.value,
            icon: this.categoryForm.icon.value,
            color: this.categoryForm.color.value
        };
        if (this.editmode) {
            this._updateCategory(category);
        } else {
            this.checkCategoryTaken(this.categoryForm.name.value).subscribe((categoryExist) => {
                if (!categoryExist) {
                    this._addCategory(category);
                } else {
                    this.authError = true;
                    this.authMessage = 'category already exist';
                }
            });
        }
    }

    onCancle() {
        this.location.back();
    }

    private _addCategory(category: Category) {
        this.categoriesService.createCategory(category).subscribe(
            (category: Category) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: `Category ${category.name} is created!`
                });
                timer(2000)
                    .toPromise()
                    .then(() => {
                        this.location.back();
                    });
            },
            () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Category is not created!'
                });
            }
        );
    }

    private _updateCategory(category: Category) {
        this.categoriesService.updateCategory(category).subscribe(
            () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Category is updated!'
                });
                timer(2000)
                    .toPromise()
                    .then(() => {
                        this.location.back();
                    });
            },
            () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Category is not updated!'
                });
            }
        );
    }

    private _checkEditMode() {
        this.route.params.subscribe((params) => {
            if (params.id) {
                this.editmode = true;
                this.currentCategoryId = params.id;
                this.categoriesService.getCategory(params.id).subscribe((category) => {
                    this.categoryForm.name.setValue(category.name);
                    this.categoryForm.icon.setValue(category.icon);
                    this.categoryForm.color.setValue(category.color);
                });
            }
        });
    }

    get categoryForm() {
        return this.form.controls;
    }

    checkCategoryTaken(name: string): Observable<boolean> {
        return this.categoriesService.checkCategoryTaken(name).pipe(
            map((data) => {
                if (data === true) {
                    return true;
                } else {
                    return false;
                }
            })
        );
    }
}
