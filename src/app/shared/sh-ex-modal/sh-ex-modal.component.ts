import { Component, Input } from '@angular/core';
import { ModalController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sh-ex-modal',
  template: `
<ion-header>
  <ion-toolbar>
    <ion-title>
      <span class="modal-title-pill">DL 11 AS {{ selectedVehicle }}</span>
    </ion-title>
    <ion-buttons slot="end">
      <ion-button (click)="close()">
        <ion-icon name="close"></ion-icon>
      </ion-button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>

<ion-content class="ion-padding sh-ex-list-container">
  <div *ngFor="let item of shExDetails" 
       class="sh-ex-card"
       [ngClass]="{'short': item.status === 'Short', 'excess': item.status === 'Exess'}">
    <div class="sh-ex-row">
      <div class="sh-label">WB#</div>
      <div class="sh-value">{{ item.waybill }}</div>
      <div class="sh-booking-group">
        <span class="green">{{ item.booked }}</span>/
        <span class="amber">{{ item.manifested }}</span>/
        <span class="red">{{ item.received }}</span>
      </div>
      <div class="sh-date-label">Pickup Date</div>
      <div class="sh-date-value">{{ item.pickupDate }}</div>
    </div>
    <div class="sh-consignor-row">
      <span class="sh-consignor-label">Consignor</span>
      <span class="sh-consignor-value">{{ item.consignor }}</span>
      <span *ngIf="item.status === 'Short'" class="sh-chip short">Short</span>
      <span *ngIf="item.status === 'Exess'" class="sh-chip excess">Exess</span>
    </div>
  </div>

<ng-template #noData>
    <ion-text color="medium" class="ion-text-center">
      <p>No SH/EX details found.</p>
    </ion-text>
  </ng-template>
</ion-content>

  `,
  styles:[
    `.sh-ex-list-container {
  padding-top: 8px;
  max-height: 99vh;
  overflow-y: auto;
  background: #f7f7f7;
}
.sh-ex-card {
  background: #fff;
  border-radius: 14px;
  border-left: 4px solid #b30000;
  box-shadow: 0 1px 7px rgba(60,72,88,0.06);
  margin: 10px 16px 0 16px;
  padding: 13px 18px 9px 18px;
  display: flex; 
  flex-direction: column;
  &.excess { border-left-color: #f0ad4e; }
}

.sh-ex-row {
  display: flex;
  align-items: center;
  gap: 13px;
  .sh-label { font-weight: 600; width: 55px;}
  .sh-value { font-weight: 700; min-width: 130px; }
  .sh-booking-group { font-weight: 700; }
  .green { color: #22b543;}
  .amber { color: #f0ad4e;}
  .red { color: #c52222;}
  .sh-date-label { font-size: 13px; color: #888; margin-left: 7px;}
  .sh-date-value { color: #b30000; font-weight: 700; margin-left: 7px;}
}
.sh-consignor-row {
  margin-top: 8px;
  .sh-consignor-label { font-size: 12.5px; color: #888; font-weight: 600; margin-right: 7px; }
  .sh-consignor-value { font-size: 14px; color: #222; font-weight: 500;}
  .sh-chip {
    font-size: 13px;
    font-weight: 700;
    border-radius: 12px;
    padding: 3px 18px;
    margin-left: 18px;
    background: #fff0f0;
    border: 1.5px solid #b30000;
    color: #b30000;
    &.excess {
      background: #fff7e2;
      border-color: #f0ad4e;
      color: #e69500;
    }
  }
}

/* Modal Title Pill */
.modal-title-pill {
  border: 2px solid #78909c;
  border-radius: 8px;
  background: #fff;
  color: #444;
  padding: 2px 18px;
  font-size: 17px;
  font-weight: 600;
  letter-spacing: 0.5px;
}

    `
  ],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class ShExModalComponent {
  @Input() shExDetails: any[] = [];
  @Input() selectedVehicle: string = '';

  constructor(private modalCtrl: ModalController) {}

  close() {
    this.modalCtrl.dismiss();
  }
}
