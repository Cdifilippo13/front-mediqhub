import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-layout-auth',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './layout-auth.component.html',
  styleUrl: './layout-auth.component.sass'
})
export class LayoutAuthComponent {

}
