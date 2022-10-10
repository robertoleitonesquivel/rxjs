import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UDFs, UDFsTarget } from 'src/app/Core/Models/UDFs.interface';

@Component({
  selector: 'app-udfs',
  templateUrl: './udfs.component.html',
  styleUrls: ['./udfs.component.scss']
})
export class UDFsComponent implements OnInit {

  /*FORMULARIOS */
  datetime = new FormControl('')
  text = new FormControl('')

  /*VARIABLES*/
  data!: UDFsTarget;

  @Input('udfs') udfs!: UDFs;
  @Output('result') result = new EventEmitter<UDFsTarget>();

  constructor() { }

  ngOnInit(): void {
  }

  add(): void {

    if (this.udfs.Type === 'DateTime') {
      this.data = {
        Name: this.udfs.Name,
        value: this.datetime.value
      }
    }

    if (this.udfs.Type === 'text') {
      this.data = {
        Name: this.udfs.Name,
        value: this.text.value
      }
    }

    if (this.data && this.data.value !== "")
      this.result.emit(this.data);

  }

}


