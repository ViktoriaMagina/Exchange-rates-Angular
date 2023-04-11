import { Component, Inject } from '@angular/core';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { MatDialogRef } from '@angular/material/dialog';
interface DialogData {
  list: string[];
  checkList: string[];
}

@Component({
  selector: 'app-dialog-currencies',
  templateUrl: './dialog-currencies.component.html',
  styleUrls: ['./dialog-currencies.component.scss'],
})
export class DialogCurrenciesComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogCurrenciesComponent>,
    @Inject(DIALOG_DATA) public data: DialogData
  ) {}
  save(item: string) {
    this.dialogRef.close(item);
  }
}
