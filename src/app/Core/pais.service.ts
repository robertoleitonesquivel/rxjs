import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PaisModel } from "./Models/Pais.interface";


@Injectable({
  providedIn: 'root'
})
export class PaisService {

  paises!: Observable<PaisModel[]>;

  constructor(private http: HttpClient) {
  }

  // METODO PARA OBTENER LOS PAISES DE UN JSON
  public getPaises(): Observable<PaisModel[]> {
    return this.http.get<PaisModel[]>('../assets/data/Pais.json').pipe(res => this.paises = res);
  }

}
