import { CategoriesService, Category } from '@angular-main-project/event';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
// import { CategoryServices,Category } from '@angular/core';

@Component({
    selector: 'angular-main-project-categories-list',
    templateUrl: './categories-list.component.html',
    styles: []
})
export class CategoriesListComponent implements OnInit {
    categories: Category[] = [];
    endsubs$: Subject<any> = new Subject();
    constructor(
        private categoriesService: CategoriesService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this._getCategories();
    }
    ngOnDestroy() {
        console.log('destroyed');

        this.endsubs$.next(true);
        this.endsubs$.complete();
    }
    deleteCategory(categoryId: string) {
        this.confirmationService.confirm({
            message: 'Do you want to Delete this Category?',
            header: 'Delete Category',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.categoriesService.deleteCategory(categoryId).subscribe(
                    () => {
                        this._getCategories();
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: 'Category is deleted!'
                        });
                    },
                    () => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Category is not deleted!'
                        });
                    }
                );
            }
        });
    }

    updateCategory(categoryid: string) {
        this.router.navigateByUrl(`categories/form/${categoryid}`);
    }

    private _getCategories() {
        this.categoriesService
            .getCategories()
            .pipe(takeUntil(this.endsubs$))
            .subscribe((cats) => {
                this.categories = cats;
            });
    }
}
