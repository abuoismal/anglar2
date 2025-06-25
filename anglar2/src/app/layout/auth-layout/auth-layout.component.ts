import { Component } from '@angular/core';
import { AuthNavComponent } from "../../../componenet/auth-nav/auth-nav.component";
import { AuthFooterComponent } from "../../../componenet/auth-footer/auth-footer.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  imports: [AuthNavComponent, AuthFooterComponent,RouterOutlet
  ],
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent {

}
