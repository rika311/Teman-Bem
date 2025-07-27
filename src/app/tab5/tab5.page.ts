import { Component, OnInit } from '@angular/core';
import { PostProvider } from '../provider/post-provider';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab5',
  templateUrl: 'tab5.page.html',
  styleUrls: ['tab5.page.scss'],
  standalone: false,
})

export class Tab5Page implements OnInit {
  
  announcements = [
    {
      title: 'Open Recruitment BEM 2025',
      date: '15 Juli 2025',
      content: 'Pendaftaran Divisi BEM Kabinet Swara Dharma dimulai 17 Juli 2025 melalui menu Formulir.'
    },
    {
      title: 'BEM Fair 2025',
      date: '20 Juli 2025',
      content: 'Datang dan ramaikan BEM Fair di Aula Kampus Utama. Akan hadir 10 UKM yang akan meramaikan acara BEM Fair di ITB Indonesia!'
    },
    {
      title: 'Forum Aspirasi Mahasiswa',
      date: '22 Juli 2025',
      content: 'Aspirasi terbuka bersama BEM seputar kebijakan kampus dan kehidupan mahasiswa.'
    },
    {
      title: 'Pengumuman Beasiswa',
      date: '25 Juli 2025',
      content: 'Pendaftaran beasiswa untuk mahasiswa aktif dibuka mulai 1 Agustus 2025.'
    },
    {
      title: 'Kegiatan Sosial BEM',
      date: '30 Juli 2025',
      content: 'BEM akan mengadakan kegiatan sosial berupa penggalangan dana untuk korban bencana alam di wilayah X.'
      },
    {
      title: 'Pelatihan Kepemimpinan Mahasiswa',
      date: '5 Agustus 2025',
      content: 'BEM akan mengadakan pelatihan kepemimpinan untuk mahasiswa baru. Pendaftaran dibuka mulai 1 Agustus 2025.'
    },
    {
      title: 'Diskusi Terbuka',
      date: '10 Agustus 2025',
      content: 'Diskusi terbuka mengenai isu-isu terkini di kampus akan diadakan pada tanggal 12 Agustus 2025.'
    },
    {
      title: 'Workshop Kepemimpinan Mahasiswa',
      date: '15 Agustus 2025',
      content: 'Workshop kepemimpinan untuk mahasiswa akan diadakan pada tanggal 15 Agustus 2025.'
    },
    {
      title: 'Pendaftaran UKM',
      date: '20 Agustus 2025',
      content: 'Pendaftaran Unit Kegiatan Mahasiswa (UKM) akan dibuka mulai 20 Agustus 2025.'
    },
    {
      title: 'Kegiatan Lomba Futsal Mahasiswa',
      date: '25 Agustus 2025',
      content: 'BEM akan mengadakan kegiatan lomba futsal antar mahasiswa pada tanggal 25 Agustus 2025.'
    },
  ];

  pengumuman: any = [];
  limit: number = 10;
  start: number = 0;

  constructor(
    private postProvider: PostProvider,
    public toastController: ToastController
  ) {}


  ngOnInit() {
    // Initialization logic can go here if needed
  }

  ionViewWillEnter() {
    this.pengumuman = [];
    this.start = 0;
    this.loadPengumuman();
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
    this.loadPengumuman().then(() => { 
    event.target.complete(); 
    }); 
    }, 500); 
  } 

  loadPengumuman() {
  return new Promise(resolve => { 
     let body = { 
      
       limit : this.limit, 
       start : this.start, 
      }; 
    this.postProvider.postData(body, 'pengumuman.php').subscribe({
      next: async (data) => {
        if (data && data.result && data.result.length > 0) {
          for (let pengumuman of data.result) { 
            this.pengumuman.push(pengumuman); 
          }   
        }
        else {
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

