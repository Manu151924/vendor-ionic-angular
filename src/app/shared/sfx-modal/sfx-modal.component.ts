import { Component, Input, inject } from '@angular/core';
import { ModalController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sfx-modal',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Assigned SFX</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="close()">Close</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="sfx-list-container">
        @for(item of assignedSfxData; track item){
          <div class="sfx-card">
            <div class="sfx-row">
              <div class="sfx-label">SFX Code</div>
              <div class="sfx-value">{{ item.code }}</div>
              <div class="pickup-info">
              <div class="pickup-label">LAST PICKUP DATE</div>
              <div class="pickup-value">{{ item.lastPickupDate }}</div>
            </div>
            </div>
            <div class="sfx-row consignor-row">
              <div class="sfx-label">Consignor</div>
              <div class="sfx-value consignor">{{ item.consignor }}</div>
            </div>
        </div>
        }
      </div>
    </ion-content>
  `,
  styles: [`
    .sfx-list-container {
      max-height: 85vh;
      overflow-y: auto;
    }

    .sfx-card {
      background: #fff;
      border-radius: 12px;
      border-left: 4px solid #1cb14f;
      box-shadow: 0 2px 10px rgba(0,0,0,0.05);
      padding: 14px 20px;
      margin-bottom: 12px;
    }

    .sfx-row {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 14px;
      margin-bottom: 6px;
      font-weight: 600;
      color: #444;
    }

    .sfx-label {
      min-width: 100px;
      color: #666;
      font-weight: 700;
    }

    .sfx-value,
    .pickup-value {
      font-weight: 100;
      color: #222;
    }

    .pickup-label {
      min-width: 130px;
      color: #666;
      font-weight: 700;
    }

    .consignor-row {
      gap: 10px;
      margin-top: 4px;
    }

    .consignor {
      font-weight: 500;
      color: #333;
    }
    .pickup-info {
  text-align: right;

  .pickup-label {
    font-weight: 600;
    font-size: 11px;
    color: #999;
    letter-spacing: 1px;
    margin-bottom: 4px;
  }

  .pickup-value {
    font-weight: 700;
    font-size: 14px;
    color: #444;
  }
}
  `],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class SfxModalComponent {
  private modalCtrl = inject(ModalController);

  @Input() assignedSfxData: {
    code: string;
    consignor: string;
    lastPickupDate: string;
  }[] = [];
  close() {
    this.modalCtrl.dismiss();
  }
}
