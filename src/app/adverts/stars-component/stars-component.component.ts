import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-stars-component',
  templateUrl: './stars-component.component.html',
  styleUrls: ['./stars-component.component.scss']
})
export class StarsComponentComponent implements OnInit {
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
