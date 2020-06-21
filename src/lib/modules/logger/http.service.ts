import { Injectable } from '@angular/core';
import { HttpBackend, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { LogInterface } from './types/ngx-log.interface';



@Injectable()
export class LoggerHttpService {
  constructor(private readonly httpBackend: HttpBackend) { }

  logOnServer(url: string, log: LogInterface, options: object): Observable<any> {
    // HttpBackend skips all HttpInterceptors
    // They may log errors using this service causing circular calls
    const req = new HttpRequest<any>('POST', url, log, options || {});
    return this.httpBackend.handle(req).pipe(
      filter(e => e instanceof HttpResponse),
      map<HttpResponse<any>, any>((httpResponse: HttpResponse<any>) => httpResponse.body)
    );
  }

}
