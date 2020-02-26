import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { Observable, Subject} from 'rxjs';
import { TIME_PERIODS } from '../../lib/constants/stocks-time-periods.constants';
import { IStocksTimePeriods } from '../../lib/interfaces/stocks-time-periods.interface';

@Component({
  selector: 'coding-challenge-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit, OnDestroy {
  public stockPickerForm: FormGroup;
  public quotes$: Observable<(string | number)[][]> = this.priceQuery.priceQueries$;
  public timePeriods: IStocksTimePeriods[] = TIME_PERIODS;
  private unsubscribe$: Subject<void> = new Subject<void>();
  constructor(private fb: FormBuilder, private priceQuery: PriceQueryFacade) {
    this.stockPickerForm = fb.group({
      symbol: [null, Validators.required],
      period: [null, Validators.required]
    });
  }

  public ngOnInit(): void {
    this.stockPickerForm.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .pipe(debounceTime(1000))
      .subscribe(this.fetchQuote);
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private fetchQuote = (): void => {
    if (this.stockPickerForm.valid) {
      const { symbol, period } = this.stockPickerForm.value;
      this.priceQuery.fetchQuote(symbol, period);
    }
  }
}
