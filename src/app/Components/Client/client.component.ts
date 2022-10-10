import { ChangeDetectorRef, Component, ElementRef, ViewChild } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatTabGroup } from "@angular/material/tabs";
import { ActivatedRoute, Params } from "@angular/router";
import { concatMap, map, of, Subject } from "rxjs";
import { PaisModel } from "src/app/Core/Models/Pais.interface";
import { UDFs, UDFsTarget } from "src/app/Core/Models/UDFs.interface";
import { PaisService } from "src/app/Core/pais.service";
import { PresenteService } from "src/app/Core/present.service";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent {

  prueba: number = 10;

  form!: FormGroup;
  frm!: FormGroup;

  @ViewChild('tabs', { static: true }) tabs!: MatTabGroup;

  listData = [{ Name: 'ID', Description: 'Id', Required: false, Type: 'number', Value: 0 },
  { Name: 'NAME', Description: 'Nombre', Required: true, Type: 'text', Value: '' }];

  listUDFs: UDFs[] = []
  listUDFsTarget: UDFsTarget[] = [];

  udf: UDFs = {
    Description: 'Fecha Nacimento',
    Name: 'U_Fecha',
    Type: 'DateTime',
    Select: false,
    Typehead: false,
    Required: false,
    MappedValues: [],
  }

  udf2: UDFs = {
    Description: 'Cédula',
    Name: 'U_Cedula',
    Type: 'text',
    Select: false,
    Typehead: false,
    Required: true,
    MappedValues: [],
  }

  submit = false;

  constructor(
    private PresenteSvc: PresenteService,
    public paisSvc: PaisService,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {

  }

  ngOnInit() {
    // this.onLoad();
    this.createForm();
    console.log(this.form.value, this.form);
  }



  private onLoad(): void {

    let data: string = this.activeRoute.snapshot.paramMap.get('id') ?? '';

    this.activeRoute.params.pipe(
      concatMap((res: any) => {

        this.prueba = Number(res['num']);

        if (this.prueba === 1213) {
          this.tabs.selectedIndex = 2;
          // console.log(this.prueba, 'undefines');
          // this.filtro(res);
          return of(this.prueba);
        }

        return of(res);
      })
    ).subscribe((res) => {
      // console.log(res['id'], 'final');
      // console.log(res, 'final')
      console.log(res);
    });


    if (this.prueba !== 10) {
      console.log(this.prueba, 'Es diferente');
    }

    let info = JSON.parse(atob(data));


    // console.log(info.Id);
    // console.log(data);
    // console.log(atob(data));



    // this.PresenteSvc.subject$.next(5);
    // this.PresenteSvc.bejaviorSubject$.next('client');

    this.paisSvc.getPaises().subscribe({
      // next: (data: PaisModel[]) => {
      //   console.log(data);
      // },
      // error: (error: any) => {
      //   console.log(error);
      // }
    });
  }

  private filtro(res: any): void {
    console.log(res, 'desde el metodo')
  }

  private createForm(): void {
    // this.form = this.fb.group({
    //   dinamic: this.fb.array([])
    // });

    let group: any = {}

    this.listData.forEach(element => {
      if (element.Required)
        group[element.Name] = this.fb.control('', [Validators.required])
      else
        group[element.Name] = this.fb.control('')
    });


    this.form = this.fb.group(group);




    //  this.insert.push(this.fb.control('', Validators.required));
  }

  get insert() {
    return this.form.get('dinamic') as FormArray;
  }

  Add() {
    if (this.form.invalid) console.log('invalid'); else console.log('valid')

    console.log(this.form.value);

    for (let element in this.form.value) {
      console.log(element, this.form.controls[element].value)
    }


  }

  public save(event: UDFsTarget): void {



    if (this.listUDFsTarget.some(x => x.Name === event.Name)) {
      this.listUDFsTarget.filter(element => element.Name === event.Name)[0].value = event.value;
    } else {
      this.listUDFsTarget.push(event);
    }

  }

}
