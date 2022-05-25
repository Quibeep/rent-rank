import { Component, OnInit,} from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../authentication-service';


@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit{

  loginForm: FormGroup = new FormGroup ({});
  loggedIn = false;
  error: string = null;
  loading = false;

  constructor(public activeModal: NgbActiveModal, private authService: AuthService) {

  }

  ngOnInit(): void {
    this.loginForm = new FormGroup ({
      'userEmail': new FormControl(null,[Validators.required, Validators.email]),
      'userPassword': new FormControl(null, [Validators.required])
    });
  }

  onSubmit() {
    console.log(this.loginForm);
    this.loginForm.reset();
  }

  onLogin() {
    const emailVal = this.loginForm.get('userEmail').value;
    const passwordVal = this.loginForm.get('userPassword').value;
    this.loading = true;
    this.authService.switchloginState(true);
    this.authService.login(emailVal, passwordVal).subscribe(resData => {
      this.loading = false;
      this.loggedIn = true;
      this.checkStatus();
      console.log(resData);
    }, errorMessage => {
      this.error = errorMessage;
      console.log(errorMessage);
      this.loading = false;
    }
    );
}

  checkStatus() {
    if (this.loggedIn === true) {
      console.log(this.loggedIn);
     this.activeModal.close();
    }
    return
  }

}
