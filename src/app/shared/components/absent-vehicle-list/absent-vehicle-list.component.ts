import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { IonIcon } from "@ionic/angular/standalone";
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { CommonModule } from '@angular/common';
import { AbsentVehicle } from '../../services/delivery';
import { carOutline } from 'ionicons/icons';

@Component({
  selector: 'app-absent-vehicle-list',
  templateUrl: './absent-vehicle-list.component.html',
  styleUrls: ['./absent-vehicle-list.component.scss'],
  imports:[ CommonModule,FormsModule, IonIcon],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AbsentVehicleListComponent  implements OnInit {

  constructor() { 
    addIcons({carOutline})
  }

  ngOnInit() {}
  @Input() vehicles: AbsentVehicle[] = [];
  @Input() total = 0;

  trackByVeh(index: number, item: AbsentVehicle) {
    return item.vehNo;
  }

}
