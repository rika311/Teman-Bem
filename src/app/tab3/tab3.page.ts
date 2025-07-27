import { Component, OnInit } from '@angular/core'; 
import { PostProvider } from '../provider/post-provider'

import { ToastController } from '@ionic/angular'; 

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page implements OnInit { 
 
  Regis: any = []; 
  limit: number = 10; 
  start: number = 0; 
 
  constructor( 
 
    private postPvdr: PostProvider, 
    public toastController: ToastController, 
  ) { } 
 
  ngOnInit() { 
  } 
 
  ionViewWillEnter() { 
    this.Regis = []; 
    this.start = 0; 
    this.loadRegistrasi(); 
  } 
 
  doRefresh(event: any) { 
    setTimeout(() => { 
      this.ionViewWillEnter(); 
      event.target.complete(); 
    }, 500); 
  } 
 
  loadData(event: any) { 
    this.start += this.limit; 
    setTimeout(() => { 
    this.loadRegistrasi().then(() => { 
    event.target.complete(); 
    }); 
    }, 500); 
  } 

  loadRegistrasi() { 
   return new Promise(resolve => { 
     let body = { 
       aksi: 'getdata', 
       limit : this.limit, 
       start : this.start, 
      }; 
      this.postPvdr.postData(body, 'action.php').subscribe({
        next: async (data) => {
        if (data && data.result && data.result.length > 0) {
          for (let Registrasi of data.result) { 
            this.Regis.push(Registrasi); 
          }
        } else {
          const toast = await this.toastController.create({ 
           message: 'Tidak ada data yang ditemukan.', 
           duration: 200,
           position: 'top',
            color: 'danger'
         });
         toast.present();
        }
        resolve(true);
      },
      error: (err) => {
        this.presentToast('Gagal memuat data.');
        resolve(true);
      }
    });
  });
}

  // Tambahkan fungsi toast
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'top',
      color: 'danger',
    });
  toast.present();
  } 
}