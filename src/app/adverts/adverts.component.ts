import { Component, OnDestroy, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { offerService } from '../offer-creation/offer-creation-service';
import { Offer } from '../offer-creation/offer.model';


@Component({
  selector: 'app-adverts',
  templateUrl: './adverts.component.html',
  styleUrls: ['./adverts.component.scss']
})
export class AdvertsComponent implements OnInit, OnDestroy {
  // starRating = 0;
  // heartIcon = false;
  displayedOffers: Offer[] = [];


  // ctrl = new FormControl(null, Validators.required);
  constructor(private offerService: offerService) { }

  ngOnInit(): void {
    this.offerService.downloadOffers();
    this.offerService.arrayData.subscribe(responseData => {
      this.displayedOffers = responseData;
    });
  }

  ngOnDestroy(): void {

  }
  // toggle() {
  //   if (this.ctrl.disabled) {
  //     this.ctrl.enable();
  //   } else {
  //     this.ctrl.disable();
  //   }
  // }

  // showValue() {
  //   console.log(this.ctrl.value);
  // }

  // toggleHeart() {
  //   this.heartIcon = !this.heartIcon
  // }

}
