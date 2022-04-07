import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from './password.validator';



@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registrationForm!: FormGroup


  constructor(private fb: FormBuilder, private v:ValidatorService) {
  }

  ngOnInit(): void {
      this.registrationForm = new FormGroup ({
      'firstName': new FormControl(null,[Validators.required,]),
      'lastName': new FormControl(null,[Validators.required,]),
      'email': new FormControl(null,[Validators.required,Validators.email]),
      'city': new FormControl(null,[Validators.required,]),
      'street': new FormControl(null,[Validators.required,]),
      'zipCode': new FormControl(null,[Validators.required,]),
      password: new FormControl(null,[Validators.required,]),
      passwordConfirm: new FormControl(null,[Validators.required,]),
    }, {validators: this.v.passwordMatch('password','passwordConfirm')}
    );
  }

  get form() {
    return this.registrationForm.controls;
  }


  registrationSubmit() {
    console.log(this.registrationForm)
  }
}
