import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { StudentDTO } from "./Models/StudentDTO";
import { Response } from "./Models/Response"
import { Padron } from "./Models/Padron";


@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) {
  }

  // METODO PARA OBTENER TODOS LOS STUDENTS
  public getAll(): Observable<Response<StudentDTO[]>> {
    return this.http.get<Response<StudentDTO[]>>(`https://localhost:44389/api/Student/GetAll`);
  }
  // METODO PARA OBTENER TODOS LOS STUDENTS
  public create(student: any): Observable<Response<boolean>> {
    return this.http.post<Response<boolean>>(`https://localhost:44389/api/Student/Create`, student);
  }

  public hacienda():Observable<Padron>{
    return this.http.get<Padron>(`https://api.hacienda.go.cr/fe/ae?identificacion=115550657`);
  }
}
