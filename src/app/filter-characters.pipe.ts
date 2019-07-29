import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCharacters'
})
export class FilterCharactersPipe implements PipeTransform {

  transform(items: any[], field : string, value : any): any[] {
    console.log(items)
    console.log(field)
    console.log(value)

    if ((value.button == "" && value.search =='') ||!value || value.length == 0) return items;
    return items.filter(item => 
      (item.statusClassCss ==value.button || value.button == "") && item.name.toLowerCase().includes(value.search.toLowerCase())
      
      );

    return items;
  }

}
