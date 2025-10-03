import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IonContent, IonCard, IonDatetime, IonModal, IonItem, IonIcon , IonSelect,IonSelectOption, IonNote, IonButton, IonToolbar, IonFooter, IonButtons } from "@ionic/angular/standalone";
import { Color, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface TripVehicle {
  vehNo: string;
  ofdStatus: string;
  statusColor: string; // CSS class for color
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
export class DeliveryPage {
  // ------------------------------
  // Dropdown
  cities: string[] = ['Delhi', 'Mumbai', 'Hyderabad', 'Chennai'];
  selectedCity: string = this.cities[0];

  // ------------------------------
  // Dates
  selectedDate: Date = new Date();
  tempSelectedDate?: string | string[] | null;
  calendarOpen = false;
  minDate: string;
  maxDate: string;

  // ------------------------------
  // Bar chart (Route Wise WB Count)
  barData = [
    { name: 'Route 1', value: 120 },
    { name: 'Route 2', value: 80 },
    { name: 'Route 3', value: 130 },
  ];

  colorScheme: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#4caf50', '#2196f3', '#ff9800']
  };
  // ------------------------------
  // Trip Status
  allTripVehicles: TripVehicle[] = [
    { vehNo: 'DL01AB1234', ofdStatus: 'OFD', statusColor: 'green', lastUpdated: '10:30 AM' },
    { vehNo: 'MH12XY5678', ofdStatus: 'Delivered', statusColor: 'blue', lastUpdated: '11:10 AM' },
    { vehNo: 'TS09CD9876', ofdStatus: 'Pending', statusColor: 'red', lastUpdated: '09:50 AM' },
    { vehNo: 'DL05EF4444', ofdStatus: 'OFD', statusColor: 'green', lastUpdated: '12:20 PM' },
  ];
  displayedTripVehicles: TripVehicle[] = [];

  // ------------------------------
  // Absent Vehicles
  allAbsentVehicles: AbsentVehicle[] = [
    { vehNo: 'MH20ZZ1111', lastTripDate: '2025-09-28' },
    { vehNo: 'TS07WW9999', lastTripDate: '2025-09-26' },
  ];
  displayedAbsentVehicles: AbsentVehicle[] = [];

  // ------------------------------
  // Expansion toggle
  isExpanded = false;

  // ------------------------------
  // KPI values
  toBeCollected = 52348;
  pendingPods = 3;
  marketVehicleUsage = 3;
  safedropUsage = 76; // %

  // ------------------------------
  // Pie Chart (Month Wise Snapshot)
  pieChartData = [
    { name: 'Delivered', value: 370 },
    { name: 'Un-Delivered', value: 20 }
  ];
  colorSchemeForPie: Color = {
    name: 'pieScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5cb85c', '#d9534f']
  };

  // ------------------------------
  // Progress Bar
  progressValue = 0.6; // 60%

  constructor() {
    const today = new Date();
    this.maxDate = today.toISOString().split('T')[0];
    const min = new Date();
    min.setMonth(today.getMonth() - 1); // one month before
    this.minDate = min.toISOString().split('T')[0];

    // show first few rows initially
    this.updateDisplayedData();
  }

  // ------------------------------
  // Calendar methods
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


  // ------------------------------
  // Toggle expansion for Trip & Absent tables
  toggleExpansion() {
    this.isExpanded = !this.isExpanded;
    this.updateDisplayedData();
  }

  private updateDisplayedData() {
    this.displayedTripVehicles = this.isExpanded
      ? this.allTripVehicles
      : this.allTripVehicles.slice(0, 2);

    this.displayedAbsentVehicles = this.isExpanded
      ? this.allAbsentVehicles
      : this.allAbsentVehicles.slice(0, 1);
  }

  // ------------------------------
  // Progress Bar drag interaction
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
}
