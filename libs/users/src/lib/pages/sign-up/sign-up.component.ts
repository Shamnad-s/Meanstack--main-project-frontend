/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { UsersService } from '../../services/user.service';
import { delay, from, map, Observable, of } from 'rxjs';

import { LocalstoragesService } from '../../services/localstorages.service';
@Component({
    selector: 'angular-main-project-sign-up',
    templateUrl: './sign-up.component.html',
    styles: []
})
export class SignUpComponent {
    signupFormGroup: FormGroup;
    isSubmitted = false;
    authError = false;
    succesAuthMessage: string;
    secondauthMessage: string;
    currentUserId: string;
    authSuccess = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private userservices: UsersService,
        private localstorageService: LocalstoragesService
    ) {}

    validatePassword(control: AbstractControl): Observable<{ [key: string]: any } | null> {
        return of('password').pipe(
            map((password) => (control.value === password ? { passwordTaken: true } : null)),
            delay(2000)
        );
    }
    validatePhone(control: AbstractControl): Observable<{ [key: string]: any } | null> {
        return of('1234567890').pipe(
            map((phone) => (control.value === phone ? { phoneTaken: true } : null)),
            delay(2000)
        );
    }

    correctPassword(control: AbstractControl): Observable<{ [key: string]: any } | null> {
        return from(
            new Promise((resolve) => {
                setTimeout(() => {
                    if (!control.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
                        resolve({ invalidPassword: true });
                    } else {
                        resolve(null);
                    }
                }, 2000);
            })
        );
    }

    correctPhonenumber(control: AbstractControl): Observable<{ [key: string]: any } | null> {
        return of(control.value).pipe(
            map((phone) => (!phone.match(/^\d{10}$/) ? { invalidPhone: true } : null)),
            delay(2000)
        );
    }

    // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
    ngOnInit(): void {
        this._initSignupForm();
    }

    private _initSignupForm() {
        this.signupFormGroup = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            name: ['', Validators.required],
            password: ['', Validators.required, this.correctPassword],
            phone: ['', [Validators.required]],
            city: ['', Validators.required],
            country: ['', [Validators.required]]
        });
    }
    onSubmit() {
        this.succesAuthMessage = '';
        this.isSubmitted = true;
        this.authError = false;
        this.succesAuthMessage = '';
        this.secondauthMessage = '';
        if (this.signupFormGroup.invalid) return;
        const user: User = {
            id: this.currentUserId,
            email: this.signupForm.email.value,
            name: this.signupForm.name.value,
            password: this.signupForm.password.value,
            phone: this.signupForm.phone.value,
            city: this.signupForm.city.value,
            country: this.signupForm.country.value
        };
        // this._createUser(user);
        // this._checkEmailExist(this.signupForm.email.value);
        this.userservices.checkEmailExists(user.email).subscribe((response) => {
            if (response === true) {
                this.authError = true;
                this.secondauthMessage = 'Email already exists';
            } else {
                this._createUser(user);
                this.authSuccess = true;
                this.succesAuthMessage = 'User created successfully';
            }
        });
    }
    get signupForm() {
        return this.signupFormGroup.controls;
    }
    private _createUser(user: User) {
        this.userservices.createUser(user).subscribe();
    }
}
