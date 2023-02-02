import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Category } from '../../model/category';
import { CategoriesService } from '../../services/categories.service';
import { RouterModule } from '@angular/router';
@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'events-category-banner',
    templateUrl: './categories-banner.component.html',
    styles: []
})
export class CategoriesBannerComponent implements OnInit, OnDestroy {
    constructor(private categoriesService: CategoriesService) {}
    categories: Category[] = [];
    endSubs$: Subject<any> = new Subject();
    ngOnInit(): void {
        this.categoriesService
            .getCategories()
            .pipe(takeUntil(this.endSubs$))
            .subscribe((categories) => {
                this.categories = categories;
            });
    }

    ngOnDestroy(): void {
        this.endSubs$.next(true);
        this.endSubs$.complete();
    }
}
