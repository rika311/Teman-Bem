import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostProvider } from  '../provider/post-provider';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private postPvdr: PostProvider,
    private toastController: ToastController
  ) {}
  ngOnInit() {
    const user = localStorage.getItem('user');
    if (user) {
      // Jika sudah login, langsung arahkan ke halaman utama
      this.router.navigateByUrl('/tabs');
    }
  }
  login() {
    if (this.email === '' || this.password === '') {
      alert('Email dan password wajib diisi!');
      return;
    }

    const body = {
      email: this.email,
      password: this.password,
    };

    this.postPvdr.postData(body, 'login.php').subscribe(
      (data: any) => {
        if (data.success) {
          // Simpan user ke localStorage
          localStorage.setItem('user', JSON.stringify(data.user));
          localStorage.setItem('profil', JSON.stringify(data.result));
          this.toastController.create({
            message: 'Login berhasil!',
            duration: 2000,
            position: 'top',
            color: 'success'
          }).then((toast) => {
            toast.present();
          });
          
          this.router.navigateByUrl('/tabs'); // arahkan ke halaman profil
        } else {
          alert('Login gagal! Cek email dan password kamu.');
        }
      },
      error => {
        console.error(error);
        alert('Terjadi kesalahan koneksi ke server!\n' + error.message);
      }
    );
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
