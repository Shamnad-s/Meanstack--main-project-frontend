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

    // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
    ngOnInit(): void {
        this._initSignupForm();
    }

    private _initSignupForm() {
        this.signupFormGroup = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            name: ['', Validators.required],
            password: ['', Validators.required],
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
        this.checkEmailTaken(this.signupForm.email.value).subscribe((emailExist) => {
            console.log(emailExist);
            if (!emailExist) {
                const user: User = {
                    id: this.currentUserId,
                    email: this.signupForm.email.value,
                    name: this.signupForm.name.value,
                    password: this.signupForm.password.value,
                    phone: this.signupForm.phone.value,
                    city: this.signupForm.city.value,
                    country: this.signupForm.country.value
                };
                this._createUser(user);
                this.authSuccess = true;
                this.succesAuthMessage = 'User created successfully';
            } else {
                this.authError = true;
                this.secondauthMessage = 'email already exist';
            }
        });
    }
    get signupForm() {
        return this.signupFormGroup.controls;
    }
    private _createUser(user: User) {
        this.userservices.createUser(user).subscribe();
    }
    checkEmailTaken(email: string): Observable<boolean> {
        return this.userservices.checkEmailTaken(email).pipe(
            map((data) => {
                if (data === true) {
                    return true;
                } else {
                    return false;
                }
            })
        );
    }
}
