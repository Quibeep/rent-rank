import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';




@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup = new FormGroup({});


  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
      this.registrationForm = new FormGroup ({
      'firstName': new FormControl(null,[Validators.required,]),
      'lastName': new FormControl(null,[Validators.required,]),
      'email': new FormControl(null,[Validators.required,Validators.email]),
      'city': new FormControl(null,[Validators.required,]),
      'street': new FormControl(null,[Validators.required,]),
      'zipCode': new FormControl(null,[Validators.required, Validators.max(5)]),
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


  registrationSubmit() {
    console.log(this.registrationForm)
  }

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
