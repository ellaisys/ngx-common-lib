import { Injectable, Inject } from '@angular/core';

@Injectable({
    providedIn: 'platform'
})
export class StorageConfiguration {
    private storageConfig: any = null;

    public static STORAGE_KEY: string | null = null;
    public static SESSION_AUTH_CLAIM_KEY: string | null = null;
    public static LOCAL_STORAGE_AUTH_CREDENTIALS: string | null = null;

    
    //Default constructor
    constructor(
        @Inject('environment') private _environment: any
    ) { 
        this.storageConfig=this._environment.storage_config; 
    }


    /**
     * Initialization Routine
     */
    public init(): void {
        //Initialize variables
        let storageConfig = this.storageConfig;

        //Dubug to console
        if (this._environment && (this._environment.production==false)) {
            console.debug('bondai-core-lib->StorageConfiguration->storageConfig:');
            console.debug(storageConfig);
        } //End if

        //Set the storage key values
        if (storageConfig && storageConfig.storage_keys) {
            let keys: any = storageConfig.storage_keys;

            StorageConfiguration.STORAGE_KEY = keys.app_key;
            StorageConfiguration.SESSION_AUTH_CLAIM_KEY = keys.auth_claim_key;
            StorageConfiguration.LOCAL_STORAGE_AUTH_CREDENTIALS = keys.auth_credentials_key;
        } //End if
    } //Function ends

} //Class ends
