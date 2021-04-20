/**
 * Refer: https://github.com/webcat12345/ngx-intl-tel-input
 */

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NativeElementInjectorDirective } from './directives/native-element-injector.directive';
import { IntlTelInputComponent } from './intl-tel-input.component';

export * from './intl-tel-input.component';
export * from './directives/native-element-injector.directive';
export * from './enums/country-iso.enum';
export * from './enums/search-country-field.enum';
export * from './enums/tooltip-label.enum';
export * from './interfaces/change-data';

export const dropdownModuleForRoot: ModuleWithProviders<BsDropdownModule> = BsDropdownModule.forRoot();
export const tooltipModuleForRoot: ModuleWithProviders<TooltipModule> = TooltipModule.forRoot();

@NgModule({
	declarations: [IntlTelInputComponent, NativeElementInjectorDirective],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		dropdownModuleForRoot,
		tooltipModuleForRoot,
  ],
	exports: [IntlTelInputComponent, NativeElementInjectorDirective],
})
export class IntlTelInputModule {

}
