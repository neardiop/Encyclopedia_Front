import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: `root`,
})
export class ApiService {

  urlRoot: string;

  constructor(private http: HttpClient) {
    this.urlRoot = 'http://localhost:8000';
  }

  getData(apiPath: string): Observable<any> {
    let apiUrl: string;
    apiUrl = this.urlRoot + apiPath;
    return this.http.get<any>(apiUrl)
      .pipe(map(stats => {
        return stats;
      }));
  }

  login(values, apiPath: string): Observable<any> {
    let apiUrl: string;
    let header = new HttpHeaders();
    header= header.append('content-type', 'application/json');
    apiUrl = this.urlRoot + apiPath;
    console.log(values)
    return this.http.post<any>(apiUrl, values,{headers : header})
      .pipe(map(loginData => {
        return loginData;
      }));
  }
  
  createData(values, apiPath: string): Observable<any> {
    let apiUrl: string;
    let header = new HttpHeaders();
    header= header.append('content-type', 'application/json');
    apiUrl = this.urlRoot + apiPath;
    return this.http.post<any>(apiUrl, values,{headers : header})
      .pipe(map(data => {
        return data;
      }));
  }
}
