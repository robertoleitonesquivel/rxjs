import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, concatMap, delay, forkJoin, from, map, mergeMap, observable, Observable, of, Subject, switchMap, tap } from 'rxjs';
import { HaciendaService } from 'src/app/core/services/hacienda.service';

@Component({
  selector: 'app-operadores',
  templateUrl: './operadores.component.html',
  styleUrls: ['./operadores.component.scss']
})
export class OperadoresComponent implements OnInit {

  subject$ = new Subject<any>();
  bsubject$ = new BehaviorSubject<any>(null);


  constructor(private haciendaSVC: HaciendaService) { }

  ngOnInit(): void {

    this.onLoad();
  }

  private onLoad() {

    //let oserver = this.haciendaSVC.first();
    // this.haciendaSVC.second());

    // this.haciendaSVC.first().pipe(
    //   tap(res1 => {
    //     setTimeout(() => {
    //       console.log(res1, 'tap1');
    //     }, 5000)
    //   }),
    //   concatMap((res1) => this.haciendaSVC.second()),
    //   tap((res) => {
    //     console.log(res, 'tap2');
    //   })).subscribe(results => {
    //     console.log(results, 'subscribe');
    //   })

    // this.haciendaSVC.first()
    //   .pipe(
    //     mergeMap((res1) => this.haciendaSVC.second()
    //       .pipe(
    //         map(res2 => { return { res1, res2 } })
    //       )
    //     )
    //   ).subscribe(results => {
    //     console.log(results.res1);
    //   })


    //   of(1).pipe(
    //     switchMap(res => this.haciendaSVC.first()),
    //     tap(res => console.log(res, 'ESTO ES USANDO of'))
    //   ).subscribe({
    //     next: (res) => {
    //     },
    //     error: (res) => {
    //       console.log(res);
    //     }
    //   });



    //   this.subject$.pipe(
    //     switchMap(res => this.haciendaSVC.first()),
    //     tap(res => console.log(res, 'ESTO ES USANDO Subject'))
    //   ).subscribe({
    //     next: (res) => {
    //     },
    //     error: (res) => {
    //       console.log(res);
    //     }
    //   });

    //   this.subject$.next(null);

    //   this.bsubject$.pipe(
    //     switchMap(res => this.haciendaSVC.first()),
    //     tap(res => console.log(res, 'ESTO ES USANDO BehaviorSubject'))
    //   ).subscribe({
    //     next: (res) => {
    //     },
    //     error: (res) => {
    //       console.log(res);
    //     }
    //   });

    //   forkJoin({
    //     Primero: this.haciendaSVC.first(),
    //     Segundo: this.haciendaSVC.first()
    //   }).subscribe(res => console.log(res, 'FORKJOIN'))

    //   combineLatest({
    //     Primero: this.haciendaSVC.first(),
    //     Segundo: this.haciendaSVC.first()
    //   }).subscribe(res => console.log(res, 'COMBINE LATEST'))

  }

}
