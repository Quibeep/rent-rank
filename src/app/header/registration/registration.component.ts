import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { RegForm } from './form.model';
import * as shajs from 'sha.js';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../authentication-service';



@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup = new FormGroup({});
  loading = false;
  error: string = null;
  formState: boolean


  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private route: ActivatedRoute, private authService: AuthService ) {
  }

  ngOnInit(): void {
      this.registrationForm = new FormGroup ({
      'userName': new FormControl(null,[Validators.required,]),
      'firstName': new FormControl(null,[Validators.required,]),
      'lastName': new FormControl(null,[Validators.required,]),
      'email': new FormControl(null,[Validators.required,Validators.email]),
      'city': new FormControl(null,[Validators.required,]),
      'street': new FormControl(null,[Validators.required,]),
      'zipCode': new FormControl(null,[Validators.required,]),
    },
    );
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


  registrationSubmit( userName:string, firstName: string, lastName: string, city: string, street: string, zipCode: string,) {
    const fullForm : RegForm = {userName: userName ,firstName: firstName, lastName: lastName, city: city, street: street, zipCode: zipCode }
    this.http.post('https://rent-rank-default-rtdb.europe-west1.firebasedatabase.app/registration.json', fullForm).subscribe(responseData =>{
      console.log(responseData);
    });
  }

  formSubmit() {
    this.registrationSubmit;

  }

  //nadal nie dziala
  redirectAfterSec() {
    setTimeout(this.redirectAfterSign.bind(this),3000);
  }

  redirectAfterSign() {
    if (this.registrationForm.valid) {
    this.router.navigate(['docs'], {relativeTo: this.route});
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
