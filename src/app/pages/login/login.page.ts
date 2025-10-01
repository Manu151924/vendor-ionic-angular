import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonItem, IonLabel, IonButton, IonInput } from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonButton, IonLabel, IonItem, IonContent,IonInput, CommonModule, FormsModule]
})
export class LoginPage implements OnInit {
  constructor(private router: Router) { }

  ngOnInit() {
  }
    email: string = 'test@test.com';
    otp: string ='123456';
    otpDisabled : boolean = true;
    login(){
      if(this.email == 'test@test.com' && this.otp == '123456'){
        this.router.navigate(['/home']);
      }
    }
    otpSend(){
      if(this.email == ''){
        alert ('please enter email')
      } else {
        this.otpDisabled = false;

      }
    }


}
