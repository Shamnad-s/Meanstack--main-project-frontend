import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PasswordModule } from 'primeng/password';
import { AppComponent } from './app.component';

import { RouterModule, Routes } from '@angular/router';
import { appRoutes } from './app.routes';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AccordionModule } from 'primeng/accordion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { AuthGuard, JwtInterceptor, UsersModule } from '@angular-main-project/users';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ColorPickerModule } from 'primeng/colorpicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';
import { EditorModule } from 'primeng/editor';
import { TagModule } from 'primeng/tag';
import { InputMaskModule } from 'primeng/inputmask';

import { FieldsetModule } from 'primeng/fieldset';
import { CategoriesListComponent } from './categories/categories-list/categories-list.component';
import { CategoriesFormComponent } from './categories/categories-form/categories-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserListComponent } from './ussers/user-list/user-list.component';
import { UserFormComponent } from './ussers/user-form/user-form.component';
import { CategoriesService } from '@angular-main-project/event';

const UX_MODULE = [
    CardModule,
    ToastModule,
    InputTextModule,
    TableModule,
    ToolbarModule,
    ButtonModule,
    ConfirmDialogModule,
    ColorPickerModule,
    InputNumberModule,
    DropdownModule,
    InputTextareaModule,
    InputSwitchModule,
    EditorModule,
    TagModule,
    InputMaskModule,
    FieldsetModule
];

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
            }
        ]
    }
];

@NgModule({
    declarations: [
        AppComponent,

        ShellComponent,
        SidebarComponent,
        DashboardComponent,
        CategoriesListComponent,
        CategoriesFormComponent,
        UserListComponent,
        UserFormComponent
    ],
    imports: [
        PasswordModule,
        BrowserModule,
        RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),
        DropdownModule,
        AccordionModule,
        BrowserAnimationsModule,
        ...UX_MODULE,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        UsersModule
    ],
    providers: [MessageService, ConfirmationService, CategoriesService, { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
    bootstrap: [AppComponent]
})
export class AppModule {}
