import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './authentication-service';
import { PopupComponent } from './popup/popup.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  constructor(private modalService: NgbModal, public authService: AuthService) { }

  open() {
    const modalRef = this.modalService.open(PopupComponent, {centered:true});

  }

  ngOnInit(): void {
  }

  onLogout() {
    this.authService.switchloginState(false);
  }

}
