import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { usersRoutes } from './lib.routes';
import { LoginComponent } from './pages/login/login.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'sign-up',
        component: SignUpComponent
    }
];
@NgModule({
    imports: [CommonModule, ToastrModule.forRoot(), RouterModule.forChild(routes), InputTextModule, ButtonModule, FormsModule, ReactiveFormsModule],
    declarations: [LoginComponent, SignUpComponent]
})
export class UsersModule {}
