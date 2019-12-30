import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
  name: 'arrayRemoveItem'
})
@Injectable({
  providedIn: 'root'
})
export class ArrayRemoveItemPipe implements PipeTransform {

  transform<T>(arrayOfData: Array<T>, value: object): Array<T> {
    return this.arrayRemove<T>(arrayOfData, value);
  }

  arrayRemove<T>(arr: Array<T>= [], value): Array<T> {
    if (arr.length > 0) {
      return arr.filter((ele) => {
        return ele.id !== value.id;
    });
    } else {
      return arr;
    }

 }

}
