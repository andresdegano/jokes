import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { MatSortModule } from '@angular/material/sort';
import { EmailObfuscationPipe } from './pipes/email-obfuscation.pipe';

@NgModule({
  declarations: [DeleteDialogComponent, EmailObfuscationPipe],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MatPaginatorModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSortModule,
  ],
  exports: [
    MatPaginatorModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSortModule,
    EmailObfuscationPipe,
  ],
  entryComponents: [DeleteDialogComponent],
})
export class SharedModule {}
