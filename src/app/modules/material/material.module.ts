import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

const material = [
  MatTabsModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
];

@NgModule({
  imports: [material],
  exports: [material],
})
export class MaterialModule { }
