import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, interval } from 'rxjs';
import { delay, EMPTY } from 'rxjs';

interface dateObjValute {
  ID: string;
  NumCode: string;
  CharCode: string;
  Nominal: number;
  Name: string;
  Value: number;
  Previous: number;
  Difference: number;
}

@Injectable({
  providedIn: 'root',
})
export class CurrenciesService {
  serverData: any;
  data: dateObjValute[] = [];
  actualDateGet: string = '';
  loading: boolean = true;
  constructor(private http: HttpClient) {}
  getItems(list: string[]) {
    this.http
      .get(`https://www.cbr-xml-daily.ru/daily_json.js`)
      .pipe(
        delay(800),
        catchError((error: HttpErrorResponse) => {
          if (error.error instanceof Error) {
            console.error('An error occurred:', error.error.message);
          } else {
            console.error(
              `Backend returned code ${error.status}, body was: ${error.error}`
            );
          }
          return EMPTY;
        })
      )
      .subscribe((res: any) => {
        this.data = [];
        this.loading = true;
        this.serverData = res;
        this.actualDateGet = this.formatDate(res.Timestamp);
        list.forEach((item: string) => {
          const newEl = {
            ...this.serverData.Valute[item],
            Difference:
              Math.round(
                (this.serverData.Valute[item].Value -
                  this.serverData.Valute[item].Previous) *
                  1000
              ) / 1000,
          };
          this.data.push(newEl);
        });
        this.loading = false;
      });
  }

  setNewItem(item: string) {
    const newEl = {
      ...this.serverData.Valute[item],
      Difference:
        Math.round(
          (this.serverData.Valute[item].Value -
            this.serverData.Valute[item].Previous) *
            1000
        ) / 1000,
    };
    this.data.push(newEl);
  }
  update(list: string[]) {
    interval(5000).subscribe(() => this.getItems(list));
  }
  formatDate(date: string): string {
    return new Date(date).toLocaleString();
  }
}
