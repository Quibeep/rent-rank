import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupComponent } from './popup/popup.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  open() {
    const modalRef = this.modalService.open(PopupComponent, {centered:true});
    modalRef.componentInstance.name = 'World';
  }

  ngOnInit(): void {
  }

}
