import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilterPipe } from './string/filter.pipe';
import { ShortenPipe } from './string/shorten.pipe';
import { NiceDateFormatPipe } from './date/niceformat.date.pipe';
import { RightPadPipe } from './string/right-pad.pipe';
import { LeftPadPipe } from './string/left-pad.pipe';
import { PadPipe } from './string/pad.pipe';
import { SlugifyPipe } from './string/slugify.pipe';
import { ReverseStrPipe } from './string/reverse-str.pipe';
import { RepeatPipe } from './string/repeat.pipe';

export * from './string/pad.pipe';
export * from './string/right-pad.pipe';
export * from './string/left-pad.pipe';
export * from './string/filter.pipe';
export * from './string/shorten.pipe';
export * from './string/slugify.pipe';
export * from './string/repeat.pipe';
export * from './string/reverse-str.pipe';
export * from './date/niceformat.date.pipe';

@NgModule({
  declarations: [
    //Pipes
    PadPipe,
    RightPadPipe,
    LeftPadPipe,
    FilterPipe,
    ShortenPipe,
    SlugifyPipe,
    RepeatPipe,
    ReverseStrPipe,
    NiceDateFormatPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    //Pipes
    PadPipe,
    RightPadPipe,
    LeftPadPipe,
    FilterPipe,
    ShortenPipe,
    SlugifyPipe,
    RepeatPipe,
    ReverseStrPipe,
    NiceDateFormatPipe,
  ]
})
export class PipeModule { }
