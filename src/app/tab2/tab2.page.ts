import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router'; 
import { ToastController } from '@ionic/angular'; 
import { PostProvider } from '../provider/post-provider';


@Component({ 
  selector: 'app-tab2', 
  templateUrl: 'tab2.page.html', 
  styleUrls: ['tab2.page.scss'],
  standalone: false,
}) 
export class Tab2Page implements OnInit { 
 
  nama: string = ''; 
  nim: string = '';
  stambuk: string = '';
  alamat: string = ''; 
  tempatlahir: string = '';
  tanggallahir: string = '';
  nohp: string = ''; 
  email: string = '';
  prodi: string = ''; 
  IPK: string = '';
  alasan: string = '';
  pengalaman: string = '';

  constructor( 
    private router: Router, 
    public toastController: ToastController, 
    private postPvd: PostProvider, 
  ) {  
     
  } 
 
  ngOnInit() { 
  } 
 
  async addRegister() { 
    if (this.nama == '') { 
      const toast = await this.toastController.create({ 
      message: 'Nama lengkap harus di isi', 
      duration: 2000 
      }); 
      toast.present(); 
      } 
      else if (this.nim == '') { 
      const toast = await this.toastController.create({ 
        message: 'NIM harus di isi', 
        duration: 2000 
        }); 
      toast.present();

        } else if (this.stambuk == '') { 
      const toast = await this.toastController.create({ 
        message: 'Stambuk harus di isi', 
        duration: 2000 
        }); 
      toast.present();

    } else if (this.alamat == '') { 
      const toast = await this.toastController.create({ 
        message: 'Alamat harus di isi', 
        duration: 2000 
        }); 
      toast.present(); 
    } else if (this.tempatlahir == '') { 
      const toast = await this.toastController.create({ 
        message: 'Tempat lahir harus di isi', 
        duration: 2000 
        });
      toast.present(); 

    } else if (this.tanggallahir == null) { 
      const toast = await this.toastController.create({ 
        message: 'Tanggal lahir harus di isi', 
        duration: 2000 
        });
      toast.present(); 

    } else if (this.nohp == '') { 
      const toast = await this.toastController.create({ 
        message: 'No HP/WA harus di isi', 
        duration: 2000 
        });
      toast.present(); 

    } else if (this.email== '') { 
      const toast = await this.toastController.create({ 
        message: 'Email harus di isi', 
        duration: 2000 
        }); 
      toast.present(); 
 
    } else if (this.prodi == '') { 
      const toast = await this.toastController.create({ 
        message: 'Prodi harus di isi', 
        duration: 2000 
        }); 
      toast.present(); 

       } else if (this.IPK == '') { 
      const toast = await this.toastController.create({ 
        message: 'IPK harus di isi', 
        duration: 2000 
        }); 
      toast.present(); 

       } else if (this.alasan == '') { 
      const toast = await this.toastController.create({ 
        message: 'Alasan harus di isi', 
        duration: 2000 
        }); 
      toast.present(); 

       } else if (this.pengalaman == '') { 
      const toast = await this.toastController.create({ 
        message: 'Pengalaman harus di isi', 
        duration: 2000 
        }); 
      toast.present(); 

    } 
    else { 
      let body = { 
        nama: this.nama, 
        nim: this.nim, 
        stambuk: this.stambuk,
        alamat: this.alamat, 
        tempatlahir: this.tempatlahir, 
        tanggallahir: this.tanggallahir, 
        nohp: this.nohp, 
        email: this.email,
        prodi: this.prodi,
        IPK: this.IPK,
        alasan: this.alasan,
        pengalaman: this.pengalaman,
        aksi: 'add_register' 
      }; 
      this.postPvd.postData(body, 'action.php').subscribe(async data => { 
       var alertpesan = data.msg; 
       if (data.success) { 
        this.router.navigate(['/tabs/tab3']); 
        const toast = await this.toastController.create({ 
          message: 'Selamat! Registrasi BEM sukses.', 
          duration: 2000,
           position: 'top',
         }); 
         toast.present(); 
          this.resetForm();
       } else { 
         const toast = await this.toastController.create({ 
           message: alertpesan, 
           duration: 2000,
           position: 'top',
            color: 'danger'
         }); 
         toast.present ();
         
       } 
     }); 
 
    } 
  } 
  resetForm() {
    this.nama = '';
    this.nim = '';
    this.stambuk = '';
    this.alamat = '';
    this.tempatlahir = '';
    this.tanggallahir = '';
    this.nohp = '';
    this.email = '';
    this.prodi = '';
    this.IPK = '';
    this.alasan = '';
    this.pengalaman = '';
  }
}
