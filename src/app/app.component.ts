import { Component, OnInit } from '@angular/core';
import { CurrenciesService } from './services/currencies.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogCurrenciesComponent } from './components/dialog-currencies/dialog-currencies.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    public currenciesService: CurrenciesService,
    public dialog: MatDialog
  ) {}
  loading: boolean = true;
  currenciesList: string[] = ['USD', 'EUR', 'GBP', 'CNY', 'JPY', 'TRY'];
  private currenciesCheckList: string[] = ['USD', 'EUR', 'GBP'];
  ngOnInit(): void {
    this.currenciesService.getItems(this.currenciesCheckList);
    this.currenciesService.update(this.currenciesCheckList);
  }
  openDialog() {
    const dialogConfig = {
      width: '300px',
      data: {
        list: this.currenciesList,
        checkList: this.currenciesCheckList,
      },
    };
    const dialogRef = this.dialog.open(DialogCurrenciesComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data) => {
      if (data && !this.currenciesCheckList.includes(data)) {
        this.currenciesCheckList.push(data);
        this.currenciesService.setNewItem(data);
      }
    });
  }
}
