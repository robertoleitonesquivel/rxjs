import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  public getData(search: string): Observable<string[]> {
    return this.http.get<string[]>(`https://localhost:7263/Rxjs/getData?search=${search}`);
  }

  public getCount(search: string): Observable<number> {
    return this.http.get<number>(`https://localhost:7263/Rxjs/getCount?search=${search}`);
  }
}
