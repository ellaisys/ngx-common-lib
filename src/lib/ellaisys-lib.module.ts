import { NgModule, ModuleWithProviders, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

//Library Configurations
import { HttpConfiguration } from './configurations/http.configuration';
import { StorageConfiguration } from './configurations/storage.configuration';

//Library Component
import { EllaisysLibComponent } from './ellaisys-lib.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ReadMoreComponent } from './components/readmore/readmore.component';

//Library Pipes
import { FilterPipe } from './pipes/string/filter.pipe';
import { ShortenPipe } from './pipes/string/shorten.pipe';
import { NiceDateFormatPipe } from './pipes/date/niceformat.date.pipe';

//Library Services
import { HttpService, RequestInterceptor } from './services/http.service';
import { EventBrokerService } from './services/eventbroker.service';
import { LocalStorageService } from './services/local-storage.service';
import { SessionStorageService } from './services/session-storage.service';

//Initialization Functions
export function initLibrary(_httpConfig: HttpConfiguration, _storageConfig: StorageConfiguration) {
  
  return () => { 
    _httpConfig.init();
    _storageConfig.init();
  };
}


@NgModule({
  declarations: [
    
    //Components
    EllaisysLibComponent,
    LoaderComponent,
    ReadMoreComponent,

    //Pipes
    FilterPipe,
    ShortenPipe,
    NiceDateFormatPipe,
  ],
  imports: [
    HttpClientModule,
  ],
  exports: [
    EllaisysLibComponent
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

    console.log('ellaisys-lib.environment.1', environment);
    if ((!environment.production) && environment.logs) {
      console.log('ellaisys-lib.environment.2', environment);
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
