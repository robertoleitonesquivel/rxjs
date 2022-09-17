import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { catchError, filter, finalize, Observable, of } from 'rxjs';
import { LoginModel } from 'src/app/core/Model/login.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  /*FORMULARIOS*/
  frmLogin!: FormGroup;

  /*OBSERVABLES*/
  private observer!: Observable<LoginModel>;

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.frmLogin = this.fb.group({
      UserName: [''],
      Password: ['']
    });
  }

  public start(loginModel: LoginModel): void {

    let data: LoginModel = this.frmLogin.value;

    this.observer = of(loginModel);

    this.observer.pipe(
      filter(res => loginModel.Password === '456'),
      finalize(() => { console.log('Finalize Llegue') })
      //catchError(error => error)
    ).subscribe({
      next: (res: any) => {
        console.log(res, 'subscribe')
      },
      error: (error: string) => {
        console.log(error)
      }
    })

    // window.sessionStorage.setItem('currentUser', JSON.stringify(loginModel));

  }

  private final(): void {

  }


}
