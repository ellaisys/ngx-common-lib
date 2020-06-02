import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

//Boilerplate files
import { HttpConfiguration } from '../configurations/http.configuration';
import { SessionStorageService } from './session-storage.service';
import { Observable } from 'rxjs';
import { StorageConfiguration } from '../configurations/storage.configuration';

const _ENCODED_FORM_OPTION: Object = {
    headers: new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded')
};
const _JSON_HEADER_OPTION: Object = {
    headers: new HttpHeaders().append('Content-Type', 'application/json')
};

@Injectable()
export class HttpService {
    private endpoint: string | null;

    constructor(
        private _httpConfig: HttpConfiguration,
        private _http: HttpClient
    ) { this.endpoint=this._httpConfig.server+this._httpConfig.apiUrl; }


    /**
     * This method gets the data by parameters
     * 
     * @param uri 
     * @param params 
     */
    public async getWithParams<T>(_uri: string, _params: string){
        const options = _params ?{ params: new HttpParams().set('query', _params) } : {};
        let url = this.endpoint+_uri;
        return await this._http.get<T>(url, options);
    } //Function ends


    /**
     * This method GET the data
     * 
     * @param uri
     */
    public async get<T>(_uri: string) {
        let url = this.endpoint+_uri;    
        return await this._http.get<T>(url);
    } //Function ends


    /**
     * This method POST the data and body
     * 
     * @param uri 
     * @param body
     * @param encoded
     * @param onlyServerURL
     */
    public async post<T>(_uri: string, _body: any, _encoded:boolean=false, _onlyServerURL: boolean=false){
        let url: string = ((_onlyServerURL)?this._httpConfig.server:this.endpoint)+_uri;
        let options: Object = (_encoded)?_ENCODED_FORM_OPTION:_JSON_HEADER_OPTION;
        return await this._http.post<T>(url, _body, options);
    } //Function ends

    
    /**
     * This method PUT the data and body
     * 
     * @param uri 
     * @param body
     */
    public async put<T>(_uri: string, _body: any) {
        let url = this.endpoint+_uri;    
        return await this._http.put<T>(url, _body, _JSON_HEADER_OPTION);
    } //Function ends
 

    /**
     * This method DELETE the data
     * 
     * @param uri
     */
    public async delete<T>(_uri: string){
        let url = this.endpoint+_uri;      
        return await this._http.delete<T>(url);
    } //Function ends

    
    /**
     * This method PATCH the data
     * 
     * @param uri
     * @param body
     */
    public async patch<T>(_uri: string, _body: string){
        let url = this.endpoint+_uri;
        return await this._http.patch<T>(url, _body);
    } //Function ends

} //Class ends

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
    constructor(
        private _session: SessionStorageService,
        private _httpConfig: HttpConfiguration,
        private _storageConfig: StorageConfiguration
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const _HEADER_TOKEN_KEY: string = this._httpConfig.header.token_key;
        const _HEADER_TOKEN_BEARER: string = this._httpConfig.header.token_bearer;

        let claim: any = this._session.getItem(this._storageConfig._SESSION_AUTH_CLAIM_KEY);
        //console.log("Result",claim);
        if(claim!=null) {
            let _AUTH_TOKEN: string = claim.token;

            let boolNeedsAuthentication: boolean = !(req.url.search('googleapis.com')>0);
            if(boolNeedsAuthentication){
                if(!req.headers.has('Content-Type')) {
                    req = req.clone({ 
                        headers: req.headers.set('Content-Type', 'application/json') 
                    });
                } //End if
                if(_AUTH_TOKEN) {
                    req = req.clone({ 
                        headers: req.headers.set(_HEADER_TOKEN_KEY, _HEADER_TOKEN_BEARER+_AUTH_TOKEN) 
                    });
                } //End if
                req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
            } //End if
        } //End if
        return next.handle(req);
    } //Function ends

} //Class ends