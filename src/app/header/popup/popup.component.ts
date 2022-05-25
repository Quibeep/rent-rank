import { Component, OnInit,} from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../authentication-service';


@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit{

  registerMode: boolean = false;
  loginForm: FormGroup = new FormGroup ({});
  loggedIn = false;
  error: string = null;
  loading = false;
  formState: boolean
  lockLogin = false;

  constructor(public activeModal: NgbActiveModal, private authService: AuthService, private router: Router) {

  }

  ngOnInit(): void {
    this.loginForm = new FormGroup ({
      'loginData': new FormGroup({
        'userEmail': new FormControl(null,[Validators.required, Validators.email]),
        'userPassword': new FormControl(null, [Validators.required]),
      }),
      'passwordConfirm': new FormControl(null, [Validators.required, this.passValid().bind(this)])
    });

    this.loginForm.get('loginData.userPassword')?.valueChanges.subscribe(()=>{
      this.loginForm.get('loginData.passwordConfirm')?.updateValueAndValidity();
    });
  }

  onSubmit() {
    console.log(this.loginForm);
    this.loginForm.reset();
  }

  onLogin() {
    const emailVal = this.loginForm.get('loginData.userEmail').value;
    const passwordVal = this.loginForm.get('loginData.userPassword').value;
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
      this.formState =false;
    }
    );
}

onRegister() {
  const emailVal = this.loginForm.get('loginData.userEmail').value;
  const passwordVal = this.loginForm.get('loginData.userPassword').value;
  this.loading = true;
  this.authService.switchloginState(true);
  this.authService.signup(emailVal, passwordVal).subscribe(resData => {
    this.loading = false;
    this.loggedIn = true;
    this.formState =true;
    this.checkStatus();
    this.router.navigate(['registration'])

    console.log(resData);
  }, errorMessage => {
    this.error = errorMessage;
    console.log(errorMessage);
    this.loading = false;
    this.formState =false;
  }
  );
}

passValid(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    // console.log(control.value);
    // console.log(this.registrationForm.get('userPassword')?.value);
    if (control.value !== this.loginForm.get('loginData.userPassword')?.value) {
      return {passwordError: true};
    }
    return null;
  };
}
passwordValid ():boolean | undefined {
  return this.loginForm.get('passwordConfirm')?.valid;
}

  checkStatus() {
    if (this.loggedIn === true) {
      console.log(this.loggedIn);
     this.activeModal.close();
    }
    return
  }
  switchToRegister() {
    this.registerMode = true;
    this.loginForm.reset();
    this.lockLogin = true;
  }
  switchToLogin() {
    this.registerMode = false;
    this.loginForm.reset();
    this.lockLogin = false;
  }
}
