import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsSearchComponent } from './components/events-search/events-search.component';
import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';
import { RouterModule } from '@angular/router';
@NgModule({
    imports: [CommonModule],
    declarations: [EventsSearchComponent, CategoriesBannerComponent],
    exports: [EventsSearchComponent, CategoriesBannerComponent]
})

// const routes: Routes = [
//     {
//       path: 'events',
//       component: events
//     },
//     {
//       path: 'category/:categoryid',
//       component: ProductsListComponent
//     },
//     {
//       path: 'products/:productid',
//       component: ProductPageComponent
//     }
//   ];
export class EventModule {}
