import { Component, HostListener, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonCard, IonSelect,IonSelectOption, IonGrid, IonRow, IonCol, IonIcon, IonChip } from '@ionic/angular/standalone';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { addIcons } from 'ionicons';
import { ModalController } from '@ionic/angular';
import { busOutline, swapHorizontalOutline, lockClosedOutline, readerOutline, checkmarkOutline, location } from 'ionicons/icons';
import { DraftWaybillsModalComponent } from 'src/app/shared/draft-waybill-modal/draft-waybill-modal.component';
import { NotManifestedModalComponent } from 'src/app/shared/not-maintained-modal/not-maintained-modal.component';
import { SfxModalComponent } from 'src/app/shared/sfx-modal/sfx-modal.component';
import { ShExModalComponent } from 'src/app/shared/sh-ex-modal/sh-ex-modal.component';
import { ZeroPickupModalComponent } from 'src/app/shared/zero-pickup-modal/zero-pickup-modal.component';
import { TripReportComponent } from "src/app/shared/trip-report/trip-report.component";


@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss'],
  standalone: true,
  imports: [IonChip, IonIcon, IonCol, IonRow, IonGrid, IonCard, CommonModule, FormsModule, NgxChartsModule, IonSelect, IonSelectOption, TripReportComponent]
})
export class BookingPage implements OnInit {

  constructor() {
    addIcons({location,swapHorizontalOutline,busOutline,lockClosedOutline,readerOutline,checkmarkOutline,});
   }
  private modalController = inject(ModalController);
       dataLabelFormatting(c: any) {
    return c.value;
  }
  assignedSfx= 20;

   tripStatusData = [
    {
      vehNo: '5555',
      lastFour: '5555',
      mfNo: '2035 9999 0303',
      waybill: { mf: 16, uld: 17 },
      waybillAmber: true,   // Shows amber color if mismatch
      pkgs: { mf: 300, uld: 296 },
      pkgsAmber: true,
      shEx: 4,
      shExAmber: true,
      waybillPopup: [       // Popup matrix with detailed waybill info
        {
          waybillNo: 'WB1234',
          pickupDate: '01-Oct-2024',
          consignor: 'ABC Pvt Ltd',
          booked: 10,
          manifested: 8,
          remaining: 2
        }
      ]
    },
    {
      vehNo: '4321',
      lastFour: '4321',
      mfNo: '2048 9999 0101',
      waybill: { mf: 17, uld: 17 },
      waybillAmber: false,
      pkgs: { mf: 222, uld: 200 },
      pkgsAmber: true,
      shEx: 0,
      shExAmber: false,
      waybillPopup: [
        {
          waybillNo: 'WB2234',
          pickupDate: '02-Oct-2024',
          consignor: 'XYZ Pvt Ltd',
          booked: 15,
          manifested: 15,
          remaining: 0
        }
      ]
    },
    // Add more trips similarly
  ];

  // Absent Vehicles list
  absentData = [
    { vehNo: '1654', pickupDate: '18-Aug-2024' },
    { vehNo: '1218', pickupDate: '17-Aug-2024' }
  ];

  tooltipIndex: number | null = null;
  popupWaybillIndex: number | null = null;

  // Show/hide tooltip for vehicle number on click
  showTooltip(idx: number, event: MouseEvent) {
    event.stopPropagation();
    if (this.tooltipIndex === idx) {
      this.tooltipIndex = null;
    } else {
      this.tooltipIndex = idx;
      this.popupWaybillIndex = null; // close other popup
    }
  }

  // Show/hide waybill popup matrix on SH/EX click
  showPopupWaybill(idx: number, event: MouseEvent) {
    event.stopPropagation();
    if (this.popupWaybillIndex === idx) {
      this.popupWaybillIndex = null;
    } else {
      this.popupWaybillIndex = idx;
      this.tooltipIndex = null; // close tooltip
    }
  }

  // Close popups/tooltips when clicking outside
  @HostListener('document:click', ['$event'])
  onDocClick() {
    this.tooltipIndex = null;
    this.popupWaybillIndex = null;
  }
  colorSchemeForPie: Color = {
    name: 'customScheme',
    selectable: true,
    group: ScaleType.Ordinal, 
    domain: ['#f59539', '#2cb7b5'] 
  };
 selectedMonth: string = ''; // Initialize here
  validMonths: string[] = []; // Declare this to fix error

