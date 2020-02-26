import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { FetchPriceQuery } from './price-query.actions';
import { PriceQueryPartialState } from './price-query.reducer';
import { getSelectedSymbol, getAllPriceQueries } from './price-query.selectors';
import { map, skip } from 'rxjs/operators';
import { PriceRange } from './price-query.type';

@Injectable()
export class PriceQueryFacade {
  public selectedSymbol$ = this.store.pipe(select(getSelectedSymbol));
  public priceQueries$ = this.store.pipe(
    select(getAllPriceQueries),
    skip(1),
    map(priceQueries =>
      priceQueries.map(priceQuery => [priceQuery.date, priceQuery.close])
    )
  );

  constructor(private store: Store<PriceQueryPartialState>) { }

  public fetchQuote(symbol: string, dateRange: PriceRange): void {
    const fromDate = new Date(dateRange.from);
    const toDate = new Date();
    const differenceInYear = toDate.getFullYear() - fromDate.getFullYear();
    let period = '';
    if (differenceInYear === 0) {
      const differenceInMonth = toDate.getMonth() - fromDate.getMonth();
      if(differenceInMonth < 1){
          period = '1m';
        } else if(differenceInMonth < 3){
          period = '3m';
        } else if(differenceInMonth < 6){
          period = '6m';
        } else {
          period = 'ytd';
        }
    } else {
          if(differenceInYear < 1){
              period = '1y';
            } else if(differenceInYear < 2){
              period = '2y';
            } else if(differenceInYear < 5){
              period = '5y';
            } else {
              period = 'max';
            }
    }
    this.store.dispatch(new FetchPriceQuery(symbol, period, dateRange));
  }
}
