import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSliderModule,
    MatCheckboxModule
  ],
  exports: [
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSliderModule,
    MatCheckboxModule
  ]
})
export class SharedModule { }
