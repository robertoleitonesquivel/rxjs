import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject, takeUntil } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class PresenteService {

  public subject$ = new Subject();
  public bejaviorSubject$ = new BehaviorSubject<string>('Inicio');

  constructor() {
    this.subject$.subscribe({
      next: (data) => {
        console.log(data);
      }
    });

    this.bejaviorSubject$.subscribe(data => console.log(data))
  }

  public unsuscribe(): void {
    this.subject$.complete();
  }
}
