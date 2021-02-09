import { Injectable, Inject } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class HttpConfiguration {
    private httpConfig: any = null;

    //Http API Endpoint & configurations
    public static server: string = null;
    public static apiUrl: string = null;
    public static title: string  = null;

    //Http Header for Authorization Token
    public static headers: any = {
        token_key: null,
        token_value: null
    };

    //HTTP Params
    public static request: IRequest = null;

    //Default constructor
    constructor(
        @Inject('environment') private _environment: any
    ) { 
        this.httpConfig = this._environment.http_config; 
    } //Function ends

    public init(): void {
        //Initialize variables
        let httpConfig = this.httpConfig;

        console.log(httpConfig);
    
        if (httpConfig && httpConfig.api_server) {
            //Http API Endpoint & configurations
            HttpConfiguration.server = httpConfig.api_server.server;
            HttpConfiguration.apiUrl = httpConfig.api_server.apiUrl;
            HttpConfiguration.title = httpConfig.api_server.title;

            if (httpConfig.api_server.headers) {
                HttpConfiguration.headers.token_key = httpConfig.api_server.headers.token.key;
                HttpConfiguration.headers.token_bearer = httpConfig.api_server.headers.token.value;
            } //End if

            //Assign request object values
            if (httpConfig && httpConfig.api_server && httpConfig.api_server.request) {
                let request = httpConfig.api_server.request;
                
                HttpConfiguration.request = (request)?request:null;
            } //End if
            
        } //End if
    } //Function ends
    
} //Class ends

export interface IRequest {
    time_out: number;
    params: IRequestParam[];
    headers: IRequestHeader[];
} //Interface ends

export interface IRequestHeader {
    type: string;
    key: string;
    value: string;
} //Interface ends

export interface IRequestParam {
    key: string;
    value: string;
} //Interface ends
