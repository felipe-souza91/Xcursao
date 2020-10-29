import { AngularFireModule } from '@angular/fire';
import { async } from '@angular/core/testing';
import { XcursionService } from 'src/app/services/xcursion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './../../services/auth.service_org';
import { LoadingController, ToastController, NavController, Platform } from '@ionic/angular';
import { Xcursion } from './../../interfaces/xcursion';
import { Observable, Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { database } from 'firebase';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';



@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  public uploadPercent: Observable<number>;
  public downloadUrl: Observable<string>;
  private xcursion: Xcursion = {};
  private loading: any;
  private xcursionId: string = null;
  private email: string = null;
  private xcursionSubscription: Subscription;


  constructor(
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthService,
    private activeRoute: ActivatedRoute,
    private xcursionService: XcursionService,
    private navCtrl: NavController,
    private camera: Camera,
    private platform: Platform,
    private file: File,
    private afStorage: AngularFireStorage,
    private afa: AngularFireAuth,
    private afs: AngularFirestore,
    
    
  ) {
   
    this.xcursionId = this.activeRoute.snapshot.params['id'];
    this.email = this.activeRoute.snapshot.params['locs'];
    this.xcursion.email = this.email;
    if (this.xcursionId) this.loadXvision();
  }

  ngOnInit() { }

  ngOndestroy() {
    
  }
  loadXvision() {
    this.xcursionSubscription = this.xcursionService.getXcursion(this.xcursionId).subscribe(data => {
      this.xcursion = data;
    });

  }

  Voltar(){
    this.router.navigate(['/home', {locs: this.xcursion.email}]);

  }

  
  async openGalery() {

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation: true
    };

    try {
      const fileUrl: string = await this.camera.getPicture(options);

      let file: string;
      if (this.platform.is('ios')) {

        file = fileUrl.split('/').pop();

      } else {
        file = fileUrl.substring(fileUrl.lastIndexOf('/') + 1, fileUrl.indexOf('?'));
      }
      const path: string = fileUrl.substring(0, fileUrl.lastIndexOf('/'));
      const buffer: ArrayBuffer = await this.file.readAsArrayBuffer(path, file);
      const blob = new Blob([buffer], { type: 'imagens/jpeg' });
      this.uploadPicture(blob);

    } catch (error) {
      console.error(error);

    }
  }
  uploadPicture(blob: Blob) {
    const ref = this.afStorage.ref('ionic.jpg');
    const task = ref.put(blob);
    this.uploadPercent = task.percentageChanges();

    task.snapshotChanges().pipe(
      finalize(() => this.downloadUrl = ref.getDownloadURL())
      ).subscribe();
  }

  async saveXcursion() {
    await this.presentLoading();

    if (this.xcursionId) {

      try {
        await this.xcursionService.updateXcursion(this.xcursionId, this.xcursion);
        await this.loading.dismiss();

        this.router.navigate(['/home',{locs: this.xcursion.email}]);
      } catch (erro) {

        this.presentToast("Erro ao tentar salvar");
        this.loading.dismiss();
      }

    } else {
      this.xcursion.data = new Date().getTime();

      try {
        const newUserObject = Object.assign({}, this.xcursion);

       
        await this.xcursionService.addXcursion(this.xcursion);
        
        await this.loading.dismiss();

        this.router.navigate(['/home', {locs: this.email}]);
      } catch (erro) {

        this.presentToast("Erro ao tentar salvar");
        this.loading.dismiss();
      }

    }
  }

  async presentLoading() {

    this.loading = await this.loadingCtrl.create({ message: 'Por favor, aguarde...' });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.loadingCtrl.create({ message, duration: 2000 });
    toast.present();

  }


}
