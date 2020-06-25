import { NgModule, ModuleWithProviders, Provider } from "@angular/core";

import { TranslateLoader, TranslateFakeLoader } from "./commons/translate.loader";
import { TranslateService } from "./services/translate.service";
import { MissingTranslationHandler, FakeMissingTranslationHandler } from "./commons/missing-translation-handler";
import { TranslateParser, TranslateDefaultParser } from "./commons/translate.parser";
import { TranslateCompiler, TranslateFakeCompiler } from "./commons/translate.compiler";
import { TranslateDirective } from "./directives/translate.directive";
import { TranslatePipe } from './pipes/translate.pipe';
import { TranslateStore } from "./commons/translate.store";
import { USE_STORE } from "./services/translate.service";
import { USE_DEFAULT_LANG } from "./services/translate.service";

export * from "./commons/translate.loader";
export * from "./commons/http-loader";
export * from "./services/translate.service";
export * from "./commons/missing-translation-handler";
export * from "./commons/translate.parser";
export * from "./commons/translate.compiler";
export * from "./directives/translate.directive";
export * from "./pipes/translate.pipe";
export * from "./commons/translate.store";

export interface TranslateModuleConfig {
  loader?: Provider;
  compiler?: Provider;
  parser?: Provider;
  missingTranslationHandler?: Provider;
  // isolate the service instance, only works for lazy loaded modules or components with the "providers" property
  isolate?: boolean;
  useDefaultLang?: boolean;
}

@NgModule({
  declarations: [
    TranslatePipe,
    TranslateDirective
  ],
  exports: [
    TranslatePipe,
    TranslateDirective
  ]
})
export class TranslateModule {
  /**
   * Use this method in your root module to provide the TranslateService
   */
  static forRoot(config: TranslateModuleConfig = {}): ModuleWithProviders {
    return {
      ngModule: TranslateModule,
      providers: [
        config.loader || {provide: TranslateLoader, useClass: TranslateFakeLoader},
        config.compiler || {provide: TranslateCompiler, useClass: TranslateFakeCompiler},
        config.parser || {provide: TranslateParser, useClass: TranslateDefaultParser},
        config.missingTranslationHandler || {provide: MissingTranslationHandler, useClass: FakeMissingTranslationHandler},
        TranslateStore,
        {provide: USE_STORE, useValue: config.isolate},
        {provide: USE_DEFAULT_LANG, useValue: config.useDefaultLang},
        TranslateService
      ]
    };
  }

  /**
   * Use this method in your other (non root) modules to import the directive/pipe
   */
  static forChild(config: TranslateModuleConfig = {}): ModuleWithProviders {
    return {
      ngModule: TranslateModule,
      providers: [
        config.loader || {provide: TranslateLoader, useClass: TranslateFakeLoader},
        config.compiler || {provide: TranslateCompiler, useClass: TranslateFakeCompiler},
        config.parser || {provide: TranslateParser, useClass: TranslateDefaultParser},
        config.missingTranslationHandler || {provide: MissingTranslationHandler, useClass: FakeMissingTranslationHandler},
        {provide: USE_STORE, useValue: config.isolate},
        {provide: USE_DEFAULT_LANG, useValue: config.useDefaultLang},
        TranslateService
      ]
    };
  }
}
