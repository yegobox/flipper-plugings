import { Variant } from './variant';

export class Product {
  id?: any;
  name: string;
  description?: string;
  picture?: string;

  branchId?: any;
  businessId?: any;
  supplierId?: any;
  isManufactured?: boolean;
  isBatchTracked?: boolean;
  isStandardProduct?: boolean;
  isProductWithVariants?: boolean;
  isCompositeProduct?: boolean;
  enableTrackingInventory?: boolean;
  categoryId?: any;
  brandId?: any;
  taxId?: any;
  active?: boolean;
  hasPicture?: boolean;
  isDraft?: boolean;
  isOnPos?: boolean;
  color?: string;
  syncedOnline?: boolean;
  isCurrentUpdate?: boolean;
  createdAt?: any;
  updatedAt?: any;
  table?:string;
  docId?:string;

  constructor(params: object = {}) {
    for (const name in params) {
      this[name] = params[name];
    }
  }
}