import { Component } from '@angular/core';
import { UserNavComponent } from "../../../componenet/user-nav/user-nav.component";
import { UserFooterComponent } from "../../../componenet/user-footer/user-footer.component";
import { HomeComponent } from "../../pages/home/home.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-layout',
  imports: [UserNavComponent, UserFooterComponent,RouterOutlet],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.scss',
  standalone: true,
})
export class UserLayoutComponent {

}
