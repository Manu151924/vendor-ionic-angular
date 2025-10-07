import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, IonCard, IonItem, IonIcon , IonSelect,IonSelectOption, IonNote, IonButton, IonToolbar, IonFooter, IonButtons, IonText, IonModal } from "@ionic/angular/standalone";
import { Color, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { MatNativeDateModule } from '@angular/material/core'; 
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, FormsModule , } from '@angular/forms';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { formatDisplayDate, formatMonthYearShort } from 'src/app/shared/utilities/date-utils';
import { AbsentVehicle, Delivery, TripVehicle } from 'src/app/shared/services/delivery';
import { TripStatusTableComponent } from "src/app/shared/components/trip-status-table/trip-status-table.component";
import { AbsentVehicleListComponent } from 'src/app/shared/components/absent-vehicle-list/absent-vehicle-list.component';
import { PieChartComponent } from 'src/app/shared/components/pie-chart/pie-chart.component';
import { ProgressSliderComponent } from 'src/app/shared/components/progress-slider/progress-slider.component';
import { addIcons } from 'ionicons';
import { calendar, carOutline, chevronDownOutline, chevronUpOutline, document, location, shieldCheckmark } from 'ionicons/icons';



@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.page.html',
  styleUrls: ['./delivery.page.scss'],
  imports: [IonModal, 
    IonText, 
    IonContent, 
    IonCard, 
    IonItem, 
    MatDatepickerModule, 
    MatFormFieldModule, 
    ReactiveFormsModule,
    MatInputModule, 
    MatNativeDateModule, 
    IonIcon, 
    IonSelect, 
    IonSelectOption, 
    IonNote, 
    IonButton, 
    FormsModule, 
    NgxChartsModule, 
    CommonModule, 
    TripStatusTableComponent, 
    PieChartComponent, 
    AbsentVehicleListComponent, 
    ProgressSliderComponent,
    IonToolbar, 
    IonFooter, 
    IonButtons],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeliveryPage implements OnInit {

  form: FormGroup;
  cities = ['Delhi', 'Mumbai', 'Hyderabad', 'Chennai'];
  @ViewChild('monthPicker') monthPicker!: MatDatepicker<Date>;

  today = new Date();
  minDate!: Date;
  maxDate!: Date;
  availableMonths: string[] = [];
  selectedMonth: Date = new Date();
  calendarOpen = false;
  selectedDate: Date = new Date(); 
  tempSelectedDate: Date = new Date();

  tripVehicles$!: Observable<TripVehicle[]>;
  absentVehicles$!: Observable<AbsentVehicle[]>;
  barData$ = this.service.getBarData();
  pieChartData$ = this.service.getPieChartData();

  displayedLimit = 5;
  isExpanded = false;
  progressValue = 0;

  colorScheme: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#C62828', '#F9A825', '#43A047', '#81C784', '#66BB6A']
  };

  colorSchemeForPie: Color = {
    name: 'pieScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#06B4A2', '#FF8A0D']
  };

  constructor(private fb: FormBuilder, private service: Delivery) {
    this.form = this.fb.group({
      selectedCity: [this.cities[0]],
      selectedDate: [new Date()],
      selectedMonth: [new Date()]
    });
    addIcons({location,calendar,document,carOutline,shieldCheckmark,chevronDownOutline,chevronUpOutline})
  }

  ngOnInit(): void {
    this.tripVehicles$ = this.service.getTripVehicles();
    this.absentVehicles$ = this.service.getAbsentVehicles();
    this.setDateRange();
    this.generateAvailableMonths();
  }

  setDateRange() {
    const today = new Date();
    this.maxDate = today;
    const min = new Date();
    min.setMonth(today.getMonth() - 12);
    this.minDate = min;
  }

  generateAvailableMonths() {
    const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const currentYear = this.today.getFullYear();
    const currentMonth = this.today.getMonth();
    this.availableMonths = [];
    for (let m = 0; m <= currentMonth; m++) {
      this.availableMonths.push(`${monthNames[m]}-${currentYear.toString().slice(-2)}`);
    }
  }

 displayDate: string = formatDisplayDate(new Date());

  formatMonth(date: Date) {
    return formatMonthYearShort(date);
  }

  toggleExpansion() {
    this.isExpanded = !this.isExpanded;
    this.displayedLimit = this.isExpanded ? 1000 : 5;
  }
  openMonthPicker() {
    this.monthPicker.open();
  }

  onProgressChange(newVal: number) {
    this.progressValue = newVal;
  }

  trackByVeh(index: number, item: TripVehicle) { return item.vehNo; }
  trackByAbsent(index: number, item: AbsentVehicle) { return item.vehNo; }
  setToday() {
    this.form.get('selectedDate')?.setValue(new Date());
  }
  get selectedCityControl(): FormControl {
  return this.form.get('selectedCity') as FormControl;
}
openCalendar() {
    this.tempSelectedDate = this.selectedDate;
    this.calendarOpen = true;
  }

  onDateSelect(date: Date) {
    this.tempSelectedDate = date;
    this.displayDate = formatDisplayDate(date);
  }

  cancelDate() {
    this.tempSelectedDate = this.selectedDate;
    this.calendarOpen = false;
  }
  confirmDate() {
    this.selectedDate = this.tempSelectedDate;
    this.calendarOpen = false;
  }
  chosenMonthHandler(normalizedMonth: Date, datepicker: MatDatepicker<Date>) {
    this.selectedMonth = normalizedMonth;
    this.form.patchValue({ selectedMonth: normalizedMonth });
    datepicker.close();
  }
}
