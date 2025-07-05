import { UserDataService } from './../../core/service/user-data.servics';
import { Component } from '@angular/core';
import { AuthService } from './../../core/service/auth.service';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { ilogin, Iregister } from '../../core/apiroot/Interface/http';
import { Router } from '@angular/router';
import { SharedModule } from '../../shared/module/shared/shared.module';
import { NotifecationsService } from '../../core/service/notifecations.service';


@Component({
  selector: 'app-login',
  imports: [SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',


})
export class LoginComponent {
  // Form controls for email and password inputs
  email!: FormControl;
  password!: FormControl;

  // Form group to group controls and manage validations
  loginform!: FormGroup;

  // Inject services: AuthService for login API calls,
  // NotifecationsService for showing messages,
  // Router for navigation, UserDataService for user info updates
  constructor(
    private AuthService_: AuthService,
    private _norNotifecationsService: NotifecationsService,
    private router: Router,
    private _userdata: UserDataService
  ) {
    // Initialize form controls and group
    this.initFormControls();
    this.initFormGroup();
    this.initFormGroup(); // Called twice — kept as per your request

    // Update form validity when password changes
    this.password.valueChanges.subscribe(() => {
      this.loginform.updateValueAndValidity();
    });
  }

  // Initialize email and password form controls with validators
  initFormControls(): void {
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]);
  }

  // Initialize form group containing email and password controls
  initFormGroup(): void {
    this.loginform = new FormGroup({
      email: this.email,
      password: this.password,
    });
  }

  // Handle form submission
  Submit() {
    if (this.loginform.valid) {
      // If valid, call login API with form data
      this.siginIn(this.loginform.value as ilogin);
    } else {
      // If invalid, mark all fields as touched to show errors
      this.loginform.markAllAsTouched();
      Object.keys(this.loginform.controls).forEach((key) => {
        this.loginform.controls[key].markAsTouched();
      });
    }
  }

  // Call login API and handle response
  siginIn(data: ilogin): void {
    this.AuthService_.login(data).subscribe({
      next: (response) => {
        if (response._id) {
          // Show success notification
          this._norNotifecationsService.showSuccess(
            'loging Successful',
            `Welcome ${response.name}`
          );
          // Store token and username locally
          localStorage.setItem('token', response._id);
          localStorage.setItem('username', response.name);

          // Update username observable
          this._userdata.userName.next(response.name);
        }

        // Navigate to user home page after successful login
        this.router.navigate(['user/home']);
      },
      error: (error) => {
        // Show error notification if login fails
        this._norNotifecationsService.showError('Error', error.error.error);
      },
    });
  }
}
