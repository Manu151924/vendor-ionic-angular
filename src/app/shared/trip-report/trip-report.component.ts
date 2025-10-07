import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { IonIcon, IonButton } from "@ionic/angular/standalone";
import { FormsModule } from '@angular/forms';
import { carOutline, } from 'ionicons/icons';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { ModalController, IonicModule } from '@ionic/angular';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ShExModalComponent } from '../sh-ex-modal/sh-ex-modal.component';


@Component({
  selector: 'app-trip-report',
  templateUrl: './trip-report.component.html',
  styleUrls: ['./trip-report.component.scss'],
  imports:[FormsModule,CommonModule,IonicModule,MatInputModule,MatFormFieldModule,MatDatepickerModule]
})
export class TripReportComponent  implements OnInit {
    today = new Date();
      @ViewChild('picker') datepicker!: MatDatepicker<Date>;
      @ViewChild('monthPicker') monthPicker!: MatDatepicker<Date>;


  constructor() { }

  ngOnInit() {
    addIcons({carOutline})
    this.selectedMonths = this.today;
    this.setDateRange();
  }
    private modalController = inject(ModalController);

  tripStatusRows = [
    { vehicle: '5555', mfVsUldWB: 16, mfManifestWB: 17, mfVsUldPkgs: 300, mfManifestPkgs: 296, shEx: 4, notUnloaded: false },
    { vehicle: '4321', mfVsUldWB: 17, mfManifestWB: 17, mfVsUldPkgs: 222, mfManifestPkgs: 200, shEx: 0, notUnloaded: false },
    { vehicle: '7733', mfVsUldWB: 22, mfManifestWB: 22, mfVsUldPkgs: 122, mfManifestPkgs: 130, shEx: 1, notUnloaded: false },
    { vehicle: '1287', mfVsUldWB: 30, mfManifestWB: 24, mfVsUldPkgs: 90, mfManifestPkgs: 80, shEx: 6, notUnloaded: false },
    { vehicle: '8873', mfVsUldWB: 20, mfManifestWB: 20, mfVsUldPkgs: 108, mfManifestPkgs: 108, shEx: 0, notUnloaded: false }
  ];
  absentRows = [
    { vehicleNo: '1654', lastPickup: '18-Aug-2024' },
    { vehicleNo: '1218', lastPickup: '17-Aug-2024' }
  ];

  calendarOpen = false;
  selectedDate!: Date;
  tempSelectedDate!: Date;
  displayDate: string = 'Today';
  selectedMonths: Date = new Date();
  maxDate!: Date;
  minDate!: Date;

  openDatepicker() { this.calendarOpen = true; }
  changeDate(ev: any) { this.selectedDate = ev.detail.value; this.calendarOpen = false; }

  getMinDate() {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 1);
    return date.toISOString().slice(0,10);
  }
      public selectedVehicle = '';
          public shExDetails: any[] = [];



  getAmberClass(val: number, expected: number) {
    return val !== expected ? 'amber' : 'green';
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
// Mock example data fetch function
getShExWaybills(vehicleNumber: string) {
  // Replace the data below with your actual waybill data retrieval logic
  return [
    {
      waybillNo: '1000 7474 8855',
      booked: 100,
      manifested: 100,
      received: 99,
      pickupDate: '08-JULY-2025',
      consignor: 'S.K Electrical Pvt. Ltd.',
      type: 'short', // or 'excess'
    },
    {
      waybillNo: '1000 2020 2353',
      booked: 100,
      manifested: 100,
      received: 101,
      pickupDate: '08-JULY-2025',
      consignor: 'Sadashiv Electronics',
      type: 'excess',
    },
    // Add more mock objects as needed...
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
    return [
       { waybill: '1000 7474 8855', booked: 100, manifested: 100, received: 99, consignor: 'S.K. Electrical Pvt. Ltd.', pickupDate: '08-JUL-2025', status: 'Short' },
        { waybill: '1000 2020 2353', booked: 100, manifested: 100, received: 101, consignor: 'Sadashiv Electronics', pickupDate: '08-JUL-2025', status: 'Excess' },
        { waybill: '2000 9292 6754', booked: 100, manifested: 0, received: 2, consignor: 'J.S. Camicals', pickupDate: '08-JUL-2025', status: 'Excess' },
        { waybill: '2000 9633 9825', booked: 100, manifested: 100, received: 0, consignor: 'Samsung India Pvt. Ltd.', pickupDate: '08-JUL-2025', status: 'Short' }
    ];
  }
    openCalendar() {
    this.tempSelectedDate = this.selectedDate; 
    this.calendarOpen = true;
  }
  onDateSelect(date: Date) {
    this.tempSelectedDate = date;
    this.displayDate = this.formatDisplayDate(date); // live update
  }
  formatDisplayDate(date?: Date): string {
  if (!date) return 'Today'; // default fallback

  const today = new Date();
  if (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  ) {
    return 'Today';
  }
  // Format: DD-MM-YYYY
  return `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth()+1)
    .toString().padStart(2,'0')}-${date.getFullYear()}`;
}
 cancelDate() {
    this.tempSelectedDate = this.selectedDate;
    this.displayDate = this.formatDisplayDate(this.selectedDate);
    this.calendarOpen = false;
  }
      confirmDate() {
    this.selectedDate = this.tempSelectedDate;
    this.calendarOpen = false;
  }
    setDateRange() {
    const today = new Date();
    this.maxDate = today; 
    const min = new Date();
    min.setMonth(today.getMonth() - 12); 
    this.minDate = min;

  const currentYear = this.today.getFullYear();
  const currentMonth = this.today.getMonth();
  const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  // this.availableMonths = [];
  // for (let m = 0; m <= currentMonth; m++) {
  //   this.availableMonths.push(`${monthNames[m]}-${currentYear.toString().slice(-2)}`);
  // }
  }


}
