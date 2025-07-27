import { Component } from '@angular/core';
import { addIcons } from 'ionicons';
import { home, library,  document, search, barChartOutline } from 'ionicons/icons';
import { Router } from '@angular/router';



@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: false,
})
export class TabsPage {

  constructor(private router: Router) {addIcons({ home, library,  document, search, barChartOutline });
}

// logout() {
//   localStorage.removeItem('user');
//   this.router.navigateByUrl('/login');
// }
}

