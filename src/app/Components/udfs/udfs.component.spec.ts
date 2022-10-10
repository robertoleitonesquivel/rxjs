import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UDFsComponent } from './udfs.component';

describe('UDFsComponent', () => {
  let component: UDFsComponent;
  let fixture: ComponentFixture<UDFsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UDFsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UDFsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
