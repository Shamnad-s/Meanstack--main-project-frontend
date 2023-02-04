import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { PasswordModule } from 'primeng/password';
import { AppComponent } from './app.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';

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
import { catchError, retry } from 'rxjs/operators';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ColorPickerModule } from 'primeng/colorpicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';

import { TagModule } from 'primeng/tag';
import { InputMaskModule } from 'primeng/inputmask';

import { FieldsetModule } from 'primeng/fieldset';
import { CategoriesListComponent } from './categories/categories-list/categories-list.component';
import { CategoriesFormComponent } from './categories/categories-form/categories-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserListComponent } from './ussers/user-list/user-list.component';
import { UserFormComponent } from './ussers/user-form/user-form.component';
import { CategoriesService } from '@angular-main-project/event';
import { EventsFormComponent } from './events/events-form/events-form.component';
import { EventsListComponent } from './events/events-list/events-list.component';
import { AppRoutingModule } from './app-routing.module';

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

    TagModule,
    InputMaskModule,
    FieldsetModule
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
        UserFormComponent,
        EventsFormComponent,
        EventsListComponent
    ],
    imports: [
        PasswordModule,
        BrowserModule,

        DropdownModule,
        AccordionModule,
        BrowserAnimationsModule,
        ...UX_MODULE,
        HttpClientModule,
        FormsModule,
        AppRoutingModule,
        ReactiveFormsModule,
        UsersModule,
        ToastrModule.forRoot()
    ],
    providers: [MessageService, ConfirmationService, CategoriesService, { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
    bootstrap: [AppComponent]
})
export class AppModule {}
// , "node_modules/quill/dist/quill.core.css", "node_modules/quill/dist/quill.snow.css"
// "node_modules/quill/dist/quill.js"
// "allowedCommonJsDependencies": ["rxjs-compat"],
