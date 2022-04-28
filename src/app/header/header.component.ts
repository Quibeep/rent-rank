import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AuthService } from './authentication-service';
import { PopupComponent } from './popup/popup.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  isAuthenticated = false;

  constructor(private modalService: NgbModal, public authService: AuthService) { }

  open() {
    const modalRef = this.modalService.open(PopupComponent, {centered:true});
  }

  ngOnInit(): void {
   this.userSub = this.authService.user.subscribe(user =>{
     if (!user) {
       this.isAuthenticated = false;
       console.log(!user)
     } else if (user) {
       this.isAuthenticated = true;
       console.log(user)
     }
   });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  onLogout() {
    this.authService.switchloginState(false);
  }

}
