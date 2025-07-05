import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// UserDataService manages the user's name using a BehaviorSubject and persists it in localStorage.
@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  // Holds the current username, initialized from localStorage if available.
  userName: BehaviorSubject<string> = new BehaviorSubject<string>(
    localStorage.getItem('username') || ''
  );
}
