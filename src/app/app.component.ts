import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Subject';


  constructor(private router: Router) {
  }

  public navegar(): void {

    let info = {
      Id: 0,
      Name: 'Roberto'
    };

    let send = btoa(JSON.stringify(info));

    this.router.navigate(['client', send, 1213]);
  }
}
