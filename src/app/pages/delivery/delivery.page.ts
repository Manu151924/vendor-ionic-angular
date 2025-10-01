import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ModalController } from '@ionic/angular';
import { IonCard, IonItem, IonIcon,IonSelectOption, IonNote,IonSelect, IonModal, IonDatetime, IonButton, IonFooter, IonToolbar, IonContent, IonButtons } from '@ionic/angular/standalone';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { addIcons } from 'ionicons';
import { location, checkboxOutline, carOutline, wallet, document, shieldCheckmark, calendar, chevronUpOutline, chevronDownOutline } from 'ionicons/icons';


@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.page.html',
  styleUrls: ['./delivery.page.scss'],
  standalone: true,
  imports: [IonButtons, IonContent, IonToolbar, IonFooter,  IonButton, IonDatetime, IonModal, IonNote, IonIcon, IonItem, IonCard,IonSelectOption,IonSelect, CommonModule, FormsModule,NgxChartsModule],
    providers: [ModalController]
})
export class DeliveryPage implements OnInit {
  tempSelectedDate: any;

  constructor(private modalCtrl: ModalController) {
    addIcons({location,calendar,checkboxOutline,carOutline,wallet,document,shieldCheckmark,chevronUpOutline, chevronDownOutline});
   }

  ngOnInit() {
    this.generateAvailableDates();
    this.updatePieChart()
  }

  cities = ['DELHI-11', 'DELHI-22', 'DELHI-33'];
  selectedCity = 'DELHI-11';

  barData = [
    { name: 'DWARKA', value: 100 },
    { name: 'KAROLBAGH', value: 80 },
    { name: 'UTTAM NAGAR', value: 55 },
    { name: 'MAHIPALPUR', value: 40 },
    { name: 'VASANTKUNJ', value: 32 }
  ];

  colorScheme: Color = {
      name: 'customScheme',
      selectable: true,
      group: ScaleType.Ordinal, 
      domain: ['#C62828', '#F9A825', '#43A047', '#81C784', '#66BB6A']
  };
  availableDates: Date[] = [];
  generateAvailableDates() {
    const today = new Date();
    const lastYear = new Date(today);
    lastYear.setFullYear(today.getFullYear() - 1);

    const dates = [];
    for(let d = new Date(lastYear); d <= today; d.setDate(d.getDate() + 1)) {
      dates.push(new Date(d));
    }
    this.availableDates = dates;
  }

  onDateChange(event: any) {
    const selected = event.detail.value;
    console.log('Date changed:', selected);
  }

  todayStr = 'Today';
  selectedDate: string | null = null;
  dateOptions: string[] = [];
  get todayOrSelected() { return this.selectedDate || this.todayStr; }
  trips = [
    { vehNo: '1234', ofdStatus: '16/20', lastUpdated: '12:00', statusColor: 'green' },
    { vehNo: '4321', ofdStatus: '11/17', lastUpdated: '14:00', statusColor: 'green' },
    { vehNo: '7733*', ofdStatus: '12/22', lastUpdated: '10:00', statusColor: 'yellow' },
    { vehNo: '8973', ofdStatus: '10/23', lastUpdated: '09:00', statusColor: 'green' },
    { vehNo: '1287', ofdStatus: '00/24', lastUpdated: '05:00', statusColor: 'red' },
    { vehNo: '1283', ofdStatus: '00/24', lastUpdated: '05:00', statusColor: 'red' }
  ];
  absents = [
    { vehNo: '1654', lastTripDate: '18-Aug-2024' },
    { vehNo: '1218', lastTripDate: '17-Aug-2024' }
  ];
  calendarOpen = false;
maxDate = new Date().toISOString().slice(0, 10);
minDate = new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString().slice(0, 10);

// openCalendar(): void {
//   console.log('openCalendar called');
//   this.calendarOpen = true;
// }

selectDate(event: any): void {
  const picked = event.detail.value;
  if (picked > this.maxDate) {
    return;
  }
  this.selectedDate = picked;
  this.calendarOpen = false;
  this.onDateChange(picked);  // utility function to load data on date change
}
async openCalendar() {
  const modal = await this.modalCtrl.create({
    component: IonDatetime,
    componentProps: {
      max: this.maxDate,
      min: this.minDate,
      value: this.selectedDate
    }
  });

  modal.onDidDismiss().then(event => {
    const picked = event.data;
    if (picked) {
      this.selectedDate = picked;
      this.onDateChange(picked);
    }
  });

  await modal.present();
}
cancelDate(): void {
  this.calendarOpen = false;  // just close modal
}

confirmDate(): void {
  if (this.tempSelectedDate) {
    this.selectedDate = this.tempSelectedDate;
    this.onDateChange(this.selectedDate);
  }
  this.calendarOpen = false;
}
  isExpanded = false;
  get displayedTripVehicles() {
    return this.isExpanded ? this.trips : this.trips.slice(0, 5);
  }

  get displayedAbsentVehicles() {
    return this.isExpanded ? this.absents : this.absents.slice(0, 5);
  }

  toggleExpansion() {
    this.isExpanded = !this.isExpanded;
  }
     colorSchemeForPie: Color = {
    name: 'customScheme',
    selectable: true,
    group: ScaleType.Ordinal, 
    domain: ['#06B4A2', '#FF8A0D'] 
  };
  pieChartData: any[] = [];
      totalDelivered = 370;
  totalUndelivered = 20;
  updatePieChart() {
    const total = this.totalDelivered + this.totalUndelivered;
    
    this.pieChartData = [
      {
        name: 'Delivered',
        value: this.totalDelivered,
      },
      {
        name: 'Undelivered',
        value: this.totalUndelivered,
      }
    ];
  }
progressValue: number = 0;
isDragging = false;

@ViewChild('progressWrapper') progressWrapper!: ElementRef;

getHappinessFace(): string {
  const percent = this.progressValue * 100;
  if (percent <= 40) return '😠';
  else if (percent <= 70) return '🙂';
  else return '😃';
}

updateProgressFromX(x: number) {
  if (!this.progressWrapper) return;
  const wrapper = this.progressWrapper.nativeElement as HTMLElement;
  const rect = wrapper.getBoundingClientRect();
  let percent = (x - rect.left) / rect.width;
  percent = Math.min(1, Math.max(0, percent));
  this.progressValue = percent;
}

startDrag(event: MouseEvent) {
  this.isDragging = true;
  this.updateProgressFromX(event.clientX);
}

onDrag(event: MouseEvent) {
  if (this.isDragging) this.updateProgressFromX(event.clientX);
}

endDrag() {
  this.isDragging = false;
}

}
