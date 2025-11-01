import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokenService} from "../token/token.service";

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {

    constructor(
        private tokenService : TokenService
    ) {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        // Do not attach token for auth endpoints
        if (request.url.includes('/auth/')) {
            return next.handle(request);
        }

        const token: string | null = this.tokenService.token;
        if (token) {
            const authReq = request.clone({
                setHeaders: { Authorization: `Bearer ${token}` }
            });
            return next.handle(authReq);
        }
        return next.handle(request);
    }
}