import { Injectable, Inject } from '@angular/core';

@Injectable()
export class HttpConfiguration {
    //Http API Endpoint & configurations
    public server = this._httpConfig.api_server.server;
    public apiUrl = this._httpConfig.api_server.apiUrl;
    public title = this._httpConfig.api_server.title;

    //Http Header for Authorization Token
    public header: any = {
        token_key: this._httpConfig.api_server.headers.token.key,
        token_bearer: this._httpConfig.api_server.headers.token.bearer
    };

    public authConfig = {
        CLIENT_ID: 'ellaisys',
        GRANT_TYPE: 'password',
        SCOPE: 'WebAPI'
    };

    //Default constructor
    constructor(
        @Inject('http_config') private _httpConfig: any
    ) { }
} //Class ends
