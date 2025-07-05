import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-auth-nav',
  standalone: true,
  imports: [MenubarModule,RouterModule],
  templateUrl: './auth-nav.component.html',
  styleUrls: ['./auth-nav.component.scss']
})
export class AuthNavComponent implements OnInit {

  // Array to hold menu items for authentication navigation
  items: MenuItem[] | undefined;

  // Angular lifecycle hook - runs on component initialization
  ngOnInit() {
    // Define menu items for login and register pages
    this.items = [
      {
        label: 'login',
        icon: 'pi pi-sign-in',
        path: 'login'
      },
      {
        label: 'register',
        icon: 'pi pi-user-plus',
        path: 'register'
      },
    ];
  }
};

