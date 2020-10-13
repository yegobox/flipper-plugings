export class BranchProducts {
  id?: any;
  branchId?: any;
  productId?: any;
  syncedOnline?: boolean;
  table?:string;
  docId?:string;
  constructor(params: object = {}) {
    for (const name in params) {
      this[name] = params[name];
    }
  }
}