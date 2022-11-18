import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { BehaviorSubject, catchError, combineLatest, concatMap, debounceTime, delay, distinctUntilChanged, filter, finalize, forkJoin, from, fromEvent, map, mergeMap, observable, Observable, of, pipe, startWith, Subject, switchMap, tap } from 'rxjs';
import { HaciendaService } from 'src/app/core/services/hacienda.service';
import { SearchService } from 'src/app/core/services/search.service';

@Component({
  selector: 'app-operadores',
  templateUrl: './operadores.component.html',
  styleUrls: ['./operadores.component.scss']
})
export class OperadoresComponent implements OnInit {

  subject$ = new Subject<any>();
  bsubject$ = new BehaviorSubject<any>(null);

  frmInput = new FormControl('');

  list!: Observable<string[]>;
  qty!: Observable<number>;

  options: User[] = [{ ID: 1, Name: '086581017316' }, { ID: 2, Name: 'Wendy' }, { ID: 3, Name: 'Fabiola' }];
  filteredOptions!: Observable<User[]>;



  @ViewChild('searchBtn', { static: true }) searchBtn!: ElementRef;
  @ViewChild('auto', { static: true }) autoCompleteEvent!: ElementRef;
  @ViewChild('scanner', { static: true }) scanner!: ElementRef;

  constructor(
    private haciendaSVC: HaciendaService,
    private searchService: SearchService
  ) { }

  ngOnInit(): void {

    this.onLoad();
  }

  private _filter(value: string): User[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.Name.toLowerCase().includes(filterValue));
  }

  private onLoad() {

    //Este metodo cancela las peticiones al servidor si no han terminado
    //this.searchFromEvent();

    //Este metodo se ejecuta cuando se selecciona el select
    //this.onChangeSelect();

    //this.EventAutoComplete();

    this.filteredOptions = this.frmInput.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.Name)),
      map(Name => (Name ? this._filter(Name) : this.options.slice())),
    );

    this.frmInput.valueChanges.pipe(
      filter((res: any) => res instanceof Object),
      tap(res => this.frmInput.setValue('')),
      concatMap(res => this.searchService.getData('Roberto')),
      tap(res => console.log(res)),
      filter((res: string[]) => res && res.length > 0),
      switchMap(res => this.searchService.getCount('Roberto')),
      tap(res => console.log(res)),
      finalize(() => console.log('res'))
    ).subscribe();

    // this.frmInput.valueChanges.pipe(
    //   filter((res: any) => res instanceof Object),
    //   tap(res => this.frmInput.setValue('')),
    //   concatMap(res => this.searchService.getData('Roberto').pipe(
    //     switchMap(res => this.searchService.getCount('Roberto')),
    //     tap(res => console.log(res)),
    //   )),
    //   tap(res => console.log(res)),
    //  // filter((res: string[]) => res && res.length > 0),
    //   finalize(() => console.log('res'))
    // ).subscribe();

    // this.frmInput.valueChanges.pipe(
    //   tap(res => console.log(res)),
    //   filter((res: any) => typeof res  === 'string'),
    //   tap(res => this.frmInput.setValue('')),
    //   tap(res => console.log(res))
    // ).subscribe();

    // fromEvent(this.scanner.nativeElement, 'keyup').pipe(
    //   tap((res: any) => console.log(res.key, res.target.value)),
    //   filter((res: any) => res.key === 'Enter'),
    //   debounceTime(500),
    //   tap(res => console.log(res, res.target.value))
    // ).subscribe();



    // this.list = this.frmInput.valueChanges.pipe(
    //   filter(res => res.length > 3),
    //   distinctUntilChanged(),
    //   debounceTime(350),
    //   switchMap(res => this.searchService.getData(res)),
    //   catchError(error => {
    //     console.log(error)
    //     return of([]);
    //   })
    // );

    // this.qty = this.frmInput.valueChanges.pipe(
    //   filter(res => res.length > 3),
    //   distinctUntilChanged(),
    //   debounceTime(350),
    //   switchMap(res => this.searchService.getCount(res)),
    //   catchError(error => {
    //     console.log(error)
    //     return of(0);
    //   })
    // );

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

  public search(): void {
    // of(1).pipe(
    //   switchMap(res => this.searchService.getData('Roberto'))
    // )
    //   .subscribe((res) => console.log());
  }

  public searchFromEvent(): void {
    fromEvent(this.searchBtn.nativeElement, 'click').pipe(
      switchMap(res => this.searchService.getData('Roberto'))
    ).subscribe((res) => console.log(res));
  }

  public onChangeSelect(): void {
    this.frmInput.valueChanges.pipe(
      tap(res => console.log(res)),
      switchMap(res => this.searchService.getData('Roberto'))
    ).subscribe((res) => console.log(res));
  }

  public optionSelected(value: User, event: MatAutocompleteSelectedEvent): void {
    // console.log(value);
  }

  public EventAutoComplete(): void {
    fromEvent(this.autoCompleteEvent.nativeElement, 'MatAutocompleteSelectedEvent').pipe(
      tap(res => console.log(res)),
      switchMap(res => this.searchService.getData('Roberto'))
    ).subscribe((res) => console.log(res));
  }

  public displayFn(user: User): string {
    return user && user.Name ? user.Name : '';
  }

}

export interface User {
  ID: number;
  Name: string;
}
