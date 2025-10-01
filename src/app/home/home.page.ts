import { Component } from '@angular/core';
import { IonToolbar, IonFooter, IonButtons, IonButton, IonIcon, IonLabel, IonBadge, IonContent, IonSegment, IonSegmentButton, IonHeader } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { checkmarkDone, home, person, notificationsOutline} from 'ionicons/icons';
import { DeliveryPage } from '../pages/delivery/delivery.page';
import { BookingPage } from '../pages/booking/booking.page';
 
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonSegmentButton, IonSegment, IonBadge, IonLabel, IonIcon, IonButton, IonButtons, IonFooter, IonToolbar, IonContent, DeliveryPage,BookingPage,FormsModule,CommonModule],
})
export class HomePage {
  constructor() {
    addIcons({checkmarkDone, home, person,notificationsOutline})
  }
     segment: string = 'delivery';

   notificationsCount = 5;
}
