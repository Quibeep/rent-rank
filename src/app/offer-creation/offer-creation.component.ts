import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { offerService } from './offer-creation-service';
import { Offer } from './offer.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../header/authentication-service';

@Component({
  selector: 'app-offer-creation',
  templateUrl: './offer-creation.component.html',
  styleUrls: ['./offer-creation.component.scss']
})
export class OfferCreationComponent implements OnInit, OnDestroy {
  offerForm: FormGroup = new FormGroup({});

  localization: string;
  price: string;
  rooms: string;
  description: string;

  picture1: string;
  picture2: string;
  picture3: string;
  picture4: string;
  picture5: string;
  picture6: string;
  picture7: string;
  picture8: string;

  pictures: Array<string> = [];

  valuesSubscription: Array<Subscription> = [];
  // sprawdzic potem z Pawlem czy dziala


  constructor(private router: Router, private offerService: offerService, private http: HttpClient, private authService: AuthService ) {

   }

   onSubmit() {
    console.log(this.offerForm);

  }

  sendPost(
    localization: string,
    price: string,
    rooms: string,
    description: string,
    picture1?: string,
    picture2?: string,
    picture3?: string,
    picture4?: string,
    picture5?: string,
    picture6?: string,
    picture7?: string,
    picture8?: string) {
    this.offerService.postOffer(localization, price, rooms, description, picture1, picture2, picture3, picture4, picture5, picture6, picture7, picture8);
  }

  onPreview(picture1?, picture2?, picture3?, picture4?, picture5?, picture6?, picture7?, picture8?) {
    let picturesArray = this.pictures;
    picturesArray.push(picture1, picture2, picture3, picture4, picture5, picture6, picture7, picture8);

  }

  onExitPreview() {
    this.pictures = [];
    this.localization = null;
    this.price = null;
    this.rooms = null;
    this.description = null;
    this.picture1 = null;
    this.picture2 = null;
    this.picture3 = null;
    this.picture4 = null;
    this.picture5 = null;
    this.picture6 = null;
    this.picture7 = null;
    this.picture8 = null;
  }

  checkData() {
    this.offerService.downloadOffers();
  }


  ngOnInit(): void {
    this.offerForm = new FormGroup({
      'localization': new FormControl(null,[Validators.required]),
      'price': new FormControl(null,[Validators.required]),
      'rooms': new FormControl(null,[Validators.required]),
      'radio1': new FormControl(null,[]),
      'radio2': new FormControl(null,[]),
      'radio3': new FormControl(null,[]),
      'radio4': new FormControl(null,[]),
      'radio5': new FormControl(null,[]),
      'radio6': new FormControl(null,[]),
      'radio7': new FormControl(null,[]),
      'radio8': new FormControl(null,[]),
      'picturePath1': new FormControl(null,[]),
      'picturePath2': new FormControl(null,[]),
      'picturePath3': new FormControl(null,[]),
      'picturePath4': new FormControl(null,[]),
      'picturePath5': new FormControl(null,[]),
      'picturePath6': new FormControl(null,[]),
      'picturePath7': new FormControl(null,[]),
      'picturePath8': new FormControl(null,[]),
      'description': new FormControl(null,[Validators.required]),
    });



    const sub1 = this.offerForm.get('localization').valueChanges.subscribe((localization) => {
      this.localization = localization;
    });

    const sub2 =  this.offerForm.get('price').valueChanges.subscribe((price) => {
      this.price = price;
    });
    const sub3 = this.offerForm.get('rooms').valueChanges.subscribe((rooms) => {
      this.rooms = rooms;
    });
    const sub4 =  this.offerForm.get('radio1').valueChanges.subscribe((radio1) => {
      console.log('Radio clicked' + radio1)
    });
    const sub5 = this.offerForm.get('radio2').valueChanges.subscribe((radio2) => {

    });
    const sub6 =  this.offerForm.get('radio3').valueChanges.subscribe((radio3) => {

    });
    const sub7 = this.offerForm.get('radio4').valueChanges.subscribe((radio4) => {

    });
    const sub8 = this.offerForm.get('radio5').valueChanges.subscribe((radio5) => {

    });
    const sub9 =  this.offerForm.get('radio6').valueChanges.subscribe((radio6) => {

    });
    const sub10 =  this.offerForm.get('radio7').valueChanges.subscribe((radio7) => {

    });
    const sub11 = this.offerForm.get('radio8').valueChanges.subscribe((radio8) => {

    });


    this.valuesSubscription.push(sub1, sub2, sub3, sub4, sub5, sub6, sub7, sub8, sub9, sub10, sub11)

    // this.offerForm.get('picturePath1').valueChanges.subscribe((picturePath1) => {
    //   this.picture1 = picturePath1;

    // });
    // this.offerForm.get('picturePath2').valueChanges.subscribe((picturePath2) => {
    //   this.picture2 = picturePath2;

    // });
    // this.offerForm.get('picturePath3').valueChanges.subscribe((picturePath3) => {
    //   this.picture3 = picturePath3;

    // });
    // this.offerForm.get('picturePath4').valueChanges.subscribe((picturePath4) => {
    //   this.picture4 = picturePath4;

    // });
    // this.offerForm.get('picturePath5').valueChanges.subscribe((picturePath5) => {
    //   this.picture5 = picturePath5;

    // });
    // this.offerForm.get('picturePath6').valueChanges.subscribe((picturePath6) => {
    //   this.picture6 = picturePath6;

    // });
    // this.offerForm.get('picturePath7').valueChanges.subscribe((picturePath7) => {
    //   this.picture7 = picturePath7;

    // });
    // this.offerForm.get('picturePath8').valueChanges.subscribe((picturePath8) => {
    //   this.picture8 = picturePath8;

    // });

    this.offerForm.get('description').valueChanges.subscribe((description) => {
      this.description = description;
    });
  }


  ngOnDestroy(): void {
    this.valuesSubscription.forEach(subscription => subscription.unsubscribe());
  }
}
