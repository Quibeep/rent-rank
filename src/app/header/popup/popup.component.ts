import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit{
loginForm: FormGroup = new FormGroup ({});

  constructor(public activeModal: NgbActiveModal) {

  }

  ngOnInit(): void {
    this.loginForm = new FormGroup ({
      'userEmail': new FormControl(null,[Validators.required, Validators.email]),
      'userPassword': new FormControl(null, [Validators.required])
    });
  }

  onSubmit() {
    console.log(this.loginForm);
  }
}
