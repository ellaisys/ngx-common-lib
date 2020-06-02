import { Injectable, Inject } from '@angular/core';

@Injectable()
export class StorageConfiguration {
    public _STORAGE_KEY: string = this._storageConfig.storage.app_key;
    public _SESSION_AUTH_CLAIM_KEY: string = this._storageConfig.storage.auth_claim_key;

    //Default constructor
    constructor(
        @Inject('storage_config') private _storageConfig: any
    ) { }
} //Class ends
