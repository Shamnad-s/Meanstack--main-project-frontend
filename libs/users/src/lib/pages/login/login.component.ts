import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

import { LocalstoragesService } from '../../services/localstorages.service';
@Component({
    selector: 'angular-main-project-login',
    templateUrl: './login.component.html',
    styles: []
})
export class LoginComponent implements OnInit {
    loginFormGroup: FormGroup;
    isSubmitted = false;
    authError = false;
    authMessage = 'Email or Password are wrong';
    ngOnInit(): void {
        this._initLoginForm();
    }
    constructor(private formBuilder: FormBuilder, private auth: AuthService, private localstorageService: LocalstoragesService, private router: Router) {}
    private _initLoginForm() {
        this.loginFormGroup = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    onSubmit() {
        this.isSubmitted = true;

        if (this.loginFormGroup.invalid) return;

        this.auth.login(this.loginForm.email.value, this.loginForm.password.value).subscribe(
            (user) => {
                this.authError = false;
                this.localstorageService.setToken(user.token);
                this.router.navigate(['/categories']);
            },
            (error: HttpErrorResponse) => {
                this.authError = true;
                if (error.status !== 400) {
                    this.authMessage = 'Error in the Server, please try again later!';
                }
            }
        );
    }
    get loginForm() {
        return this.loginFormGroup.controls;
    }
}
