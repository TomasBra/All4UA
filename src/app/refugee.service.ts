import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Sort} from './Consts/Sort';
import {HttpResponse} from './Classes/HttpResponse';
import {Refugee} from './Classes/Refugee';
import {URLPrefix} from './Consts/URL';
import {DateConvertor} from './Classes/DateConvertor';
import {Errors} from './Consts/Errors';
import {User} from './Classes/User';

@Injectable({
  providedIn: 'root'
})
export class RefugeeService {

  constructor(private http: HttpClient) {

  }

  LoadRefugees(limit: number | false, sort: Sort = Sort.DESC): Promise<Array<Refugee>> {
    let httpParams: HttpParams = new HttpParams();
    httpParams = httpParams.append('sort', sort);
    if (limit !== false) {
      httpParams = httpParams.append('limit', limit.toLocaleString());
    }

    const promise: Promise<Array<Refugee>> = new Promise((resolve, reject) => {
      this.http.get<HttpResponse<Refugee>>(URLPrefix + '/refugee', {params: httpParams}).toPromise().then((data: HttpResponse<Refugee>) => {
        const refugees: Array<Refugee> = data.items;
        refugees.forEach(refuge => {
          refuge.dateCreated = DateConvertor.UnixToDate(refuge.dateCreated);
        });
        resolve(refugees);
      });
    });
    return promise;
  }

  SendSearchForm(searchValue: string, limit: number, sort: Sort = Sort.DESC): Promise<Array<Refugee>> {

    let httpParams: HttpParams = new HttpParams();
    httpParams = httpParams.append('search', searchValue).append('limit', limit.toLocaleString()).append('sort', sort);

    const promise: Promise<Array<Refugee>> = new Promise((resolve, reject) => {
      this.http.get<HttpResponse<Refugee>>(URLPrefix + '/refugee', {params: httpParams}).toPromise().then((data: HttpResponse<Refugee>) => {
        const Refugees: Array<Refugee> = data.items;
        Refugees.forEach(refuge => {
          refuge.dateCreated = DateConvertor.UnixToDate(refuge.dateCreated);
        });
        resolve(Refugees);
      });
    });
    return promise;
  }

  DeleteRefugee(refugeeToDelete: Refugee, sort: Sort = Sort.DESC): Promise<boolean> {

    let httpParams: HttpParams = new HttpParams();
    httpParams = httpParams.append('refugeeId', refugeeToDelete.id.toLocaleString()).append('sort', sort);

    const promise: Promise<boolean> = new Promise((resolve, reject) => {
      this.http.delete<HttpResponse<Refugee>>(URLPrefix + '/refugee', {params: httpParams}).toPromise().then(data => {
        if (data.status === Errors.OK) {
          resolve(true);
        } else {
          console.log(data.messages);
          resolve(false);
        }
      });
    });
    return promise;
  }

  SearchRefugeesByPhone(phone: string): Promise<Array<Refugee>> {
    let httpParams: HttpParams = new HttpParams();
    httpParams = httpParams.append('search', phone);

    const promise: Promise<Array<Refugee>> = new Promise((resolve, reject) => {
      this.http.get<HttpResponse<Refugee>>(URLPrefix + '/refugee', {params: httpParams}).toPromise().then(res => {
        if (res.status === Errors.OK) {
          resolve(res.items);
        }
      });
    });
    return promise;
  }

  GetRefugeeById(refugeeId: number): Promise<Refugee> {
    const promise: Promise<Refugee> = new Promise((resolve, reject) => {
      this.http.get<Refugee>(URLPrefix + '/refugee/' + refugeeId).toPromise().then(refugee => {
        resolve(refugee);
      });
    });
    return promise;
  }

  CreateRefugee(refugee: Refugee): Promise<HttpResponse<Refugee>> {
    const promise: Promise<HttpResponse<Refugee>> = new Promise((resolve, reject) => {
      this.http.post<HttpResponse<Refugee>>(URLPrefix + '/refugee', refugee).toPromise().then((data: HttpResponse<Refugee>) => {
        resolve(data);
      });
    });
    return promise;
  }

  UpdateRefugee(updatedRefugee: Refugee): Promise<HttpResponse<Refugee>> {
    let httpParams: HttpParams = new HttpParams();
    httpParams = httpParams.append('refugeeId', updatedRefugee.id.toLocaleString());

    const promise: Promise<HttpResponse<Refugee>> = new Promise((resolve, reject) => {
      this.http.put<HttpResponse<Refugee>>(URLPrefix + '/refugee', updatedRefugee, {params: httpParams}).toPromise().then(res => {
        if (res.status === Errors.OK) {
          resolve(res);
        }
      });
    });
    return promise;
  }
}
