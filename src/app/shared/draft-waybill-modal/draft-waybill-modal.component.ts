import { Component, Input } from '@angular/core';
import { ModalController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-draft-waybills-modal',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Draft Waybills Data</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="close()">Close</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

<ion-content class="ion-padding draft-waybills-list-container">
  <div *ngFor="let item of draftWaybillsData" class="draft-waybills-card">
    <div class="draft-waybills-row">
      <div class="dwb-label">WB#</div>
      <div class="dwb-value">{{ item.waybill }}</div>
      <div class="dwb-date-label">Pickup Date</div>
      <div class="dwb-date-value">{{ item.pickupDate }}</div>
    </div>
    <div class="dwb-consignor-row">
      <span class="dwb-consignor-label">Consignor</span>
      <span class="dwb-consignor-value">{{ item.consignor }}</span>
    </div>
  </div>
</ion-content>

  `,
  styles:[`
  .draft-waybills-list-container {
  padding: 8px 0 10px 0;
  max-height: 95vh;
  overflow-y: auto;
}

.draft-waybills-card {
  background: #fff;
  border-radius: 13px;
  border-left: 4px solid #f0ad4e;
  box-shadow: 0 1px 7px rgba(60,72,88,0.06);
  margin: 10px 16px 0 16px;
  padding: 13px 18px 10px 18px;
  display: flex;
  flex-direction: column;
}

.draft-waybills-card + .draft-waybills-card {
  margin-top: 13px;
}

.draft-waybills-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 3px;
  font-size: 14px;

  .dwb-label {
    font-size: 14px;
    color: #444;
    font-weight: 600;
  }
  .dwb-value {
    font-size: 15px;
    color: #222;
    font-weight: 700;
  }
  .dwb-date-label {
    font-size: 12.5px;
    color: #888;
    font-weight: 600;
    margin-right: 6px;
  }
  .dwb-date-value {
    font-size: 13px;
    color: #f0ad4e;
    font-weight: 700;
    text-align: right;
    min-width: 105px;
  }
}

.dwb-consignor-row {
  margin-top: 7px;
  font-size: 13.5px;
  .dwb-consignor-label {
    color: #888;
    font-weight: 600;
    margin-right: 8px;
  }
  .dwb-consignor-value {
    color: #212121;
    font-weight: 500;
  }
}

    `],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class DraftWaybillsModalComponent {
  @Input() draftWaybillsData: any[] = [];

  constructor(private modalCtrl: ModalController) {}

  close() {
    this.modalCtrl.dismiss();
  }
}
