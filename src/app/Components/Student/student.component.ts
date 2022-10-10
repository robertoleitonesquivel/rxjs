import { Component, OnInit, ViewChild } from "@angular/core";
import { StudentDTO } from "src/app/Core/Models/StudentDTO";
import { StudentService } from "src/app/Core/Student.service";
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";

import { switchMap, map, filter, startWith, tap } from 'rxjs/operators'
import { combineLatest, forkJoin, from, observable, Observable, of } from "rxjs";
import { ResponseError } from "src/app/Core/Models/ResponseError";
import { Response } from "src/app/Core/Models/Response";
import { Padron } from "src/app/Core/Models/Padron";
import { MatOptionSelectionChange } from "@angular/material/core";

export interface User {
  name: string;
}

export interface DocumentLine {
  ItemCode: string;
  ItemName: string;
  Quantity: number;
  Price: number;
  LineTotal?: number;
}

@Component({
  selector: 'app-list-student',
  templateUrl: 'student.component.html',
  styleUrls: ['student.component.scss']
})
export class StudentComponent implements OnInit {

  myControl = new FormControl('');
  options: User[] = [{ name: 'Mary' }, { name: 'Shelley' }, { name: 'Igor' }];
  filteredOptions!: Observable<User[]>;

  data: DocumentLine[] = [];

  /*LISTAS */
  displayedColumns: string[] = ['ItemCode', 'ItemName', 'Quantity', 'Price', 'LineTotal'];
  //dataSource = new MatTableDataSource<StudentDTO>([]);

  nombre: string = '';

  frmPrueba = new FormControl('')

  prueba = [
    {
      Valor: '1', List: [
        { Name: 'Unidad', Price: 450 },
        { Name: 'Unidad2', Price: 500 }
      ]
    }
  ]




  @ViewChild(MatTable, { static: false }) tabla!: MatTable<DocumentLine> // inicializar
  dataSource = new MatTableDataSource<DocumentLine>([]);



  /**FORMULARIOS */
  studentForm!: FormGroup;
  invoiceForm!: FormGroup;

  form!: FormControl;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private studentService: StudentService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {

    this.invoiceForm = this.formBuilder.group({
      ItemCode: [''],
      ItemName: [''],
      Quantity: [0],
      Price: [0]
    });
  }

  onchange(event: MatOptionSelectionChange): void {
    console.log(event);
    console.log(event.source.value);
  }

  onchangedos(event: any): void {
    console.log(event);
    console.log(event.target.value);
    var obj_hijo = Object.keys(event.target.value);
    console.log(obj_hijo);
  }

  ngOnInit(): void {

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.options.slice();
      }),
    );



    this.studentService.hacienda().pipe(
      tap(res => this.nombre = res.nombre)
    ).subscribe({
      next: (res: Padron) => {
        console.log(res);
      },
      error: (error: any) => {
        console.log(error);
      }
    });

    this.onLoad();
    //this.snackBar.open("res.Message", 'x', { duration: 4000, panelClass: 'success', verticalPosition: 'top' });
    //this.snackBar.open("res.Message", 'x', { duration: 4000, panelClass: 'warning', verticalPosition: 'top' });
    //this.snackBar.open("res.Message", 'x', { duration: 4000, panelClass: 'information', verticalPosition: 'top' });
    //this.snackBar.open("res.Message", 'x', { duration: 4000, panelClass: 'error', verticalPosition: 'top' });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  private onLoad(): void {
    this.initializeStudentForm();
    //this.getAll();
  }

  private getAll(): void {
    // this.studentService.getAll().subscribe({
    //   next: (res: StudentDTO[]) => {
    //     this.dataSource.data = res;
    //   },
    //   error: (error: any) => {
    //     alert('Error ' + error);
    //   }
    // });
  }

  public create(): void {
    let student = this.studentForm.value;

    this.studentService.create(student).pipe(
      switchMap((Message: Response<boolean>) => {
        if (Message.Success) {
          return this.studentService.getAll().
            pipe(map((clients: Response<StudentDTO[]>) => { return { Message, clients } }))
        } else return of(Message);
      })
    ).subscribe({
      next: (res: any) => {

        this.snackBar.open(res.Message.Message ?? res.Message, 'x', { duration: 4000, panelClass: 'success', verticalPosition: 'top' });
        this.dataSource.data = res.clients;
      },
      error: (error: ResponseError) => {
        console.log(error);
        this.snackBar.open(error.error.Message, 'x', { duration: 4000, panelClass: ['success'], verticalPosition: 'top' });

      }
    })

  }

  private initializeStudentForm(): void {
    this.studentForm = this.formBuilder.group({
      Name: [''],
      Age: ['']
    });
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }

  imprime() {
    console.log(this.myControl.value)
  }


  /************EJEMPLOS 1************** */

  // this.activatedRoute.pipe(
  //   tap(data => console.log(data)),
  //   mergeMap(data => {
  //     if (data.product === null) {
  //       this.router.navigate(['/home']);
  //     } else {
  //       const getCurrency = this.dataService.getCurrencySymbolById(data.product.currency);
  //       const getUsers= this.userService.getUser(data.product.createdBy);
  //       const getRatings = this.ratingService.getRatingByUserId(seller.id)
  //       return forkJoin(getCurrency, getUsers, getRatings);
  //     }
  //   })
  // ).subscribe(res => {
  //   console.log(res[0]); // currency
  //   console.log(res[1]); // user
  //   console.log(res[2]); // ratings

  // }

  /**************EJEMPLOS 2****************** */

  // this.activatedRoute.data.pipe(
  //   switchMap(data => {
  //     this.user = data['user'];
  //     this.product = data['product'];
  //     return this.userService.getUser(this.product.createdBy);
  //   }),
  //   switchMap(data => {
  //     if (this.product === null) {
  //       this.router.navigate(['/home']);
  //     } else {
  //       this.seller = seller;
  //       return this.userService.getRatingByUserId(this.product.createdBy);
  //     }
  //   })
  // ).subscribe(res => {
  //  console.log(res)
  //  // handle the rest
  // })

  /***********EJEMPLOS 3******************* */

  // this.activatedRoute.data.switchMap((routeData) => {
  //   this.user = routeData['user'];
  //   this.product = routeData['product'];
  //   return this.userService.getUser(this.product.createdBy);
  //  }).switchMap(seller => {
  //     this.seller = seller;
  //      return this.ratingService.getRatingByUserId(seller.id);
  //  }).subscribe(rating => {
  //    this.rating = rating;
  //  })

  /***********EJEMPLOS 4************ */

  //   const getData = (param) => {
  //     return of(`retrieved new data with param ${param}`).pipe(
  //         delay(1000)
  //     );
  // };


  // from([1, 2, 3, 4]).pipe(
  //     mergeMap(param => getData(param))
  // ).subscribe(val => console.log(val));


  public save(element: DocumentLine, event: any): void {
    if (!event.target.value)
      event.target.value = 0;

    let newMonto: number = Number(event.target.value);
    let value = this.dataSource.data.filter(x => x.ItemCode === element.ItemCode)[0];
    value.Price = newMonto;
    value.LineTotal = value.Price * element.Quantity;
    // this.dataSource.data.push(item);

    // this.dataSource.data = this.dataSource.data;
  }

  public add(): void {
    let item: DocumentLine = this.invoiceForm.value;
    item.LineTotal = item.Quantity * item.Price;
    // this.data.push(item);
    // this.dataSource.data = this.data;
    this.dataSource.data.push(item);
    this.dataSource.data = this.dataSource.data;
    //this.tabla.renderRows();
    this.data = this.dataSource.data;
    console.log(this.data);
  }
}



