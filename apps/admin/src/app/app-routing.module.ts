import { AuthGuard } from '@angular-main-project/users';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesFormComponent } from './categories/categories-form/categories-form.component';
import { CategoriesListComponent } from './categories/categories-list/categories-list.component';
import { EventsFormComponent } from './events/events-form/events-form.component';
import { EventsListComponent } from './events/events-list/events-list.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ShellComponent } from './shared/shell/shell.component';
import { UserFormComponent } from './ussers/user-form/user-form.component';
import { UserListComponent } from './ussers/user-list/user-list.component';

const routes: Routes = [
    {
        path: '',
        component: ShellComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'categories',
                component: CategoriesListComponent
            },
            {
                path: 'categories/form',
                component: CategoriesFormComponent
            },
            {
                path: 'categories/form/:id',
                component: CategoriesFormComponent
            },
            {
                path: 'users',
                component: UserListComponent
            },
            {
                path: 'users/form',
                component: UserFormComponent
            },
            {
                path: 'users/form/:id',
                component: UserFormComponent
            },
            {
                path: 'events',
                component: EventsListComponent
            },
            {
                path: 'events/form',
                component: EventsFormComponent
            },
            {
                path: 'events/form/:id',
                component: EventsFormComponent
            }
        ]
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' })],
    exports: [RouterModule],
    declarations: [],
    providers: []
})
export class AppRoutingModule {}
