import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs';
import { TranslateLoader } from './translate.loader';

export class TranslateHttpLoader implements TranslateLoader {

  constructor(
    private _http: HttpClient, 
    public _prefix: string = "/assets/i18n/", 
    public _suffix: string = ".json"
  ) {}

  /**
   * Gets the translations from the server
   */
  public getTranslation(lang: string): Observable<Object> {
    return this._http.get(`${this._prefix}${lang}${this._suffix}`);
  }
} //Class ends