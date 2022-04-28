import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../authentication-service';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {

  private userSub: Subscription;
  isAuthenticated = false;

  constructor(public authService: AuthService) { }

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
     this.userSub.unsubscribe()
   }
}
