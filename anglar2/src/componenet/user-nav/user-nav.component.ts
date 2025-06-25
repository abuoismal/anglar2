import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { Router, RouterModule } from '@angular/router';
import { UserdataService } from '../../service/userdata.service';
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


  items: MenuItem[] | undefined;
  logOut: boolean = false;
  username: string = '';
  cartCount: number = 0;

  constructor(private userdataService: UserdataService,
    private _cartService: CartService,
    private _auth: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.getusername();
    this.getUserCartCount();

    this.items = [
      { label: 'Home', icon: 'pi pi-home', path: 'home' },
      { label: 'products', icon: 'pi pi-sparkles', path: 'products' },
      { label: 'categories', icon: 'pi pi-th-large', path: 'categories' },
    ];
    this._cartService.countOfCart.subscribe((next:number) => {
      this.cartCount = next;
    });
  }


  getusername(): void {
    this.userdataService.userName.subscribe((next: string) => {
      this.username = next;
    });
  }
  getUserCartCount(): void {
    const id = localStorage.getItem('token') ?? '';
    this._cartService.getCartCount(id).subscribe((next) => (this.cartCount = next));
  }


  logout(): void {
    this._auth.logout().subscribe((next: any) => {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      this.router.navigate(['auth/login']);
    });
  }

}







