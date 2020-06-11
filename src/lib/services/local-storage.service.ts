import { Injectable } from '@angular/core';
import { StorageConfiguration } from '../configurations/storage.configuration';

@Injectable()
export class LocalStorageService {
    protected _LOCAL_STORAGE_APP_PREFIX: string;
    private _storage: Storage;

    //Default Constructor
    constructor() {
        this._LOCAL_STORAGE_APP_PREFIX = StorageConfiguration.STORAGE_KEY;
        this._storage = localStorage;
    } //Function ends


    /**
     * Clear the local storage
     */
    static clearUserCache(){
        localStorage.clear();
    } //Function ends


    /**
     * Store Object/Data into the local storage
     * 
     * @param key 
     * @param value 
     */
    public setItem(key: string, value: any): void {
        this._storage.setItem(`${this._LOCAL_STORAGE_APP_PREFIX}${key}`, JSON.stringify(value));
    } //Function ends


    /**
     * Remove Object/Data from local storage
     * 
     * @param key 
     */
    public removeItem(key: string): void {
        this._storage.removeItem(`${this._LOCAL_STORAGE_APP_PREFIX}${key}`);
    } //Function ends


    /**
     * Get Object/Data from the local storage
     * 
     * @param key 
     */
    public getItem(key: string): any {
        return JSON.parse(this._storage.getItem(`${this._LOCAL_STORAGE_APP_PREFIX}${key}`));
    } //Function ends

} //Class ends
