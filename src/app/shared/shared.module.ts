import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSliderModule,
    MatCheckboxModule,
    MatRippleModule
  ],
  exports: [
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSliderModule,
    MatCheckboxModule,
    MatRippleModule
  ]
})
export class SharedModule { }