  // Replace your existing data items here
  totalWaybill = 500;
  editedWaybill = 150;
  volumetricWeight = 16;
  actualWeight = 20;
  interchangeWaybill = 25;
  totalWaybillPicked = 100;
  mappedVehicleTrips = 600;
  totalTrips = 650;
    public shExDetails: any[] = [];
  public assignedSfxData: any[] = [];
  public zeroPickupData: any[] = [];
  public notManifestedData: any[] = [];
  public draftWaybillsData: any[] = [];
    public selectedVehicle = '';


  pieChartData: { name: string; value: number }[] = []; // Define type explicitly
    chartData = [
    { name: 'ZERO PICKUP SFX', value: 4 },
    { name: 'NOT MANIFESTED', value: 120 },
    { name: 'DRAFT WAYBILLS', value: 79 },
  ];

  colorScheme: Color = {
    name: 'customScheme',
    selectable: true,
    group: ScaleType.Ordinal,
     domain: ['#a81e2f', '#a81e2f', '#ffc700']
  };

  today = new Date();

  ngOnInit() {
    this.generateValidMonths();
    this.selectedMonth = this.formatMonthYear(this.today);
    this.loadDataForMonth(this.selectedMonth);
  }

  generateValidMonths() {
    const months = [];
    const today = new Date();
    // Generate months for last 12 months including current month
    for (let i = 11; i >= 0; i--) {
      const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
      months.push(this.formatMonthYear(d));
    }
    this.validMonths = months;
  }

  formatMonthYear(date: Date): string {
    const options = { year: '2-digit', month: 'short' } as const;
    return date.toLocaleDateString('en-US', options).replace(',', '');
  }

  isFutureMonth(monthStr: string): boolean {
    const [mon, yr] = monthStr.split('-');
    // Parse year as full year
    const yearFull = 2000 + parseInt(yr, 10);
    const monthNumber = new Date(Date.parse(mon + " 1, " + yearFull)).getMonth();
    const monthDate = new Date(yearFull, monthNumber, 1);
    return monthDate > this.today;
  }

  loadDataForMonth(monthStr: string) {
    if (this.isFutureMonth(monthStr)) {
      alert('Future months cannot be selected');
      this.selectedMonth = this.formatMonthYear(this.today);
      return;
    }
    // Set pie chart data array
    this.pieChartData = [
      { name: 'Edited', value: this.editedWaybill },
      { name: 'Booked', value: this.totalWaybill - this.editedWaybill }
    ];
  }

  getWeightVolumePercent(): number {
    return this.actualWeight === 0 ? 0 : Math.round((this.volumetricWeight / this.actualWeight) * 100);
  }

  getInterchangePercent(): number {
    return this.totalWaybillPicked === 0 ? 0 : Math.round((this.interchangeWaybill / this.totalWaybillPicked) * 100);
  }

  getMarketVehicleUsagePercent(): number {
    return this.totalTrips === 0 ? 0 : Math.round((this.mappedVehicleTrips / this.totalTrips) * 100);
  }

  getColorForWeightVolume(percent: number): string {
    if (percent <= 33) return '#e53935';
    if (percent <= 66) return '#ffa726';
    return '#8bc34a';
  }

  getColorForInterchange(percent: number): string {
    if (percent <= 33) return '#8bc34a';
    if (percent <= 66) return '#ffa726';
    return '#e53935';
  }

