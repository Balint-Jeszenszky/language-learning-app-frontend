import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const material = [
  MatTabsModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatToolbarModule,
  MatTableModule,
  MatCardModule,
  MatChipsModule,
  MatDialogModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatIconModule,
  MatDividerModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
];

@NgModule({
  imports: [material],
  exports: [material],
})
export class MaterialModule { }
