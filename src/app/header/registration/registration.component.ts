import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { RegForm } from './form.model';
import * as shajs from 'sha.js';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../authentication-service';
import { Subscription } from 'rxjs';




@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {
  registrationForm: FormGroup = new FormGroup({});
  loading = false;
  error: string = null;
  formState: boolean;
  regToken: string = null;
  tokenSub: Subscription;
  userId: string = null;


  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private route: ActivatedRoute, private authService: AuthService ) {
  }

  ngOnInit(): void {
      this.registrationForm = new FormGroup ({
      'userName': new FormControl(null,[Validators.required,]),
      'firstName': new FormControl(null,[Validators.required,]),
      'lastName': new FormControl(null,[Validators.required,]),
      'city': new FormControl(null,[Validators.required,]),
      'street': new FormControl(null,[Validators.required,]),
      'zipCode': new FormControl(null,[Validators.required,]),
    },
    );
     this.tokenSub = this.authService.user.subscribe(user => {
      this.regToken = user?.token;
      this.userId = user?.id;

    });



    // this.registrationForm.valueChanges.subscribe(
    //   (value) => console.log(value)
    // )

    // this.registrationForm.get('password')?.valueChanges.subscribe(()=>{
    //   this.registrationForm.get('passwordConfirm')?.updateValueAndValidity();
    // });
  }

  // passwordValid ():boolean | undefined {
  //   return this.registrationForm.get('passwordConfirm')?.valid;
  // }
  ngOnDestroy(): void {
    this.tokenSub.unsubscribe();
  }


  registrationSubmit( userName:string, firstName: string, lastName: string, city: string, street: string, zipCode: string, userId:string, imagePath: string ) {
      const fullForm : RegForm = {userName: userName ,firstName: firstName, lastName: lastName, city: city, street: street, zipCode: zipCode, id: userId, imagePath: imagePath }
      this.http.put('https://rent-rank-default-rtdb.europe-west1.firebasedatabase.app/registration/'+ userId +'.json', fullForm, {
        params: new HttpParams().set('auth', this.regToken)
      }).subscribe(responseData => {
        console.log(responseData);
      });

  }

  // authRegistration() {
  //   this.authService.user.pipe(
  //     take(1),
  //   )
  // }

  formSubmit() {
    this.registrationSubmit;

  }


  redirectAfterSign() {
    if (this.registrationForm.valid) {
    this.router.navigate(['']);
    }
  }
  // , {relativeTo: this.route})

  redirectAfterSec() {
    if (this.registrationForm.valid) {
      this.formState = true;
      setTimeout(this.redirectAfterSign.bind(this),3000);
    }
  }

  hashPass(pass: string) {
   return shajs('sha256').update({pass}).digest('hex')
  }

  // onRegistrationSubmit(formData: {firstName: string; lastName: string}) {
  //   this.http.post('https://rent-rank-default-rtdb.europe-west1.firebasedatabase.app/registration.json', formData).subscribe(responseData => {
  //     console.log(responseData)
  //   });
  // }

  // onlyChar(): ValidatorFn {
  //   return (control: AbstractControl): { [key: string]: boolean } | null => {
  //     // console.log(control.value);
  //     // console.log(this.registrationForm.get('password')?.value);
  //     if (control.value !== this.registrationForm.get('password')?.value) {
  //       return {passwordError: true};
  //     }
  //     return null;
  //   };
  // }

}
