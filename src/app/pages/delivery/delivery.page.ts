import { ChangeDetectionStrategy, Component, inject, OnInit, ViewChild } from '@angular/core';
import { IonContent, IonCard, IonDatetime, IonModal, IonItem, IonIcon , IonSelect,IonSelectOption, IonNote, IonButton, IonToolbar, IonFooter, IonButtons, IonList, IonLabel } from "@ionic/angular/standalone";
import { Color, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { MatNativeDateModule } from '@angular/material/core'; 
import { FormsModule } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
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
  imports: [ IonContent, IonCard, IonItem,IonModal,MatDatepickerModule,MatFormFieldModule,IonToolbar, IonFooter, IonButtons,MatInputModule,MatNativeDateModule, IonIcon, IonSelect, IonSelectOption, IonNote, IonButton, FormsModule, NgxChartsModule, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeliveryPage implements OnInit {

  cities: string[] = ['Delhi', 'Mumbai', 'Hyderabad', 'Chennai'];
  calendarOpen = false;
  selectedDate!: Date;
  tempSelectedDate!: Date;
  displayDate: string = 'Today';
     selectedMonths: Date = new Date();;

  maxDate!: Date;
  minDate!: Date;
  selectedCity: string = this.cities[0];
  selectedMonth: Date = new Date(); 
  monthPickerOpen = false;
  availableMonths: string[] = [];
  validMonths: string[] = []; 
  private toastController = inject(ToastController);
  @ViewChild('picker') datepicker!: MatDatepicker<Date>;
    @ViewChild('monthPicker') monthPicker!: MatDatepicker<Date>;

 
  barData = [
    { name: 'DWARKA', value: 100 },
    { name: 'KAROLBAGH', value: 80 },
    { name: 'UTTAM NAGAR', value: 55 },
    { name: 'MAHIPALPUR', value: 40 },
    { name: 'VASANTKUNJ', value: 32 }
  ];
  ngOnInit(): void {
    this.selectedMonths = this.today;
    this.setDateRange();
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
    this.updateDisplayedData();
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

  this.availableMonths = [];
  for (let m = 0; m <= currentMonth; m++) {
    this.availableMonths.push(`${monthNames[m]}-${currentYear.toString().slice(-2)}`);
  }
  }

  openCalendar() {
    this.tempSelectedDate = this.selectedDate; 
    this.calendarOpen = true;
  }

  onModalDidPresent() {
    if (this.datepicker) {
      this.datepicker.open();
    }
  }
  chosenMonthHandler(normalizedMonth: Date, datepicker: MatDatepicker<Date>) {
    this.selectedMonth = normalizedMonth;
    datepicker.close();
    this.loadDataForMonth(this.selectedMonth);
  }
  formatMonth(date: Date): string {
    return date.toLocaleString('default', { month: 'short', year: '2-digit' });
  }


 cancelDate() {
    this.tempSelectedDate = this.selectedDate;
    this.displayDate = this.formatDisplayDate(this.selectedDate);
    this.calendarOpen = false;
  }
    onDateSelect(date: Date) {
    this.tempSelectedDate = date;
    this.displayDate = this.formatDisplayDate(date); // live update
  }

    confirmDate() {
    this.selectedDate = this.tempSelectedDate;
    this.calendarOpen = false;
  }

  onDateChange(event: any) {
    this.tempSelectedDate = event.value;            // Update temp date
    this.displayDate = this.formatDisplayDate(this.tempSelectedDate); // Update button dynamically
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


  updateDisplayed() {
    console.log('Load data for:', this.selectedDate.toDateString());
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



  async showToast(message: string) {
  const toast = await this.toastController.create({
    message,
    duration: 2000,
    color: 'warning',
    position: 'top'
  });
  toast.present();
  }
formatMonthYear(date: Date): string {
  const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${monthNames[date.getMonth()]}-${date.getFullYear().toString().slice(-2)}`;
}
  openMonthPicker() {
    if (this.monthPicker) {
      this.monthPicker.open();
    }
  }


isFutureMonth(monthStr: string): boolean {
  const [mName, yStr] = monthStr.split('-');
  const monthIndex = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].indexOf(mName);
  const year = 2000 + parseInt(yStr); // e.g., "25" -> 2025
  const selectedDate = new Date(year, monthIndex, 1);

  return selectedDate > this.today;
}

// Load month data
// loadDataForMonth(monthStr: string) {
//   if (this.isFutureMonth(monthStr)) {
//     this.selectedMonth = this.formatMonthYear(this.today);
//     this.showToast('Future months cannot be selected');
//     return;
//   }

//   // Example chart data
//   this.pieChartData = [
//     { name: 'Delivered', value: 370 },
//     { name: 'Booked', value: 20 }
//   ];
// }
  loadDataForMonth(date: Date) {
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    console.log(`Loading data for: ${month}-${year}`);
    // Add your chart/data logic here
    this.pieChartData = [
    { name: 'Delivered', value: 370 },
    { name: 'Booked', value: 20 }
  ];
  }
}
