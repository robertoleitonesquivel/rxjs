import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HaciendaService {

  constructor(private http: HttpClient) { }

  public first(): Observable<any> {
    console.log('llegue');
    return this.http.get<any>('https://api.hacienda.go.cr/fe/ae?identificacion=115550657');
  }

  public second(): Observable<any> {
    return this.http.get<any>('https://api.hacienda.go.cr/fe/ae?identificacion=115550657');
  }
}
