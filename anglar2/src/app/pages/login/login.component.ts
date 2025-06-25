import { Component } from '@angular/core';
import { AuthService } from './../../core/service/auth.service';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { ilogin, Iregister } from '../../core/apiroot/Interface/http';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { SharedModule } from '../../shared/module/shared/shared.module';
import { UserdataService } from '../../../service/userdata.service';
import { NotifecationsService } from '../../core/service/notifecations.service';


@Component({
  selector: 'app-login',
  imports: [SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',


})
export class LoginComponent {
    email!: FormControl;
    password!: FormControl;
    loginform!: FormGroup;
  constructor(private AuthService_: AuthService,
    private _norNotifecationsService: NotifecationsService,
    private router: Router,
    private _userdata: UserdataService) {


      this.initFormControls();
      this.initFormGroup();
      this.initFormGroup();

      this.password.valueChanges.subscribe(() => {
        this.loginform.updateValueAndValidity();
      });
    }

    initFormControls(): void {
      this.email = new FormControl('', [Validators.required, Validators.email]);
      this.password = new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]);
    }

    initFormGroup(): void {
      this.loginform = new FormGroup({
        email: this.email,
        password: this.password,
      }, )
    }



    Submit() {
      if (this.loginform.valid) {
        this.siginIn(this.loginform.value as Iregister);
      } else {
        this.loginform.markAllAsTouched();
        Object.keys(this.loginform.controls).forEach(key => {
          this.loginform.controls[key].markAsTouched();
        });
      }
    }
    siginIn(data: ilogin): void {

      this.AuthService_.login(data).subscribe({
        next: (response) => {
          if (response._id) {
            this._norNotifecationsService.showSuccess('loging Successful', `Welcome ${response.name}`);
            localStorage.setItem('token', response._id);
            this._userdata.userName.next(response.name);
            localStorage.setItem('username', response.name);
          }

          this.router.navigate(['user/home']);
        },
        error: (error) => {
          this._norNotifecationsService.showError('Error',error.error.error);

        }
      });
    }

  }
