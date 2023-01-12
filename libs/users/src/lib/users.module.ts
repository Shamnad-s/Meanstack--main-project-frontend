import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { usersRoutes } from './lib.routes';
import { LoginComponent } from './pages/login/login.component';

@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [LoginComponent]
})
export class UsersModule {}
