import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-offer-creation',
  templateUrl: './offer-creation.component.html',
  styleUrls: ['./offer-creation.component.scss']
})
export class OfferCreationComponent implements OnInit {
  localization: string;
  price: string;
  rooms: string;
  description: string;

  picture1: string;
  picture2: string;
  picture3: string;
  picture4: string;
  picture5: string;

  pictures: Array<string>;

  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  constructor(private router: Router) { }

  onPreview(picture1, picture2, picture3, picture4?, picture5?) {
    picture1 = this.picture1;
    picture2 = this.picture2;
    picture3 = this.picture3;
    this.pictures.push(this.picture1, this.picture2, this.picture3, this.picture4, this.picture5);
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
  }


  ngOnInit(): void {
  }

}
