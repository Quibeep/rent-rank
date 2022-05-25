import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-adverts',
  templateUrl: './adverts.component.html',
  styleUrls: ['./adverts.component.scss']
})
export class AdvertsComponent implements OnInit {
  starRating = 0;
  heartIcon = false;

  ctrl = new FormControl(null, Validators.required);
  constructor() { }

  ngOnInit(): void {

  }

  toggle() {
    if (this.ctrl.disabled) {
      this.ctrl.enable();
    } else {
      this.ctrl.disable();
    }
  }

  showValue() {
    console.log(this.ctrl.value);
  }

  toggleHeart() {
    this.heartIcon = !this.heartIcon
  }

}
