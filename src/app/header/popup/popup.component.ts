import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit{
  @Output() switchLog = new EventEmitter<boolean>();

  isLoggedIn = true;

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
    this.loginForm.reset()
  }

  //funkcja powinna emitowac propetke, ktora moze byc zebrana przez inny komponent i wyswietlac zaloguj/wyloguj w zaleznosci od wartosci booleanowej
  onLog() {
    this.isLoggedIn = !this.isLoggedIn
    this.switchLog.emit(this.isLoggedIn)
  }
}
