import { Component, OnInit } from '@angular/core';
import { AuthService } from './header/authentication-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'rent-rank';
  size = 'massive';

  constructor(private authService: AuthService) {

  }

  ngOnInit(): void {
    this.authService.autoLogin();
  }
}
