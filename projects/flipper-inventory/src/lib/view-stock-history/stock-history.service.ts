import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { StockHistory } from '@enexus/flipper-components';
import { StockService } from '../services/stock.service';

@Injectable({
  providedIn: 'root'
})
export class StockHistoryService {
  variantsSubject: BehaviorSubject<StockHistory[]>;
  private readonly variantsMap = new Map<string, StockHistory>();
  constructor(private stockSvc: StockService) {
    this.variantsSubject = new BehaviorSubject([]);
  }


  public loadAllStockHistory(variantIds: number[]): Observable<StockHistory[]> {
    const data: StockHistory[] = [];
    this.stockSvc.productStockHistory(variantIds).forEach(d => data.push(d as StockHistory));
    this.variantsSubject.next(data);
    this.variantsMap.clear();
    data.forEach(variant => this.variantsMap.set(variant.id as any, variant));
    return of(data);
  }

  public host(id: string): StockHistory | undefined {
    return this.variantsMap.get(id);
  }
}
