import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import {
  MatFormFieldModule, MatInputModule, MatSelectModule, MatSortModule, MatTableModule, MatPaginatorModule
} from '@angular/material';

const MODULES = [ MatFormFieldModule, MatInputModule, MatSelectModule,
  MatSortModule, MatTableModule, MatPaginatorModule ];

@NgModule({
  imports: [
    CommonModule, MODULES
  ],
  exports: [ MODULES ],
  declarations: []
})
export class MaterialModule { }
