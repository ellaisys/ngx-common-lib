import { NgModule, ModuleWithProviders, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

//Library Configurations
import { HttpConfiguration } from './configurations/http.configuration';
import { StorageConfiguration } from './configurations/storage.configuration';

//Library Component
import { EllaisysLibComponent } from './ellaisys-lib.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ReadMoreComponent } from './components/readmore/readmore.component';

//Library Services
import { HttpService, RequestInterceptor } from './services/http.service';
import { EventBrokerService } from './services/eventbroker.service';
import { LocalStorageService } from './services/local-storage.service';
import { SessionStorageService } from './services/session-storage.service';

//Library Modules
import { TranslateModule, TranslateLoader } from './modules/translate/translate.module';
import { TranslateHttpLoader } from './modules/translate/commons/http-loader';
import { PipeModule } from './modules/pipe/pipe.module';


//Library Directives
import { IntlPhoneDirective } from './directives/intl-phone/intl-phone.directive';
import { LoggerModule } from './modules/logger/logger.module';
import { ValidatorModule } from './modules/validator/validator.module';


//Initialization Functions
export function initLibrary(_httpConfig: HttpConfiguration, _storageConfig: StorageConfiguration) {
  
  return () => { 
    _httpConfig.init();
    _storageConfig.init();
  };
} //Function ends

//HTTP Loader for I18N
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
} //Function ends


@NgModule({
  declarations: [
    
    //Components
    EllaisysLibComponent,
    LoaderComponent,
    ReadMoreComponent,

    //Directives
    IntlPhoneDirective,
  ],
  imports: [
    HttpClientModule,

    //Boilerplate Modules
    TranslateModule.forChild({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      },
      isolate: false
    }),
    PipeModule,
    LoggerModule,
    ValidatorModule,
  ],
  exports: [
    EllaisysLibComponent,

    //Boilerplate Modules
    TranslateModule,
    PipeModule,
    LoggerModule,
    ValidatorModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true,
    },

    //Services
    EventBrokerService,
    LocalStorageService,
    SessionStorageService,
    HttpService
  ]
})
export class EllaisysLibModule {

  static forRoot(_environment: any): ModuleWithProviders<EllaisysLibModule> {

    //Get Application Environemnt data
    let environment: any = _environment?.env;

    if ((!environment.production) && environment.logs) {
      console.log('ellaisys-lib.environment', environment);
    } //End if
    
    return {
      ngModule: EllaisysLibModule,
      providers: [
        //Configurations
        HttpConfiguration,
        StorageConfiguration,

        { provide: 'environment', useValue: environment },
        { provide: APP_INITIALIZER, useFactory: initLibrary, 
          deps: [
            HttpConfiguration, 
            StorageConfiguration
          ], multi: true 
        },
      ]
    };
  } //Method ends

} //Class ends
