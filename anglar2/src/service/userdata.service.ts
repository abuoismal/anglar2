import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { baseUrl, } from '../app/core/apiroot/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class UserdataService {
  userName: BehaviorSubject<string> = new BehaviorSubject<string>(
    localStorage.getItem('username') || ''
  );

}
