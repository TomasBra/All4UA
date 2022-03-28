import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Sort} from './Consts/Sort';
import {HomeProvider} from './Classes/HomeProvider';
import {HttpResponse} from './Classes/HttpResponse';
import {URLPrefix} from './Consts/URL';
import {DateConvertor} from './Classes/DateConvertor';
import {Errors} from './Consts/Errors';

@Injectable({
  providedIn: 'root'
})
export class HomeProviderService {

  constructor(private http: HttpClient) {

  }

  LoadHomeProviders(limit: number | false, sort: Sort = Sort.DESC): Promise<Array<HomeProvider>> {
    let httpParams: HttpParams = new HttpParams();
    httpParams = httpParams.append('sort', sort);
    if (limit !== false) {
      httpParams = httpParams.append('limit', limit.toLocaleString());
    }

    const promise: Promise<Array<HomeProvider>> = new Promise((resolve, reject) => {
      this.http.get<HttpResponse<HomeProvider>>(URLPrefix + '/homeProvider', {params: httpParams}).toPromise().then((data: HttpResponse<HomeProvider>) => {
        const homeProviders: Array<HomeProvider> = data.items;
        homeProviders.forEach(refuge => {
          refuge.dateCreated = DateConvertor.UnixToDate(refuge.dateCreated);
        });
        resolve(homeProviders);
      });
    });
    return promise;
  }

  SendSearchForm(searchValue: string, limit: number, sort: Sort = Sort.DESC): Promise<Array<HomeProvider>> {

    let httpParams: HttpParams = new HttpParams();
    httpParams = httpParams.append('search', searchValue).append('limit', limit.toLocaleString()).append('sort', sort);

    const promise: Promise<Array<HomeProvider>> = new Promise((resolve, reject) => {
      this.http.get<HttpResponse<HomeProvider>>(URLPrefix + '/homeProvider', {params: httpParams}).toPromise().then((data: HttpResponse<HomeProvider>) => {
        const HomeProviders: Array<HomeProvider> = data.items;
        HomeProviders.forEach(refuge => {
          refuge.dateCreated = DateConvertor.UnixToDate(refuge.dateCreated);
        });
        resolve(HomeProviders);
      });
    });
    return promise;
  }

  DeleteHomeProvider(homeProviderToDelete: HomeProvider, sort: Sort = Sort.DESC): Promise<boolean> {

    let httpParams: HttpParams = new HttpParams();
    httpParams = httpParams.append('homeProviderId', homeProviderToDelete.id.toLocaleString()).append('sort', sort);

    const promise: Promise<boolean> = new Promise((resolve, reject) => {
      this.http.delete<HttpResponse<HomeProvider>>(URLPrefix + '/homeProvider', {params: httpParams}).toPromise().then(data => {
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

  SearchHomeProvidersByPhone(phone: string): Promise<Array<HomeProvider>> {
    let httpParams: HttpParams = new HttpParams();
    httpParams = httpParams.append('search', phone);

    const promise: Promise<Array<HomeProvider>> = new Promise((resolve, reject) => {
      this.http.get<HttpResponse<HomeProvider>>(URLPrefix + '/homeProvider', {params: httpParams}).toPromise().then(res => {
        if (res.status === Errors.OK) {
          resolve(res.items);
        }
      });
    });
    return promise;
  }

  GetHomeProviderById(homeProviderId: number): Promise<HomeProvider> {
    const promise: Promise<HomeProvider> = new Promise((resolve, reject) => {
      this.http.get<HomeProvider>(URLPrefix + '/homeProvider/' + homeProviderId).toPromise().then(homeProvider => {
        resolve(homeProvider);
      });
    });
    return promise;
  }

  CreateHomeProvider(homeProvider: HomeProvider): Promise<HttpResponse<HomeProvider>> {
    const promise: Promise<HttpResponse<HomeProvider>> = new Promise((resolve, reject) => {
      this.http.post<HttpResponse<HomeProvider>>(URLPrefix + '/homeProvider', homeProvider).toPromise().then((data: HttpResponse<HomeProvider>) => {
        resolve(data);
      });
    });
    return promise;
  }

  UpdateHomeProvider(updatedHomeProvider: HomeProvider): Promise<HttpResponse<HomeProvider>> {
    let httpParams: HttpParams = new HttpParams();
    httpParams = httpParams.append('homeProviderId', updatedHomeProvider.id.toLocaleString());

    const promise: Promise<HttpResponse<HomeProvider>> = new Promise((resolve, reject) => {
      this.http.put<HttpResponse<HomeProvider>>(URLPrefix + '/homeProvider', updatedHomeProvider, {params: httpParams}).toPromise().then(res => {
        if (res.status === Errors.OK) {
          resolve(res);
        }
      });
    });
    return promise;
  }
}
