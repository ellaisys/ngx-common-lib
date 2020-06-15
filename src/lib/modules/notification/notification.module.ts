import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Components
import { SimpleNotificationsComponent } from './components/simple-notifications/simple-notifications.component';
import { NotificationComponent } from './components/notification/notification.component';

//Services
import { NotificationService } from './services/notification.service';

export * from './components/notification/notification.component';
export * from './components/simple-notifications/simple-notifications.component';
export * from './services/notification.service';
export * from './interfaces/icons';
export * from './interfaces/notification-event.type';
export * from './interfaces/notification.type';
export * from './interfaces/options.type';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SimpleNotificationsComponent,
    NotificationComponent
  ],
  exports: [SimpleNotificationsComponent]
})

export class NotificationModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NotificationModule,
      providers: [NotificationService]
    };
  }
} //Class ends