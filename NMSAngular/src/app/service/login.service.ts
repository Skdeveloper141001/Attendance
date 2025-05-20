import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  configUrl: any = environment.rootUrl;
  constructor(private http: HttpClient) { }


  // getData(): Observable<HttpResponse<any>> {
  //   return this.http.get(
  //     this.configUrl, { observe: 'response' });
  // }


  getData(functionName: any) {
    return this.http.get(this.configUrl + functionName)
  }

  postData(functionName: any, data: any) {
    return this.http.post(this.configUrl + functionName, data)
  }
  
  updateData(functionName: any, data: any) {
    return this.http.put(this.configUrl + functionName, data)
  }


}
