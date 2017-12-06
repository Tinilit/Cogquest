import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'deleteDialog',
  templateUrl: 'deleteDialog.component.html',
  styleUrls: ['deleteDialog.component.css'],
})

export class DeleteDialogComponent {

  public constructor(
    private dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  yes() {
    this.data = null;
    this.dialogRef.componentInstance.data = null;
    this.dialogRef.close();
  }
  no() {
    this.dialogRef.close();
  }
}
