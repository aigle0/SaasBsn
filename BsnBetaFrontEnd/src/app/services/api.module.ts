/* tslint:disable */
/* eslint-disable */
import { NgModule, ModuleWithProviders } from '@angular/core';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';


/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    ApiConfiguration
  ],
})
export class ApiModule {
  static forRoot(params: ApiConfigurationParams): ModuleWithProviders<ApiModule> {
    return {
      ngModule: ApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: params
        }
      ]
    }
  }

}
