import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

//Boilerplate files
import { HttpConfiguration, IRequestParam } from '../configurations/http.configuration';
import { SessionStorageService } from './session-storage.service';
import { Observable } from 'rxjs';
import { StorageConfiguration } from '../configurations/storage.configuration';

export enum ContentType {
    NOTHING = "_NOTHING OPTION",
    ENCODED_FORM_DATA = "_ENCODED_FORM_OPTION",
    JSON_DATA = "_JSON_HEADER_OPTION",
    FORM_DATA = "_MULTIPART_MIXED_OPTION",
    FORM_DATA_MULTIPART_NIXED = "_MULTIPART_MIXED_OPTION",
    CUSTOM = "_CUSTOM_OPTION"
} //Enum End

const _ENCODED_FORM_OPTION: Object = {
    headers: new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded')
};
const _JSON_HEADER_OPTION: Object = {
    headers: new HttpHeaders().append('Content-Type', 'application/json')
};
const _MULTIPART_MIXED_OPTION = {
    headers: new HttpHeaders().append('Content-Type', 'multipart/mixed')
};

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    private endpoint: string | null;


    /**
     * Default constructor
     */
    constructor(
        private _http: HttpClient
    ) { 
        this.endpoint = (HttpConfiguration.server as string) + (HttpConfiguration.apiUrl as string); 
    }


    /**
     * Convert the object into Http Params
     * 
     * @param _data 
     */
    private getParams(data: any): HttpParams | null {
        let params: HttpParams | null;
        const _data: any = data;

        if (_data) {
            params = new HttpParams();
            Object.keys(_data).forEach((key: string) => {
                if (_data.hasOwnProperty(key)) {
                    if (params) {
                        params = params.append(key, _data[key]);
                    } //End if
                } //End if
            });

            return params;
        } else {
            return null;
        } //End if
    } //Function ends


    /**
     * This method GET the data
     * 
     * @param uri
     */
    public get<T>(_uri: string, _onlyServerURL: boolean = false, _params: Object | null = null, _encoded: boolean = false, _download: boolean = false): Observable<T> {
        //Set URL endpoint
        let url: string = ((_onlyServerURL) ? HttpConfiguration.server : this.endpoint) + _uri;

        //Set Content type option
        let options: Object | any = (_encoded) ? _ENCODED_FORM_OPTION : _JSON_HEADER_OPTION;

        //Add params if exists
        if (_params) {
            if (_params instanceof HttpParams) {
                options.params = _params;
            } else if (_params instanceof Object) {
                options.params = this.getParams(_params);
            } else {
                //Do nothing
            } //End if
        } //End if

        //Add download response params
        if (_download) {
            options.reportProgress = true;
            options.responseType = 'blob';
        } //End if

        return this._http.get<T>(url, (options as Object));
    } //Function ends


    /**
     * This method POST the data and body
     * 
     * @param uri 
     * @param body
     * @param encoded
     * @param onlyServerURL
     */
    public post<T>(_uri: string, _body: any, _onlyServerURL: boolean = false, _params: Object | null = null, _contentType: ContentType = ContentType.JSON_DATA, _contentTyeCustom: string | null = null): Observable<T> {
        //Set URL endpoint
        let url: string = ((_onlyServerURL) ? HttpConfiguration.server : this.endpoint) + _uri;

        //Set Content type option
        let options: Object = this.getContentTypeOptions(_contentType, _contentTyeCustom);

        //Add params if exists
        if (_params) {
            if (_params instanceof HttpParams) {
                (options as any).params = _params;
            } else if (_params instanceof Object) {
                (options as any).params = this.getParams(_params);
            } else {
                //Do nothing
            } //End if
        } //End if

        return this._http.post<T>(url, _body, options);
    } //Function ends


    /**
     * This method PUT the data and body
     * 
     * @param uri 
     * @param body
     */
    public put<T>(_uri: string, _body: any, _params: Object | null = null) {
        let url = this.endpoint + _uri;
        let options: Object = _JSON_HEADER_OPTION;

        //Add params if exists
        if (_params) {
            if (_params instanceof HttpParams) {
                (options as any).params = _params;
            } else if (_params instanceof Object) {
                (options as any).params = this.getParams(_params);
            } else {
                //Do nothing
            } //End if
        } //End if 

        return this._http.put<T>(url, _body, options);
    } //Function ends


    /**
     * This method DELETE the data
     * 
     * @param uri
     */
    public delete<T>(_uri: string, _params: Object | null = null) {
        let url = this.endpoint + _uri;
        let options: Object = _JSON_HEADER_OPTION;

        //Add params if exists
        if (_params) {
            if (_params instanceof HttpParams) {
                (options as any).params = _params;
            } else if (_params instanceof Object) {
                (options as any).params = this.getParams(_params);
            } else {
                //Do nothing
            } //End if
        } //End if

        return this._http.delete<T>(url, options);
    } //Function ends


    /**
     * This method PATCH the data
     * 
     * @param uri
     * @param body
     */
    public async patch<T>(_uri: string, _body: string) {
        let url = this.endpoint + _uri;
        return this._http.patch<T>(url, _body);
    } //Function ends


    /**
     * Configure the Content Type
     * 
     * @param _contentType 
     * @param _contentTyeCustom 
     */
    private getContentTypeOptions(_contentType: ContentType = ContentType.JSON_DATA, _contentTyeCustom: string | null = null): Object {
        let objReturnValue: Object;
        try {
            //Configure Options params
            switch (_contentType) {
                case ContentType.NOTHING:
                    objReturnValue = {};
                    break;
                case ContentType.ENCODED_FORM_DATA:
                    objReturnValue = _ENCODED_FORM_OPTION;
                    break;
                case ContentType.FORM_DATA:
                case ContentType.FORM_DATA_MULTIPART_NIXED:
                    objReturnValue = _MULTIPART_MIXED_OPTION;
                    break;
                case ContentType.CUSTOM:
                    objReturnValue = { headers: new HttpHeaders().append('Content-Type', (_contentTyeCustom as string)) };
                    break;
                case ContentType.JSON_DATA:
                default:
                    objReturnValue = _JSON_HEADER_OPTION;
                    break;
            } //End switch
        } catch (error) {
            objReturnValue = {};
        } //Try-catch ends
        return objReturnValue;
    } //Function ends

} //Class ends


