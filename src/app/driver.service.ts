import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Sort} from './Consts/Sort';
import {HttpResponse} from './Classes/HttpResponse';
import {URLPrefix} from './Consts/URL';
import {DateConvertor} from './Classes/DateConvertor';
import {Errors} from './Consts/Errors';
import {Driver} from './Classes/Driver';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  constructor(private http: HttpClient) {

  }

  LoadDrivers(limit: number | false, sort: Sort = Sort.DESC): Promise<Array<Driver>> {
    let httpParams: HttpParams = new HttpParams();
    httpParams = httpParams.append('sort', sort);
    if (limit !== false) {
      httpParams = httpParams.append('limit', limit.toLocaleString());
    }

    const promise: Promise<Array<Driver>> = new Promise((resolve, reject) => {
      this.http.get<HttpResponse<Driver>>(URLPrefix + '/driver', {params: httpParams}).toPromise().then((data: HttpResponse<Driver>) => {
        const drivers: Array<Driver> = data.items;
        drivers.forEach(refuge => {
          refuge.dateCreated = DateConvertor.UnixToDate(refuge.dateCreated);
        });
        resolve(drivers);
      });
    });
    return promise;
  }

  SendSearchForm(searchValue: string, limit: number, sort: Sort = Sort.DESC): Promise<Array<Driver>> {

    let httpParams: HttpParams = new HttpParams();
    httpParams = httpParams.append('search', searchValue).append('limit', limit.toLocaleString()).append('sort', sort);

    const promise: Promise<Array<Driver>> = new Promise((resolve, reject) => {
      this.http.get<HttpResponse<Driver>>(URLPrefix + '/driver', {params: httpParams}).toPromise().then((data: HttpResponse<Driver>) => {
        const Drivers: Array<Driver> = data.items;
        Drivers.forEach(driver => {
          driver.dateCreated = DateConvertor.UnixToDate(driver.dateCreated);
        });
        resolve(Drivers);
      });
    });
    return promise;
  }

  DeleteDriver(driverToDelete: Driver, sort: Sort = Sort.DESC): Promise<boolean> {

    let httpParams: HttpParams = new HttpParams();
    httpParams = httpParams.append('driverId', driverToDelete.id.toLocaleString()).append('sort', sort);

    const promise: Promise<boolean> = new Promise((resolve, reject) => {
      this.http.delete<HttpResponse<Driver>>(URLPrefix + '/driver', {params: httpParams}).toPromise().then(data => {
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

  SearchDriversByPhone(phone: string): Promise<Array<Driver>> {
    let httpParams: HttpParams = new HttpParams();
    httpParams = httpParams.append('search', phone);

    const promise: Promise<Array<Driver>> = new Promise((resolve, reject) => {
      this.http.get<HttpResponse<Driver>>(URLPrefix + '/driver', {params: httpParams}).toPromise().then(res => {
        if (res.status === Errors.OK) {
          resolve(res.items);
        }
      });
    });
    return promise;
  }

  GetDriverById(driverId: number): Promise<Driver> {
    const promise: Promise<Driver> = new Promise((resolve, reject) => {
      this.http.get<Driver>(URLPrefix + '/driver/' + driverId).toPromise().then(driver => {
        resolve(driver);
      });
    });
    return promise;
  }

  CreateDriver(driver: Driver): Promise<HttpResponse<Driver>> {
    const promise: Promise<HttpResponse<Driver>> = new Promise((resolve, reject) => {
      this.http.post<HttpResponse<Driver>>(URLPrefix + '/driver', driver).toPromise().then((data: HttpResponse<Driver>) => {
        resolve(data);
      });
    });
    return promise;
  }

  UpdateDriver(updatedDriver: Driver): Promise<HttpResponse<Driver>> {
    let httpParams: HttpParams = new HttpParams();
    httpParams = httpParams.append('driverId', updatedDriver.id.toLocaleString());

    const promise: Promise<HttpResponse<Driver>> = new Promise((resolve, reject) => {
      this.http.put<HttpResponse<Driver>>(URLPrefix + '/driver', updatedDriver, {params: httpParams}).toPromise().then(res => {
        if (res.status === Errors.OK) {
          resolve(res);
        }
      });
    });
    return promise;
  }
}
