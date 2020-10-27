import { Subscription } from 'rxjs';
import { File } from '@ionic-native/file/ngx';
import { Component, OnInit } from '@angular/core';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';


@Component({
  selector: 'app-addphoto',
  templateUrl: './addphoto.page.html',
  styleUrls: ['./addphoto.page.scss'],
})
export class AddphotoPage implements OnInit {

 public photos: any = [];

  constructor(
    public camera: Camera,
    public file: File
    ) { 

    }
    TakePhotos(){
      var option:CameraOptions={
        quality:100,
        mediaType: this.camera.MediaType.PICTURE,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType:this.camera.EncodingType.JPEG
      }
      this.camera.getPicture().then((imagedata) =>{
        let filename = imagedata.substring(imagedata.lastIndexOf('/')+1);
        let path = imagedata.substring(0,imagedata.lastIndexOf('/')+1);
        this.file.readAsDataURL(path,filename).then((base64data) =>{
          this.photos.push(base64data);

        })
      })
    }

  ngOnInit() {
  }

}
