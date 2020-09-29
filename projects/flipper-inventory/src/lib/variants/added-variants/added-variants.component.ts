import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { VariationService } from '../../services/variation.service';
import { StockService } from '../../services/stock.service';
import { Product, Variant, CalculateTotalClassPipe, Business } from '@enexus/flipper-components';
import { DialogService, DialogSize } from '@enexus/flipper-dialog';
import { AddVariantComponent } from '../add-variant/add-variant.component';

@Component({
  selector: 'flipper-added-variants',
  templateUrl: './added-variants.component.html',
  styleUrls: ['../../create-product/create-product.component.css', './added-variants.component.css']
})
export class AddedVariantsComponent implements OnInit {
  item: Product;
  variantion:Variant[];
  business:Business;
  @Input('product')
  set product(item: Product) {
    this.item = item;
  }
  get product(): Product {
    return this.item;
  }

  @Input('variantions')
  set variantions(items: Variant[]) {
  this.variantion = items;
  }
  get variantions(): Variant[] {
  return this.variantion;
  }

  @Input('defaultBusiness')
  set defaultBusiness(item: Business) {
  this.business = item;
  }
  get defaultBusiness(): Business {
  return this.business;
  }
  @Output() didAddNewVariant = new EventEmitter < boolean > (false);

  constructor(private dialog: DialogService,
    private totalPipe: CalculateTotalClassPipe,
    public variant: VariationService, public stock: StockService) { }

  ngOnInit() {
    
    this.variant.activeBusiness();
  }

  getTotalStock(variantId, key: any): number {
    this.stock.variantStocks(variantId);
    if (this.stock.stocks.length > 0) {
      return this.totalPipe.transform(this.stock.stocks, key);
    } else {
      return 0;
    }
  }

  convertInt(num) {
    return parseInt(num, 10);
  }

 
  public openAddVariantDialog(product: Product): any {
    return this.dialog.open(AddVariantComponent, DialogSize.SIZE_MD, {product:product,currency:this.defaultBusiness.currency}).subscribe(result => {
      if (result === 'done') {
        console.log(result);
        this.didAddNewVariant.emit(true);
      }

    });
  }

  deleteProductVariation() {

    if (this.product) {
      this.variant.deleteProductVariations(this.product);
      this.variant.init(this.product);
    }

  }

  allVariant(product: Product) {
    const variants: Variant[] = [];

    this.variant.allVariant(product);
    if (this.variant.allVariants.length > 0) {
      this.variant.allVariants.forEach(variant => {

        variants.push(variant);

      });
    }
    return variants;
  }

  deleteVariation(variant: Variant) {
    if (this.product) {
      this.variant.deleteVariation(variant, this.product);
    }
  }
}