import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { StudentDTO } from "./Models/StudentDTO";
import { Response } from "./Models/Response"


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
}
