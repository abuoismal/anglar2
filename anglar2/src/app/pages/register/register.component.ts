import { UserDataService } from './../../core/service/user-data.servics';
import { AuthService } from './../../core/service/auth.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Iregister } from '../../core/apiroot/Interface/http';
import { Router } from '@angular/router';
import { SharedModule } from '../../shared/module/shared/shared.module';
import { NotifecationsService } from '../../core/service/notifecations.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],

})
export class RegisterComponent {
  // Form controls for each input field
  name!: FormControl;
  email!: FormControl;
  password!: FormControl;
  repassword!: FormControl;

  // Form group to group controls and manage validations
  registrationform!: FormGroup;

  // Flag to indicate if the user has successfully registered
  isRegisterd: boolean = false;

  // Inject services: AuthService for API calls, NotifecationsService for user alerts,
  // Router for navigation, UserDataService to update user info
  constructor(
    private AuthService_: AuthService,
    private _norNotifecationsService: NotifecationsService,
    private router: Router,
    private _userdata: UserDataService
  ) {
    // Initialize form controls and group
    this.initFormControls();
    this.initFormGroup();
    this.initFormGroup();  // Called twice — likely unintentional but kept as requested

    // Update form validity when password or repassword fields change
    this.password.valueChanges.subscribe(() => {
      this.registrationform.updateValueAndValidity();
    });
    this.repassword.valueChanges.subscribe(() => {
      this.registrationform.updateValueAndValidity();
    });
  }

  // Initialize form controls with validators
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

  // Initialize form group and attach a custom validator for matching passwords
  initFormGroup(): void {
    this.registrationform = new FormGroup(
      {
        name: this.name,
        email: this.email,
        password: this.password,
        repassword: this.repassword,
      },
      { validators: this.passwordsMatchValidator }
    );
  }

  // Custom validator to check if password and repassword fields match
  passwordsMatchValidator: ValidatorFn = (
    group: AbstractControl
  ): { [key: string]: any } | null => {
    const password = group.get('password')?.value;
    const repassword = group.get('repassword')?.value;
    return password !== repassword ? { passNotMatch: true } : null;
  };

  // Handle form submission
  Submit() {
    if (this.registrationform.valid) {
      // If form is valid, call registration API with form data
      this.regstreionAPI(this.registrationform.value as Iregister);
      this.isRegisterd = true;
    } else {
      // If invalid, mark all fields as touched to show validation errors
      this.registrationform.markAllAsTouched();
      Object.keys(this.registrationform.controls).forEach((key) => {
        this.registrationform.controls[key].markAsTouched();
      });
    }
  }

  // Call registration API and handle response
  regstreionAPI(data: Iregister): void {
    this.AuthService_.register(data).subscribe({
      next: (response) => {
        if (response._id) {
          // Show success notification
          this._norNotifecationsService.showSuccess(
            'Registration Successful',
            'You have been registered successfully.'
          );

          const { email, password } = data;
          // Automatically log the user in after successful registration
          this.AuthService_.login({ email, password }).subscribe((next) => {
            // Store token and username in local storage
            localStorage.setItem('token', response._id);
            localStorage.setItem('username', response.name);

            // Update user data service and navigate to user home
            this._userdata.userName.next(response.name);
            this.router.navigate(['user/home']);
          });
        }
      },
      error: (error) => {
        // Show error notification if registration fails
        this._norNotifecationsService.showError('Error', error.error.error);
      },
    });
  }
}
