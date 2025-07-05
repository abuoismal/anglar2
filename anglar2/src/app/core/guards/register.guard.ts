import { CanDeactivateFn } from '@angular/router';
import { RegisterComponent } from '../../pages/register/register.component';

/**
 * Guard to prevent navigation away from the RegisterComponent
 * if the registration form is valid but not yet submitted.
 */
export const registerGuard: CanDeactivateFn<RegisterComponent> = (
  component,
  currentRoute,
  currentState,
  nextState
) => {
  // If the user has not registered and the form is valid, confirm navigation
  if (!component.isRegisterd && component.registrationform.valid) {
    const confirmLeave = window.confirm('Your data will be lost. Do you want to continue?');
    return confirmLeave;
  }
  // Allow navigation in all other cases
  return true;
};
