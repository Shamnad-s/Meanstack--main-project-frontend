/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalstoragesService } from './localstorages.service';
import { environment } from '@env/environment';
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private localstorageToken: LocalstoragesService) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const token = this.localstorageToken.getToken();
        const isAPIUrl = request.url.startsWith(environment.apiUrl);

        if (token && isAPIUrl) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }
        return next.handle(request);
    }
}
