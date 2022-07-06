import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, Subscription } from "rxjs";
import { AuthService } from "../header/authentication-service";
import { Offer } from "./offer.model";
import { map } from "rxjs/operators";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class offerService {
  arrayData = new Subject<Offer[]>();
  availableOffers = [];

  regToken: string = null;
  tokenSub: Subscription;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.tokenSub = this.authService.user.subscribe((user) => {
      this.regToken = user?.token;
    });
  }

  postOffer(
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
    picture8?: string
  ) {
    const offerData: Offer = {
      localization: localization,
      price: price,
      rooms: rooms,
      description: description,
      picture1: picture1,
      picture2: picture2,
      picture3: picture3,
      picture4: picture4,
      picture5: picture5,
      picture6: picture6,
      picture7: picture7,
      picture8: picture8,
    };
    this.http
      .post(
        'https://rent-rank-default-rtdb.europe-west1.firebasedatabase.app/offers.json',
        offerData,
        {
          params: new HttpParams().set('auth', this.regToken),
        }
      )
      .subscribe((responseData) => {
        console.log(responseData);
      });
  }

  downloadOffers() {
    this.http
      .get(
        'https://rent-rank-default-rtdb.europe-west1.firebasedatabase.app/offers.json'
      )
      .pipe(
        map((offerData: {[key: string]: Offer}) => {
          const offersArray:Offer[] = [];
          for (const key in offerData) {
            if (offerData.hasOwnProperty(key)) {
              offersArray.push({ ...offerData[key], offerId: key });
            }
          }
          return offersArray;
        }))
      .subscribe((offers) => {
       this.availableOffers = offers;
       this.arrayData.next(offers);

        console.log(this.availableOffers);
      });
  }





  // postOffera(localization: string, price: string, rooms: string, description: string, picture1? : string, picture2? : string, picture3? : string, picture4? : string, picture5? : string, picture6? : string, picture7? : string, picture8? : string ) {

  // }
}
