import {Directive,HostListener} from '@angular/core'

@Directive({
selector: '[zipValid]'
})
export class zipDirective {

@HostListener('input', ['$event'])
onKeyDown(event: KeyboardEvent) {
const input = event.target as HTMLInputElement;

let trimmed = input.value.replace(/\s+/g, '');

if (trimmed.length > 6) {
  trimmed = trimmed.substr(0, 6);
}


trimmed = trimmed.replace(/-/g,'');

 let numbers = [];

 numbers.push(trimmed.substr(0,2));
 if(trimmed.substr(2,5)!=="")
 numbers.push(trimmed.substr(2,3));

 console.log(numbers)

input.value = numbers.join('-');

  }
}
