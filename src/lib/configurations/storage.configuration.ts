import { Injectable, Inject } from '@angular/core';

@Injectable({
    providedIn: 'platform'
})
export class StorageConfiguration {
    private storageConfig: any

    public static STORAGE_KEY: string;
    public static SESSION_AUTH_CLAIM_KEY: string;
    public static LOCAL_STORAGE_AUTH_CREDENTIALS: string;

    //Default constructor
    constructor(
        @Inject('environment') private _environment: any
    ) { 
        this.storageConfig=this._environment.storage_config; 
    }

    public init(): void {
        //Initialize variables
        let storageConfig = this.storageConfig;

        console.log(storageConfig);

        if (storageConfig && storageConfig.storage) {
            StorageConfiguration.STORAGE_KEY = storageConfig.storage.app_key;
            StorageConfiguration.SESSION_AUTH_CLAIM_KEY = storageConfig.storage.auth_claim_key;
            StorageConfiguration.LOCAL_STORAGE_AUTH_CREDENTIALS = storageConfig.storage.auth_credentials_key;
        }
    } //Function ends

} //Class ends
