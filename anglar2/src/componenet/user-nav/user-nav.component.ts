import { UserDataService } from './../../app/core/service/user-data.servics';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../app/core/service/auth.service';
import { CartService } from '../../app/core/service/cart.service';

@Component({
  selector: 'app-user-nav',
  imports: [
    MenubarModule,
    BadgeModule,
    AvatarModule,
    InputTextModule,
    RippleModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './user-nav.component.html',
  styleUrl: './user-nav.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class UserNavComponent implements OnInit {

  // Menu items for the user navigation
  items: MenuItem[] | undefined;

  // Boolean flag to track logout state
  logOut: boolean = false;

  // Stores the current username
  username: string = '';

  // Holds the number of items in the user's cart
  cartCount: number = 0;

  // Injecting required services through the constructor
  constructor(
    private userdataService: UserDataService,
    private _cartService: CartService,
    private _auth: AuthService,
    private router: Router
  ) { }

  // Angular lifecycle hook - runs on component initialization
  ngOnInit() {
    this.getusername();           // Get and set the username
    this.getUserCartCount();      // Get the user's cart item count

    // Define navigation menu items
    this.items = [

        { label: 'Home', icon: 'pi pi-home', url: '/user/home' },
        { label: 'Products', icon: 'pi pi-sparkles', url: '/user/products' },
        { label: 'Categories', icon: 'pi pi-th-large', url: '/user/categoty' },

    ];

    // Subscribe to cart count changes and update UI accordingly
    this._cartService.getCartCount.subscribe((next: number) => {
      this.cartCount = next;
    });
  }

  // Subscribe to username from UserDataService
  getusername(): void {
    this.userdataService.userName.subscribe((next: string) => {
      this.username = next;
    });
  }

  // Subscribe to the cart count from CartService
  getUserCartCount(): void {
    const id = localStorage.getItem('token') ?? '';
    this._cartService.getCartCount.subscribe((next) => (this.cartCount = next));
  }

  // Perform logout: call auth service, clear localStorage, navigate to login
  logout(): void {
    this._auth.logout().subscribe((next: any) => {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      this.router.navigate(['auth/login']);
    });
  }

}
