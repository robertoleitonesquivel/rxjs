import { NgModule } from "@angular/core";

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from "@angular/material/core";
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [

  ],
  imports: [

  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatCardModule
  ],
  providers: []
})
export class MaterialModule { }
