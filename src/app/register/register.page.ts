import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { PostProvider } from '../provider/post-provider';
  
import { Router } from '@angular/router'; // ← Tambahkan Router

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(
    private http: HttpClient,
    private alertController: AlertController,
    private toastController: ToastController,
    private postPvd: PostProvider,
    private router: Router // ← Tambahkan Router di constructor
  ) {}

  async register() {
    const body = {
      name: this.name,
      email: this.email,
      password: this.password
    };

   if (this.name == '' || this.email == '' || this.password == '') { 
      const toast = await this.toastController.create({ 
      message: 'Nama lengkap harus di isi', 
      duration: 2000 
      }); 
      toast.present(); 
      }
    
      let doby = {
        name: this.name,
        email: this.email,
        password: this.password,
         
      };  
    this.postPvd.postData(body, 'register.php').subscribe(async data => { 
       var alertpesan = data.msg; 
       if (data.success) { 
              const alert = await this.alertController.create({
              header: 'Sukses',
              message: 'Pendaftaran berhasil!',
              buttons: ['OK']
            });
            await alert.present();
            this.router.navigate(['/login']); // ← Arahkan ke login setelah sukses
          } else {
            const alert = await this.alertController.create({
              header: 'Gagal',
              message: alertpesan || 'Pendaftaran gagal.',
              buttons: ['OK']
            });
            await alert.present();
          }
        },
        async (error) => {
          console.log('error', error);
          const alert = await this.alertController.create({
            header: 'Error',
            message: 'Terjadi kesalahan saat koneksi ke server!',
            buttons: ['OK']
          });
          await alert.present();
          console.error(error);
        }
      );
  }

  goToLogin() {
    this.router.navigate(['/login']); // ← Tambahkan method ini
  }
}
