import { MatButtonModule, MatCheckboxModule, MatFormFieldModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { NgModule } from '@angular/core';

@NgModule({

  imports: [MatButtonModule, MatCheckboxModule, MatIconModule, MatToolbarModule, MatTableModule, MatFormFieldModule],
  exports: [MatButtonModule, MatCheckboxModule, MatIconModule, MatToolbarModule, MatTableModule, MatFormFieldModule],
})
export class MaterialModule { }