  getColorForMarketVehicleUsage(percent: number): string {
    if (percent <= 33) return '#e53935';
    if (percent <= 66) return '#ffa726';
    return '#8bc34a';
  }
  getGradientForWeightVolume(percent: number): string {
  if (percent <= 33)
    return 'linear-gradient(90deg, #e53935, #e53935)'; // solid red
  if (percent <= 66)
    return 'linear-gradient(90deg, #ffa726, #ffca28)'; // amber gradient
  return 'linear-gradient(90deg, #8bc34a, #4caf50)'; // green gradient
}

getGradientForInterchange(percent: number): string {
  if (percent <= 33)
    return 'linear-gradient(90deg, #8bc34a, #a5d6a7)'; // green gradient
  if (percent <= 66)
    return 'linear-gradient(90deg, #ffa726, #ffca28)'; // amber gradient
  return 'linear-gradient(90deg, #e53935, #ef5350)'; // red gradient
}

getGradientForMarketVehicleUsage(percent: number): string {
  if (percent <= 33)
    return 'linear-gradient(90deg, #e53935, #e57373)'; // red gradient
  if (percent <= 66)
    return 'linear-gradient(90deg, #ffa726, #ffca28)'; // amber gradient
  return 'linear-gradient(90deg, #8bc34a, #4caf50)'; // green gradient
}
selectedBranch = 'DELHI-11';
  async openModal(name: string, event?: Event) {
    event?.stopPropagation();
    let modalComponent: any;
    switch (name) {
      case 'ZERO PICKUP SFX':
        modalComponent = ZeroPickupModalComponent;
        this.zeroPickupData = this.getZeroPickupData();
        break;
      case 'NOT MANIFESTED':
        modalComponent = NotManifestedModalComponent;
        this.notManifestedData = this.getNotManifestedData();
        break;
      case 'DRAFT WAYBILLS':
        modalComponent = DraftWaybillsModalComponent;
        this.draftWaybillsData = this.getDraftWaybillsData();
        break;
    }
    if (modalComponent) {
      let dataProp: any[] = [];
      if (name === 'ZERO PICKUP SFX') {
        dataProp = this.zeroPickupData;
      } else if (name === 'NOT MANIFESTED') {
        dataProp = this.notManifestedData;
      } else if (name === 'DRAFT WAYBILLS') {
        dataProp = this.draftWaybillsData;
      }
      const modal = await this.modalController.create({
        component: modalComponent,
        componentProps: { data: dataProp },
      });
      await modal.present();
    }
  }
    async openSfxModal() {
        console.log('Opening SFX Modal');
        this.assignedSfxData = this.getAssignedSfxData();
        const modal = await this.modalController.create({
          component: SfxModalComponent,
          componentProps: { assignedSfxData: this.assignedSfxData },
          cssClass: 'sfx-modal'
        });
        await modal.present();
        await modal.onDidDismiss();
    }

  async openZeroPickupModal() {
    console.log('Opening ZERO PICKUP Modal');
    this.zeroPickupData = this.getZeroPickupData();
    console.log('Zero Pickup Data:', this.zeroPickupData);
    const modal = await this.modalController.create({
      component: ZeroPickupModalComponent,
      componentProps: { zeroPickupData: this.zeroPickupData },
      cssClass: 'zero-pickup-modal'
    });
    await modal.present();
    await modal.onDidDismiss();
  }

  async openNotManifestedModal() {
    console.log('Opening NOT MANIFESTED Modal');
    this.notManifestedData = this.getNotManifestedData();
    const modal = await this.modalController.create({
      component: NotManifestedModalComponent,
      componentProps: { notManifestedData: this.notManifestedData },
      cssClass: 'not-manifested-modal'
    });
    await modal.present();
    await modal.onDidDismiss();
  }

  async openDraftWaybillsModal() {
    console.log('Opening DRAFT WAYBILLS Modal');
    this.draftWaybillsData = this.getDraftWaybillsData();
    const modal = await this.modalController.create({
      component: DraftWaybillsModalComponent,
      componentProps: { draftWaybillsData: this.draftWaybillsData },
      cssClass: 'draft-waybills-modal'
    });
    await modal.present();
    await modal.onDidDismiss();
  }

  async openShExModal(vehicleNo: string) {
    console.log('Opening SH/EX Modal for', vehicleNo);
    this.selectedVehicle = vehicleNo;
    this.shExDetails = this.getShExDetails(vehicleNo);
    const modal = await this.modalController.create({
      component: ShExModalComponent,
      componentProps: { shExDetails: this.shExDetails, selectedVehicle: this.selectedVehicle },
      cssClass: 'sh-ex-modal'
    });
    await modal.present();
    await modal.onDidDismiss();
  }

  closeSfxModal() { this.modalController.dismiss(); }
  closeZeroPickupModal() { this.modalController.dismiss(); }
  closeNotManifestedModal() { this.modalController.dismiss(); }
  closeDraftWaybillsModal() { this.modalController.dismiss(); }
  closeShExModal() { this.modalController.dismiss(); }

