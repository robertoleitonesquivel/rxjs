import { ChangeDetectorRef, Component, ElementRef, ViewChild } from "@angular/core";
import { MatTabGroup } from "@angular/material/tabs";
import { ActivatedRoute, Params } from "@angular/router";
import { concatMap, map, of, Subject } from "rxjs";
import { PaisModel } from "src/app/Core/Models/Pais.interface";
import { PaisService } from "src/app/Core/pais.service";
import { PresenteService } from "src/app/Core/present.service";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html'
})
export class ClientComponent {

  prueba: number = 10;

  @ViewChild('tabs', { static: true }) tabs!: MatTabGroup;

  constructor(
    private PresenteSvc: PresenteService,
    public paisSvc: PaisService,
    private activeRoute: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.onLoad();
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

}
