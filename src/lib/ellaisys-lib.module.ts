import { NgModule, ModuleWithProviders } from '@angular/core';
import { EllaisysLibComponent } from './ellaisys-lib.component';

//Configuration files
import { HttpConfiguration } from './configurations/http.configuration';

@NgModule({
  declarations: [EllaisysLibComponent],
  imports: [
  ],
  exports: [EllaisysLibComponent]
})
export class EllaisysLibModule { 
  static forRoot(configuration): ModuleWithProviders {
    console.log(configuration);
    return {
      ngModule: EllaisysLibModule,
      providers: [ HttpConfiguration, { provide: 'http_config', useValue: configuration } ]
    };
  } //Method ends

} //Class ends
