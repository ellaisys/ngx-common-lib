import { Injectable, EventEmitter, Inject } from '@angular/core';
import { Subject } from 'rxjs';
import { NotificationEvent } from '../interfaces/notification-event.type';
import { Notification } from '../interfaces/notification.type';
import { Icons, defaultIcons } from '../interfaces/icons';

@Injectable()
export class NotificationService {
    public emitter: Subject<NotificationEvent>;
    public icons: Icons;


    /**
     * Default constructor
     */
    constructor() { 
        this.emitter = new Subject<NotificationEvent>();
        this.icons = defaultIcons;
    }


    public set(notification: Notification, to: boolean): Notification {
        notification.id = notification.override && notification.override.id ? notification.override.id : Math.random().toString(36).substring(3);
        notification.click = new EventEmitter<{}>();
        notification.timeoutEnd = new EventEmitter<{}>();

        this.emitter.next({command: 'set', notification: notification, add: to});
        return notification;
    };


    public success(title: any = '', content: any = '', override?: any): Notification {
        return this.set({title: title, content: content || '', type: 'success', icon: this.icons.success, override: override}, true);
    }


    public error(title: any = '', content: any = '', override?: any): Notification {
        return this.set({title: title, content: content || '', type: 'error', icon: this.icons.error, override: override}, true);
    }


    public alert(title: any = '', content: any = '', override?: any): Notification {
        return this.set({title: title, content: content || '', type: 'alert', icon: this.icons.alert, override: override}, true);
    }

    public info(title: any = '', content: any = '', override?: any): Notification {
        return this.set({title: title, content: content || '', type: 'info', icon: this.icons.info, override: override}, true);
    }


    public warn(title: any = '', content: any = '', override?: any): Notification {
        return this.set({title: title, content: content || '', type: 'warn', icon: this.icons.warn, override: override}, true);
    }


    public bare(title: any = '', content: any = '', override?: any): Notification {
        return this.set({title: title, content: content || '', type: 'bare', icon: 'bare', override: override}, true);
    }


    // With type method
    public create(title: any = '', content: any = '', type = 'success', override?: any): Notification {
        return this.set({title: title, content: content, type: type, icon: (<any>this.icons)[type], override: override}, true);
    }

    // HTML Notification method
    public html(html: any, type = 'success', override?: any, icon = 'bare'): Notification {
        return this.set({html: html, type: type, icon: (<any>this.icons)[icon], override: override}, true);
    }


    /**
     * Remove all notifications method
     * 
     * @param id 
     */
    public remove(id?: string): void {
        if (id) {
            this.emitter.next({command: 'clean', id: id});
        } else {
            this.emitter.next({command: 'cleanAll'});
        }
    } //Function ends

} //Class ends
