import { Component, Input, inject } from '@angular/core';
import { ModalController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-zero-pickup-modal',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Zero Pickup Data</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="close()">Close</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

<ion-content class="ion-padding zero-pickup-list-container">
  <div *ngFor="let item of zeroPickupData" class="zero-pickup-card">
    <div class="zero-pickup-row">
      <div class="zp-label">SFX Code</div>
      <div class="zp-value">{{ item.code }}</div>
      <div class="zp-date-label">Last Pickup Date</div>
      <div class="zp-date-value">{{ item.lastPickupDate }}</div>
    </div>
    <div class="zp-consignor-row">
      <div class="zp-consignor-label">Consignor</div>
      <div class="zp-consignor-value">{{ item.consignor }}</div>
    </div>
  </div>
</ion-content>

  `,
  styles:[
    `.zero-pickup-modal {
  --backdrop-opacity: 0.3;
  padding: 0;
  .modal-wrapper, .ion-overlay-wrapper {
    border-radius: 18px 18px 0 0;
    background: #fff;
    box-shadow: 0 8px 24px rgba(44, 62, 80, 0.12);
    max-width: 400px;
    margin: 0 auto;
    padding: 0;
  }
}

.zero-pickup-list-container {
  padding: 12px 0 10px 0;
  max-height: 100vh;
  overflow-y: auto;
}

.zero-pickup-header {
  display: flex;
  align-items: center;
  height: 44px;
  padding: 0 20px;
  font-size: 21px;
  font-weight: bold;
  background: #fff;
  border-radius: 14px 14px 0 0;
  border-bottom: 1.5px solid #e6e6e6;
  margin-bottom: 7px;

  .header-pill {
    border: 2px solid #b30000;
    border-radius: 8px;
    color: #b30000;
    background: #fff;
    padding: 4px 16px;
    font-size: 17px;
    font-weight: 700;
    margin-right: 12px;
    letter-spacing: 0.3px;
  }
}

/* Card Styles */
.zero-pickup-card {
  background: #fff;
  border-radius: 14px;
  border-left: 4px solid #b30000;
  box-shadow: 0 1px 7px rgba(60,72,88,0.06);
  margin: 10px 18px 0 18px;
  padding: 13px 18px 12px 18px;
  display: flex;
  flex-direction: column;
}

.zero-pickup-card + .zero-pickup-card {
  margin-top: 14px;
}

.zero-pickup-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
  margin-bottom: 4px;
  font-size: 14px;
}

.sfx-label {
  font-size: 14px;
  color: #444;
  font-weight: 600;
}
.sfx-value {
  font-size: 15px;
  color: #2e2e2e;
  font-weight: 700;
  letter-spacing: 0.03em;
}

.zp-date-label {
  font-size: 12px;
  color: #888;
  font-weight: 600;
  min-width: 80px;
}
.zp-date-value {
  font-size: 13px;
  color: #b30000;
  font-weight: 700;
  min-width: 95px;
  text-align: right;
}

.zp-consignor-label {
  font-size: 12px;
  color: #888;
  font-weight: 600;
  margin-top: 5px;
  margin-right: 8px;
}
.zp-consignor-value {
  font-size: 14px;
  color: #212121;
  font-weight: 500;
  margin-top: 1px;
}

    `
  ],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class ZeroPickupModalComponent {
  private modalCtrl = inject(ModalController);

  @Input() zeroPickupData: any[] = [];

  /** Inserted by Angular inject() migration for backwards compatibility */


  close() {
    this.modalCtrl.dismiss();
  }
}