@Injectable()
export class RequestInterceptor implements HttpInterceptor {

    /**
     * Default constructor
     */
    constructor(
        private _session: SessionStorageService,
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const _HEADER_TOKEN_KEY: string = HttpConfiguration.headers.token_key;
        const _HEADER_TOKEN_BEARER: string = HttpConfiguration.headers.token_bearer;

        let claim: any = this._session.getItem(StorageConfiguration.SESSION_AUTH_CLAIM_KEY as string);
        //console.log("Result",claim);

        if (claim != null) {
            let _AUTH_TOKEN: string = claim.token;

            let boolNeedsAuthentication: boolean = !(req.url.search('googleapis.com') > 0);
            if (boolNeedsAuthentication) {
                // if (!req.headers.has('Content-Type')) {
                //     req = req.clone({ 
                //         headers: req.headers.set('Content-Type', 'application/json') 
                //     });
                // } //End if

                if (_AUTH_TOKEN) {
                    req = req.clone({
                        headers: req.headers.set(_HEADER_TOKEN_KEY, _HEADER_TOKEN_BEARER.replace('{token}', _AUTH_TOKEN))
                    });
                } //End if

                req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
            } //End if
        } //End if

        //Set Params in the request
        let params: IRequestParam[] | undefined = HttpConfiguration.request?.params;
        if (params && params instanceof Array && params.length > 0) {

            for (let index = 0; index < params.length; index++) {
                let param: IRequestParam = params[index];

                req = req.clone({ params: req.params.set(param.key, param.value) });
            }
        } //End if

        return next.handle(req);
    } //Function ends

} //Class ends