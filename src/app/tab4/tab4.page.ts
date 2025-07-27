import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { PostProvider } from '../provider/post-provider';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
  standalone: false,
})
export class Tab4Page implements OnInit {
   constructor(private toastCtrl: ToastController, 
    private postPvd: PostProvider) {}

  nama: string = '';
  isiAspirasi: string = '';
  anonim: boolean = false;
  daftarAspirasi: any[] = [];
 
  limit: number = 10; 
  start: number = 0; 
  ngOnInit() { 
  } 
 
  ionViewWillEnter() { 
    this.daftarAspirasi = []; 
    this.start = 0; 
    this.loadaspirasi(); 
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
    this.loadaspirasi().then(() => { 
    event.target.complete(); 
    }); 
    }, 500); 
  }


 

  async kirimAspirasi() {
    if (!this.isiAspirasi.trim()) {
      const toast = await this.toastCtrl.create({
        message: 'Aspirasi tidak boleh kosong!',
        duration: 2000,
        color: 'danger',
      });
      toast.present();
      return;
    }
    else {
    // Simpan aspirasi ke database

      let body = {
        nama: this.anonim ? 'Anonim' : this.nama || 'Tanpa Nama',
        isi: this.isiAspirasi,
        waktu: new Date().toISOString().slice(0, 10),
        aksi: 'add_register' 
      };
      this.postPvd.postData(body, 'aspirasi.php').subscribe({
        next: async data => {
          console.log('Isi data dari server:', data);
          var alertpesan = data.msg;
          if (data.success) {
            const toast = await this.toastCtrl.create({
              message: 'Aspirasi berhasil dikirim!',
              duration: 2000,
              color: 'success',
              position: 'top',
            });
            toast.present();
            this.resetForm();
          } else {
            const toast = await this.toastCtrl.create({
              message: alertpesan,
              duration: 2000,
              position: 'top',
              color: 'danger'
            });
            toast.present();
          }
        },
        error: async err => {
          const toast = await this.toastCtrl.create({
            message: 'Gagal mengirim aspirasi!',
            duration: 2000,
            color: 'danger',
            position: 'top'
          });
          toast.present();
          console.error('Aspirasi error:', err);
        }
      });
    }
  }
  resetForm() {
    this.nama = '';
    this.isiAspirasi = '';
    this.anonim = false;
  }
  loadaspirasi() {
    return new Promise(resolve => {
      let body = {
        aksi: 'getdata',
        limit: this.limit,
        start: this.start,
      };
      this.postPvd.postData(body, 'aspirasi.php').subscribe({
        next: async (data) => {
        if (data && data.result && data.result.length > 0) {
          for (let Aspirasi of data.result) {
            this.daftarAspirasi.push(Aspirasi);
          }
        } else {
          const toast = await this.toastCtrl.create({
            message: 'Tidak ada data yang ditemukan.',
            duration: 200,
            position: 'top',
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

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'top',
    
    });
    toast.present();
  }
}
