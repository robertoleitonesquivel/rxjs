import { Component, ElementRef, Renderer2, ViewChild } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { Subject } from "rxjs";
import { PresenteService } from "src/app/Core/present.service";


@Component({
  selector: 'app-client',
  templateUrl: './teacher.component.html'
})
export class TeacherComponent {

  @ViewChild('pdf', { static: true }) pdf!: ElementRef;


  constructor(
    private PresenteSvc: PresenteService,
    private sanitizer: DomSanitizer,
    private render: Renderer2) {

  }

  ngOnInit() {
    this.onLoad();
  }




  private onLoad(): void {
    // this.PresenteSvc.subject$.subscribe(data => console.log(data))
    this.PresenteSvc.bejaviorSubject$.next('teacher');
    this.PresenteSvc.subject$.next(20);


  }

  public unsuscribe(): void {
    this.PresenteSvc.unsuscribe();
  }

  data = this.sanitizer.bypassSecurityTrustResourceUrl('data:application/pdf;base64,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YW1lIC9BQUFBQUIrQXJpYWwgCi9JdGFsaWNBbmdsZSAwCi9TdGVtViAwIAovU3RlbUggMCAKL0F2Z1dpZHRoIDQ0MSAKL0ZvbnRGaWxlMiAxNCAwIFIgCi9MZWFkaW5nIDAgCi9NYXhXaWR0aCAyNjY1IAovTWlzc2luZ1dpZHRoIDQ0MSAKL1hIZWlnaHQgMCAKPj4gCmVuZG9iaiAKMTMgMCBvYmogClsgLTY2NSAtMzI1IDIwMDAgMTA0MCBdIAplbmRvYmogCjE1IDAgb2JqIAooUG93ZXJlZCBCeSBDcnlzdGFsKSAKZW5kb2JqIAoxNiAwIG9iaiAKKENyeXN0YWwgUmVwb3J0cykgCmVuZG9iaiAKMTcgMCBvYmogCjw8IAovUHJvZHVjZXIgKFBvd2VyZWQgQnkgQ3J5c3RhbCkgIAovQ3JlYXRvciAoQ3J5c3RhbCBSZXBvcnRzKSAgCj4+IAplbmRvYmogCnhyZWYgCjAgMTggCjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDAxNyAwMDAwMCBuIAowMDAwMDA2NTI2IDAwMDAwIG4gCjAwMDAwMDY2MjUgMDAwMDAgbiAKMDAwMDAwNjY1OSAwMDAwMCBuIAowMDAwMDAwMTk0IDAwMDAwIG4gCjAwMDAwMDY2OTMgMDAwMDAgbiAKMDAwMDAwNjc1OSAwMDAwMCBuIAowMDAwMDA2NzkzIDAwMDAwIG4gCjAwMDAwMDY4ODUgMDAwMDAgbiAKMDAwMDAwNzA1NiAwMDAwMCBuIAowMDAwMDAwMzY0IDAwMDAwIG4gCjAwMDAwMDcwODUgMDAwMDAgbiAKMDAwMDAwNzM1OSAwMDAwMCBuIAowMDAwMDAwNjUyIDAwMDAwIG4gCjAwMDAwMDc0MDIgMDAwMDAgbiAKMDAwMDAwNzQ0MiAwMDAwMCBuIAowMDAwMDA3NDc5IDAwMDAwIG4gCnRyYWlsZXIgCjw8IAovU2l6ZSAxOCAKL1Jvb3QgMSAwIFIgCi9JbmZvIDE3IDAgUiAKPj4gCnN0YXJ0eHJlZiAKNzU2NyAKJSVFT0YNCg==');

}