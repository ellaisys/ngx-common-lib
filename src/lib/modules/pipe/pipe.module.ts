import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilterPipe } from './string/filter.pipe';
import { ShortenPipe } from './string/shorten.pipe';
import { NiceDateFormatPipe } from './date/niceformat.date.pipe';

export * from './string/filter.pipe';
export * from './string/shorten.pipe';
export * from './date/niceformat.date.pipe';

@NgModule({
  declarations: [
    //Pipes
    FilterPipe,
    ShortenPipe,
    NiceDateFormatPipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    //Pipes
    FilterPipe,
    ShortenPipe,
    NiceDateFormatPipe,
  ]
})
export class PipeModule { }
