import { Injectable } from '@angular/core';
import { StorageConfiguration } from '../configurations/storage.configuration';

@Injectable()
export class SessionStorageService {
    protected _SESSION_SESSION_STORAGE_APP_PREFIX: string;
    private _storage: Storage;

    //Default Constructor
    constructor() {
        this._SESSION_SESSION_STORAGE_APP_PREFIX = StorageConfiguration.STORAGE_KEY;
        this._storage = sessionStorage;
    } //Function ends


    /**
     * Clear the session storage
     */
    static clearUserCache(){
        sessionStorage.clear();
    } //Function ends


    /**
     * Store Object/Data into the session storage
     * 
     * @param key 
     * @param value 
     */
    public setItem(key: string, value: any): void {
        this._storage.setItem(`${this._SESSION_SESSION_STORAGE_APP_PREFIX}${key}`, JSON.stringify(value));
    } //Function ends


    /**
     * Remove Object/Data from session storage
     * @param key 
     */
    public removeItem(key: string): void {
        this._storage.removeItem(`${this._SESSION_SESSION_STORAGE_APP_PREFIX}${key}`);
    } //Function ends


    /**
     * Get Object/Data from the session storage
     * @param key 
     */
    public getItem(key: string): any {
        return JSON.parse(this._storage.getItem(`${this._SESSION_SESSION_STORAGE_APP_PREFIX}${key}`));
    } //Function ends


    /**
     * Check Object/Data from the session storage
     * @param key 
     */
    public hasItem(key: string): boolean {
        return !(this._storage.getItem(`${this._SESSION_SESSION_STORAGE_APP_PREFIX}${key}`)===null);
    } //Function ends
    
} //Class ends
