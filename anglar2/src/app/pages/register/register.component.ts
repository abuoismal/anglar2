
import { AuthService } from './../../core/service/auth.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Iregister } from '../../core/apiroot/Interface/http';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { SharedModule } from '../../shared/module/shared/shared.module';
import { UserdataService } from '../../../service/userdata.service';
import { NotifecationsService } from '../../core/service/notifecations.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],

})
export class RegisterComponent {
  name!: FormControl;
  email!: FormControl;
  password!: FormControl;
  repassword!: FormControl;
  registrationform!: FormGroup;
  isRegisterd: boolean = false;


  constructor(private AuthService_: AuthService,
    private _norNotifecationsService: NotifecationsService,
    private router: Router,
    private _userdata: UserdataService
  ) {
    this.initFormControls();
    this.initFormGroup();
    this.initFormGroup();


    this.password.valueChanges.subscribe(() => {
      this.registrationform.updateValueAndValidity();
    });
    this.repassword.valueChanges.subscribe(() => {
      this.registrationform.updateValueAndValidity();
    });
  }

  initFormControls(): void {
    this.name = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]);
    this.repassword = new FormControl('', [Validators.required]);
  }

  initFormGroup(): void {
    this.registrationform = new FormGroup({
      name: this.name,
      email: this.email,
      password: this.password,
      repassword: this.repassword,
    }, { validators: this.passwordsMatchValidator });
  }

  passwordsMatchValidator: ValidatorFn = (group: AbstractControl): { [key: string]: any } | null => {
    const password = group.get('password')?.value;
    const repassword = group.get('repassword')?.value;
    return password !== repassword ? { passNotMatch: true } : null;
  };

  Submit() {
    if (this.registrationform.valid) {
      this.regstreionAPI(this.registrationform.value as Iregister);
      this.isRegisterd = true;
    } else {
      this.registrationform.markAllAsTouched();
      Object.keys(this.registrationform.controls).forEach(key => {
        this.registrationform.controls[key].markAsTouched();
      });
    }
  }
  regstreionAPI(data: Iregister): void {
    this.AuthService_.register(data).subscribe({
      next: (response) => {
        if (response._id) {
          this._norNotifecationsService.showSuccess('Registration Successful', 'You have been registered successfully.');
          const { email, password } = data;
          this.AuthService_.login({ email, password }).subscribe((next) => {
            localStorage.setItem('token', response._id);
            this.router.navigate(['user/home']);
            this._userdata.userName.next(response.name);
            localStorage.setItem('username', response.name);
          });
        }


      },
      error: (error) => {
        this._norNotifecationsService.showError('Error',error.error.error);
      }
    });
  }

}
