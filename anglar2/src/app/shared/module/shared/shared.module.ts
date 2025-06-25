import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormsModule, FormGroup, Validators, AbstractControl, ValidatorFn, ReactiveFormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { RippleModule } from 'primeng/ripple';
import { MessageService } from 'primeng/api';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { AutoFocusModule } from 'primeng/autofocus';


@NgModule({

  declarations: [],
  imports: [FormsModule, InputGroupModule, InputGroupAddonModule, InputTextModule, ReactiveFormsModule, ButtonModule, MessagesModule, RippleModule,
    NgxSpinnerModule,AutoFocusModule,FormsModule],
  exports: [FormsModule, InputGroupModule, InputGroupAddonModule, InputTextModule, ReactiveFormsModule, ButtonModule, MessagesModule, RippleModule,
    NgxSpinnerModule,AutoFocusModule,FormsModule],
  providers: [NgxSpinnerService],
})
export class SharedModule { }
