import { Component, Input } from '@angular/core';
import { ModalController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { close} from 'ionicons/icons';

@Component({
  selector: 'app-sh-ex-modal',
  templateUrl: './sh-ex-modal.component.html',
  styleUrls: ['./sh-ex-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class ShExModalComponent {
  @Input() shExDetails: any[] = [];
  @Input() selectedVehicle: string = '';

  constructor(private modalCtrl: ModalController) {
    addIcons({close})
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
