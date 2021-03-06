import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  EventEmitter,
  Output,
} from '@angular/core'
import { Variant, Stock, SettingsService } from '@enexus/flipper-components'
import { StockService } from '../services/stock.service'
import { VariationService } from '../services/variation.service'

export class StockControl {
  id?: string
  reason?: string
  currentStock?: number
  previousStock?: number
  lowStock?: number
  branchId?: string
  canTrackingStock?: boolean
  showLowStockAlert?: boolean
  stock?: Stock
}
@Component({
  selector: 'flipper-manage-stock',
  templateUrl: './manage-stock.component.html',
  styleUrls: ['../create-product/create-product.component.css', './manage-stock.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageStockComponent implements OnInit {
  @Input() variation: Variant
  @Input() stocks: Stock[] = []
  isFocused = ''

  stockControl: StockControl[] = []

  @Output() stockControlEmit = new EventEmitter<StockControl[]>()
  reasons: any[]

  constructor(
    public stock: StockService,
    private variant: VariationService,
    private cd: ChangeDetectorRef,
    private setting: SettingsService
  ) {}

  ngOnInit() {
    this.reasons = this.setting.reasons()
    this.loadStocks()
  }
  async loadStocks() {
    if (this.variation) {
      const stockControl: Stock[] = this.stocks
      if (stockControl.length > 0) {
        stockControl.forEach(stock => {
          const stockCtrl: StockControl = {
            id: stock.id,
            reason: '',
            branchId: stock.branchId,
            currentStock: stock.currentStock,
            previousStock: stock.currentStock,
            lowStock: stock.lowStock,
            canTrackingStock: stock.canTrackingStock,
            showLowStockAlert: stock.showLowStockAlert,
            stock: stock,
          }
          this.stockControl.push(stockCtrl)
        })
      }
    }
  }

  updateReason(stockControl: StockControl, event: any) {
    stockControl.reason = event.value
    stockControl.currentStock = 0

    this.stockControlEmit.emit(this.stockControl)
  }
  updateInput() {
    this.stockControlEmit.emit(this.stockControl)
  }

  focusing(value: any) {
    this.isFocused = value
  }
  focusingOut() {
    this.isFocused = ''
  }

  updateStockControl(stockControl: StockControl) {
    const stockControls = this.stockControl
    const arr: StockControl[] = []

    this.stockControl = []
    stockControls.forEach(sc => {
      if (sc.id === stockControl.id) {
        sc = stockControl
      }
      arr.push(sc)
    })
    this.stockControl = arr
  }
}
