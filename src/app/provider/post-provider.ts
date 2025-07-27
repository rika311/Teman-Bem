

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable()
  export class PostProvider{
    server: string='https://www.rpl22.my.id/Teknik_Informatika/Rika/api/';
    constructor(public http: HttpClient){}
    postData(body:any, file:string):Observable<any>
    {
      let type = 'application/json; charset=UTF-8';
      let headers = new HttpHeaders({'Content-Type':type});

      return this.http.post(this.server+file, JSON.stringify(body), {
        headers:headers
      }).pipe(
        map((res :any)=> { 
          return res;
        })
      );
    }

  }