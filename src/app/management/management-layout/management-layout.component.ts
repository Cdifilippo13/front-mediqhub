import { Component, NgZone } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-management-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './management-layout.component.html',
  styleUrl: './management-layout.component.sass'
})
export class ManagementLayoutComponent {

  constructor(private ngZone: NgZone, private router: Router) { }

  goTo(route: string) {

    console.log('hola');
    
    this.ngZone.run(() => {
      this.router.navigateByUrl(route)
    });
  }


}
