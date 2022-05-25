import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from '../header/authentication-service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { RegForm } from '../header/registration/form.model';
import { UserInfo } from '../header/user-info.model';


@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})


export class MyProfileComponent implements OnInit, OnDestroy {
  updateForm: FormGroup = new FormGroup({});
  myData: boolean = true;
  myOffers: boolean = false;
  savedOffers: boolean = false;
  editableMode:boolean = false;

  regToken: string = null;
  tokenSub: Subscription;
  userId: string = null;

  firstName: string;
  lastName: string;
  city: string;
  street: string;
  zipCode: string;
  userName: string;
  imageSrc: string;

  constructor(private http: HttpClient, private authService: AuthService, private fb: FormBuilder) {

   }

  ngOnInit(): void {
    this.checkForm()
    this.updateForm = new FormGroup ({
      'userUpdateName': new FormControl(null,[Validators.required,]),
      'firstUpdateName': new FormControl(null,[Validators.required,]),
      'lastUpdateName': new FormControl(null,[Validators.required,]),
      'cityUpdate': new FormControl(null,[Validators.required,]),
      'streetUpdate': new FormControl(null,[Validators.required,]),
      'zipCodeUpdate': new FormControl(null,[Validators.required,]),
      'imagePath': new FormControl(null,[Validators.required,]),
    },
    );
     this.tokenSub = this.authService.user.subscribe(user => {
      this.regToken = user?.token;
      this.userId = user?.id;

    });


  }

  dataEnabled() {
    this.myData = !this.myData;
    this.myOffers = false;
    this.savedOffers = false;
    this.checkForm();

  }
  offersEnabled() {
    this.myData = false;
    this.myOffers = true;
    this.savedOffers = false;
  }
  savedOffersEnabled() {
    this.myData = false;
    this.myOffers = false;
    this.savedOffers = true;
  }

  updateData() {
    this.editableMode = !this.editableMode;
    this.checkForm();
    this.defaultForm();
  }

  refreshProfile() {
    this.editableMode = !this.editableMode;
  }

  checkForm() {
    this.http.get<UserInfo>('https://rent-rank-default-rtdb.europe-west1.firebasedatabase.app/registration/'+this.authService.user.value.id +'.json')
      .subscribe(userData => {

        this.firstName = userData.firstName;
        this.lastName = userData.lastName;
        this.city = userData.city;
        this.street = userData.street;
        this.zipCode = userData.zipCode;
        this.userName = userData.userName;
        this.imageSrc = userData.imagePath

        console.log(userData);
    })


  }

  defaultForm() {
    this.updateForm.setValue(
      {
        'userUpdateName': this.userName,
        'firstUpdateName': this.firstName,
        'lastUpdateName': this.lastName,
        'cityUpdate': this.city,
        'streetUpdate': this.street,
        'zipCodeUpdate': this.zipCode,
        'imagePath': ''
      }
    );
  }

  updateFormSubmit( userName:string, firstName: string, lastName: string, city: string, street: string, zipCode: string, userId:string, imagePath: string) {
    const fullForm : RegForm = {userName: userName ,firstName: firstName, lastName: lastName, city: city, street: street, zipCode: zipCode, id: userId, imagePath: imagePath };
    console.log('form', fullForm);
    this.http.patch<UserInfo>('https://rent-rank-default-rtdb.europe-west1.firebasedatabase.app/registration/'+ userId +'.json', fullForm, {
      params: new HttpParams().set('auth', this.regToken)
    }).subscribe(responseData => {

      this.firstName = responseData.firstName;
      this.lastName = responseData.lastName;
      this.city = responseData.city;
      this.street = responseData.street;
      this.zipCode = responseData.zipCode;
      this.userName = responseData.userName;
      this.authService.info.next(responseData);
      this.refreshProfile();
      console.log(responseData);
    });

}
  ngOnDestroy(): void {

  }
}
