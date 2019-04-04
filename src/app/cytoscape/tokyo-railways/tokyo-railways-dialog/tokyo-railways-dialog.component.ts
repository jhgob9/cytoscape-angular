import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../DialogData';


@Component({
  selector: 'app-tokyo-railways-dialog',
  templateUrl: './tokyo-railways-dialog.component.html',
  styleUrls: ['./tokyo-railways-dialog.component.css']
})

export class TokyoRailwaysDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<TokyoRailwaysDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  changeColor(element: any) {
    this.data.color = $(element.target).closest('button').val();
    this.dialogRef.close(this.data.color);
  }

}
