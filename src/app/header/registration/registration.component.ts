import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { RegForm } from './form.model';





@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup = new FormGroup({});


  constructor(private fb: FormBuilder, private http: HttpClient) {
  }

  ngOnInit(): void {
      this.registrationForm = new FormGroup ({
      'firstName': new FormControl(null,[Validators.required,]),
      'lastName': new FormControl(null,[Validators.required,]),
      'email': new FormControl(null,[Validators.required,Validators.email]),
      'city': new FormControl(null,[Validators.required,]),
      'street': new FormControl(null,[Validators.required,]),
      'zipCode': new FormControl(null,[Validators.required,]),
      'password': new FormControl(null,[Validators.required,]),
      'passwordConfirm': new FormControl(null,[Validators.required, this.onlyChar().bind(this)]),
    },
    );
    // this.registrationForm.valueChanges.subscribe(
    //   (value) => console.log(value)
    // )

    this.registrationForm.get('password')?.valueChanges.subscribe(()=>{
      this.registrationForm.get('passwordConfirm')?.updateValueAndValidity();
    });
  }

  passwordValid ():boolean | undefined {
    return this.registrationForm.get('passwordConfirm')?.valid;
  }


  registrationSubmit(  firstName: string, lastName: string, email: string, password: string, passwordConfirm: string, city: string, street: string, zipCode: string,) {
    const fullForm : RegForm = {firstName: firstName, lastName: lastName, email: email, password: password, passwordConfirm: passwordConfirm, city: city, street: street, zipCode: zipCode }
    this.http.put('https://rent-rank-default-rtdb.europe-west1.firebasedatabase.app/registration.json', fullForm).subscribe(responseData =>{
      console.log(responseData);
    });
    console.log(this.registrationForm);
  }

  // onRegistrationSubmit(formData: {firstName: string; lastName: string}) {
  //   this.http.post('https://rent-rank-default-rtdb.europe-west1.firebasedatabase.app/registration.json', formData).subscribe(responseData => {
  //     console.log(responseData)
  //   });
  // }

  onlyChar(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      console.log(control.value);
      console.log(this.registrationForm.get('password')?.value);
      if (control.value !== this.registrationForm.get('password')?.value) {
        return {passwordError: true};
      }
      return null;
    };
  }

}