  getAssignedSfxData(): any[] {
    return [
      { code: 'SFX0001234333', consignor: 'S.K. Electrical Pvt. Ltd.', lastPickupDate: '07-JUL-2025' },
      { code: 'SFX0004567437', consignor: 'Gama Solutions Pvt. Ltd.', lastPickupDate: '07-JUL-2025' },
      { code: 'SFX00027254783', consignor: 'Samsung India Pvt. Ltd.', lastPickupDate: '07-JUL-2025' },
      { code: 'SFX000263409877', consignor: 'Khurana Garments', lastPickupDate: '07-JUL-2025' },
      { code: 'SFX0001234222', consignor: 'Unknown', lastPickupDate: '07-JUL-2025' }
    ];
  }

  getZeroPickupData(): any[] {
    return [
      { code: 'SFX00027254783', consignor: 'Samsung India Pvt. Ltd.', lastPickupDate: '07-JUL-2025' },
      { code: 'SFX000263409877', consignor: 'Khurana Garments', lastPickupDate: '07-JUL-2025' },
      { code: 'SFX0001234333', consignor: 'S.K. Electrical Pvt. Ltd.', lastPickupDate: '07-JUL-2025' },
      { code: 'SFX0004567437', consignor: 'Gama Solutions Pvt. Ltd.', lastPickupDate: '07-JUL-2025' }
    ];
  }

  getNotManifestedData(): any[] {
    return [
      { waybill: '4083 3650 7803', booked: 100, manifested: 80, remaining: 20, consignor: 'S.K. Electrical Pvt. Ltd.', pickupDate: '07-JUL-2025' },
      { waybill: '2279 7354 3382', booked: 100, manifested: 75, remaining: 25, consignor: 'Gama Solutions Pvt. Ltd.', pickupDate: '07-JUL-2025' },
      { waybill: '1300 6454 7775', booked: 100, manifested: 75, remaining: 25, consignor: 'Samsung India Pvt. Ltd.', pickupDate: '07-JUL-2025' },
      { waybill: '2000 9390 2222', booked: 100, manifested: 75, remaining: 25, consignor: 'Khurana Garments', pickupDate: '07-JUL-2025' },
      { waybill: '2100 AAAA 4565', booked: 100, manifested: 75, remaining: 25, consignor: 'Unknown', pickupDate: '07-JUL-2025' }
    ];
  }

  getDraftWaybillsData(): any[] {
    return [
      { waybill: '4083 3650 7803', consignor: 'S.K. Electrical Pvt. Ltd.', pickupDate: '07-JUL-2025' },
      { waybill: '2279 7354 3382', consignor: 'Gama Solutions Pvt. Ltd.', pickupDate: '07-JUL-2025' },
      { waybill: '1300 6454 7775', consignor: 'Samsung India Pvt. Ltd.', pickupDate: '07-JUL-2025' },
      { waybill: '2000 9390 2222', consignor: 'Khurana Garments', pickupDate: '07-JUL-2025' },
      { waybill: '2100 AAAA 4565', consignor: 'Unknown', pickupDate: '07-JUL-2025' }
    ];
  }

  getShExDetails(vehicleNo: string): any[] {
    if (vehicleNo === '5555') {
      return [
        { waybill: '1000 7474 8855', booked: 100, manifested: 100, received: 99, consignor: 'S.K. Electrical Pvt. Ltd.', pickupDate: '08-JUL-2025', status: 'Short' },
        { waybill: '1000 2020 2353', booked: 100, manifested: 100, received: 101, consignor: 'Sadashiv Electronics', pickupDate: '08-JUL-2025', status: 'Excess' },
        { waybill: '2000 9292 6754', booked: 100, manifested: 0, received: 2, consignor: 'J.S. Camicals', pickupDate: '08-JUL-2025', status: 'Excess' },
        { waybill: '2000 9633 9825', booked: 100, manifested: 100, received: 0, consignor: 'Samsung India Pvt. Ltd.', pickupDate: '08-JUL-2025', status: 'Short' }
      ];
    }
    return [];
  }

  getHeatMapColor(value: number, reverse = false): string {
    if (reverse) {
      if (value <= 33) return 'success';
      if (value <= 66) return 'warning';
      return 'danger';
    } else {
      if (value <= 33) return 'danger';
      if (value <= 66) return 'warning';
      return 'success';
    }
  }



}
