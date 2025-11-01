import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {appConfig} from "./app/app.config";
import {HttpTokenInterceptor} from "./app/services/interceptor/http-token.interceptor";

bootstrapApplication(AppComponent, {
    providers: [
        ...(appConfig.providers ?? []),
        provideHttpClient(withFetch()),
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpTokenInterceptor,
            multi: true
        }
    ]
}).catch(err => console.error(err));
