
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { Event } from './../../interfaces/event';
import { EventService } from './../../services/event.service';
import { Component, OnInit } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';
import { AngularFirestoreCollection } from '@angular/fire/firestore/collection/collection';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
})
export class CalendarioPage implements OnInit {
  eventSource = [];
  collapseCard;
  event: Event = {};
  private loading: any;
  private xcursionsSubscription: Subscription;
  private eventCollection: AngularFirestoreCollection<Event>;

  minDate = new Date().toISOString();
  calendar = {
    mode: 'month',
    currentDate: new Date()
  };
  constructor(
    private eventService: EventService,
    private loadingCtrl: LoadingController,
    private afs: AngularFirestore) {

    this.afs.collection<Event>('Event').snapshotChanges().subscribe(colSnap => {
      colSnap.forEach(snap => {
        this.eventSource = [];
        let event: any = snap.payload.doc.data();
        event.id = snap.payload.doc.id;
        event.startTime = new Date();
        event.endTime = new Date();
        this.eventSource.push(event);
      });
    });

  }

  resetEvents() { }

  ngOnInit() { }

  async AddEvents() {


    
    if (this.event.allDay) {
 
    }
    try {
     
      await this.eventService.addevent(this.event);
      await this.presentToast('Adicionado com sucesso!');
    } catch (error) {
      await this.presentToast('Erro!');
    }
  }

  onCurrentDateChanged(event: Date) {
    console.log('current date change' + event);
  }
  onViewTitleChanged(title) {
    console.log(title);
  }
  onEventSelected(event) {
    console.log('Event selected' + event.startTime + '-' + event.end.endTime + ',' + event.title);

  }
  onTimeSelected(ev) {
    console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' + ',' + (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.dissabled);
  }

  async presentToast(message: string) {
    const toast = await this.loadingCtrl.create({ message, duration: 2000 });
    toast.present();
  }
  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Aguarde...',
      //duration: 2000
    });
    return this.loading.present();
  }

}