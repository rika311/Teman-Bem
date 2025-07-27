import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(private router: Router) {
    const user = localStorage.getItem('user');
    if (!user) {
      // Jika belum login, arahkan ke halaman login
      this.router.navigateByUrl('/login');
    }
  }

 
}
