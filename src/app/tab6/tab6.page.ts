import { Component, OnInit } from '@angular/core';
import { PostProvider } from '../provider/post-provider';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab6',
  templateUrl: './tab6.page.html',
  styleUrls: ['./tab6.page.scss'],
  standalone: false
})
export class Tab6Page implements OnInit {
  profil: any = null;

  constructor(private postPvdr: PostProvider, private router: Router
  ) {}

  ngOnInit() {
    const userData = localStorage.getItem('profil');
    if (userData) {
      this.profil = JSON.parse(userData);
      
    } else {
      
    }
  }

  logout() {
  localStorage.removeItem('user');
  this.router.navigateByUrl('/login');
}
}
