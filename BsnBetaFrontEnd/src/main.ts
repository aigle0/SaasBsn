import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {provideHttpClient, withFetch} from "@angular/common/http";

// @ts-ignore
bootstrapApplication(AppComponent, {appConfig,
providers: [
    (appConfig.providers ?? []), // fusion avec providers existants
    provideHttpClient(withFetch())
]})
  .catch((err) => console.error(err));
