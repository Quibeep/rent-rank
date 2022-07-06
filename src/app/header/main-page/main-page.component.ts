import { Component, OnInit } from '@angular/core';
import { offerService } from 'src/app/offer-creation/offer-creation-service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {


  constructor(private offerService:offerService) { }

  ngOnInit(): void {
    this.offerService.downloadOffers();

  }

}
