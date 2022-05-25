import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AuthService } from './authentication-service';
import { PopupComponent } from './popup/popup.component';
import { HttpClient } from '@angular/common/http';
import { RegForm } from './registration/form.model';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription;

  isAuthenticated = false;
  email: string;
  loading: boolean = false;
  imgPath: string;

  constructor(private modalService: NgbModal, public authService: AuthService, private http:HttpClient) { }

  open() {
    const modalRef = this.modalService.open(PopupComponent, {centered:true});
  }

  ngOnInit(): void {
   this.userSub = this.authService.user.subscribe(user =>{
     if (!user) {
       this.isAuthenticated = false;
     } else if (user) {
      this.authService.info.subscribe(userData => {
        this.imgPath = userData?.imagePath;
        console.log('Imyczpaf', this.imgPath)
       });
       this.isAuthenticated = true;
       this.email = user.email;
     }
   });



  }


  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  onLogout() {
    this.loading = true;
    this.authService.logout()
    this.loading = false;
  }

}
