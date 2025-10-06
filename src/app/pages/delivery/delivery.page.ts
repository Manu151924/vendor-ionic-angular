import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { IonContent, IonCard, IonDatetime, IonModal, IonItem, IonIcon , IonSelect,IonSelectOption, IonNote, IonButton, IonToolbar, IonFooter, IonButtons } from "@ionic/angular/standalone";
import { Color, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { FormsModule } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { CommonModule } from '@angular/common';
import { checkmarkOutline, chevronDownOutline, chevronUpOutline, location, calendar, carOutline, checkboxOutline, shieldCheckmark, document } from 'ionicons/icons';

interface TripVehicle {
  vehNo: string;
  ofdStatus: string;
  statusColor: string; 
  lastUpdated: string;
}

interface AbsentVehicle {
  vehNo: string;
  lastTripDate: string;
}

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.page.html',
  styleUrls: ['./delivery.page.scss'],
  imports :[IonContent,IonCard, IonDatetime, IonModal,IonItem, IonIcon,IonSelect,IonSelectOption, IonNote, IonButton, IonToolbar, IonFooter, IonButtons,FormsModule,NgxChartsModule,CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeliveryPage implements OnInit {

  cities: string[] = ['Delhi', 'Mumbai', 'Hyderabad', 'Chennai'];
  selectedCity: string = this.cities[0];
  selectedDate: Date = new Date();
  tempSelectedDate?: string | string[] | null;
  calendarOpen = false;
  minDate: string;
  maxDate: string;
  selectedMonth: string = ''; 
  validMonths: string[] = []; 
  private toastController = inject(ToastController);
  barData = [
    { name: 'DWARKA', value: 100 },
    { name: 'KAROLBAGH', value: 80 },
    { name: 'UTTAM NAGAR', value: 55 },
    { name: 'MAHIPALPUR', value: 40 },
    { name: 'VASANTKUNJ', value: 32 }
  ];
  ngOnInit(): void {
    this.selectedMonth = this.formatMonthYear(this.today);
    this.loadDataForMonth(this.selectedMonth);
  }

  colorScheme: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#C62828', '#F9A825', '#43A047', '#81C784', '#66BB6A']
  };
  allTripVehicles: TripVehicle[] = [
   { vehNo: '1234', ofdStatus: '16/20', lastUpdated: '12:00', statusColor: 'green' },
    { vehNo: '4321', ofdStatus: '11/17', lastUpdated: '14:00', statusColor: 'green' },
    { vehNo: '7733*', ofdStatus: '12/22', lastUpdated: '10:00', statusColor: 'yellow' },
    { vehNo: '8973', ofdStatus: '10/23', lastUpdated: '09:00', statusColor: 'green' },
    { vehNo: '1287', ofdStatus: '00/24', lastUpdated: '05:00', statusColor: 'red' },
    { vehNo: '1283', ofdStatus: '00/24', lastUpdated: '05:00', statusColor: 'red' }
  ];
  displayedTripVehicles: TripVehicle[] = [];
  allAbsentVehicles: AbsentVehicle[] = [
    { vehNo: 'MH20ZZ1111', lastTripDate: '2025-09-28' },
    { vehNo: 'TS07WW9999', lastTripDate: '2025-09-26' },
  ];
  displayedAbsentVehicles: AbsentVehicle[] = [];
  isExpanded = false;
  toBeCollected = 52348;
  pendingPods = 3;
  marketVehicleUsage = 3;
  safedropUsage = 76; 
  pieChartData = [
    { name: 'Delivered', value: 370 },
    { name: 'Un-Delivered', value: 20 }
  ];
  colorSchemeForPie: Color = {
    name: 'pieScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#06B4A2', '#FF8A0D']
  };
  progressValue = 0; 
  today = new Date();
  constructor() {
    addIcons({checkmarkOutline, location, chevronUpOutline, chevronDownOutline, calendar, carOutline, checkboxOutline, shieldCheckmark, document})
    const today = new Date();
    this.maxDate = today.toISOString().split('T')[0];
    const min = new Date();
    min.setMonth(today.getMonth() - 1); 
    this.minDate = min.toISOString().split('T')[0];
    this.updateDisplayedData();
  }
  openCalendar() {
    this.calendarOpen = true;
  }
  cancelDate() {
    this.calendarOpen = false;
  }
  confirmDate() {
    if (this.tempSelectedDate) {
      const dateStr = Array.isArray(this.tempSelectedDate)
        ? this.tempSelectedDate[0]
        : this.tempSelectedDate;
      this.selectedDate = new Date(dateStr);
    }
    this.calendarOpen = false;
  }
  toggleExpansion() {
    this.isExpanded = !this.isExpanded;
    this.updateDisplayedData();
  }
  private updateDisplayedData() {
    this.displayedTripVehicles = this.isExpanded ? this.allTripVehicles  : this.allTripVehicles.slice(0, 5);
    this.displayedAbsentVehicles = this.isExpanded ? this.allAbsentVehicles : this.allAbsentVehicles.slice(0, 5);
  }
  startDrag(event: MouseEvent) {
    this.updateProgress(event);
  }
  onDrag(event: MouseEvent) {
    if (event.buttons === 1) {
      this.updateProgress(event);
    }
  }

  endDrag() {
    // do nothing, keep value
  }

  private updateProgress(event: MouseEvent) {
    const wrapper = (event.currentTarget as HTMLElement);
    const rect = wrapper.getBoundingClientRect();
    const x = event.clientX - rect.left;
    this.progressValue = Math.min(Math.max(x / rect.width, 0), 1);
  }

  getHappinessFace(): string {
    if (this.progressValue < 0.3) return '😞';
    if (this.progressValue < 0.7) return '🙂';
    return '😄';
  }
  formatMonthYear(date: Date): string {
    const options = { year: '2-digit', month: 'short' } as const;
    return date.toLocaleDateString('en-US', options).replace(',', '');
  }

  isFutureMonth(monthStr: string): boolean {
    const [mon, yr] = monthStr.split('-');
    const yearFull = 2000 + parseInt(yr, 10);
    const monthNumber = new Date(Date.parse(mon + " 1, " + yearFull)).getMonth();
    const monthDate = new Date(yearFull, monthNumber, 1);
    return monthDate > this.today;
  }

  loadDataForMonth(monthStr: string) {
    if (this.isFutureMonth(monthStr)) {
      this.selectedMonth = this.formatMonthYear(this.today);
        this.showToast('Future months cannot be selected');

      return;
    }
    this.pieChartData = [
      { name: 'Delivered', value: 370 },
      { name: 'Booked', value: 20  }
    ];
  }
  async showToast(message: string) {
  const toast = await this.toastController.create({
    message,
    duration: 2000,
    color: 'warning',
    position: 'top'
  });
  toast.present();
  }
}
