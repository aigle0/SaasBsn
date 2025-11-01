import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TokenService {

    private isBrowser(): boolean {
        return typeof window !== 'undefined' && !!window.localStorage;
    }

    set token(token: string) {
        console.log('token:' + token);
        if (this.isBrowser()) {
            localStorage.setItem('token', token);
        }
    }

    get token(): string | null {
        if (this.isBrowser()) {
            return localStorage.getItem('token');
        }
        return null;
    }
}
