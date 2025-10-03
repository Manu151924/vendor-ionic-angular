import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonItem, IonLabel, IonButton, IonInput, ToastController, IonNote } from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonButton, IonLabel, IonItem, IonContent, IonInput, IonNote,
    CommonModule, FormsModule
  ]
})
export class LoginPage implements OnInit {
  constructor(private router: Router, private toastCtrl: ToastController) {}

  ngOnInit() {}

  email: string = '';
  otp: string = '';
  otpDisabled: boolean = true;
  errorMessage: string = '';

  async showToast(message: string, color: string = 'danger') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color,
      position: 'bottom'
    });
    await toast.present();
  }

  login() {
    if (this.email === 'test@test.com' && this.otp === '123456') {
      this.router.navigate(['/home']);
    } else {
      this.errorMessage = 'Invalid email or OTP';
      this.showToast('Invalid credentials, try again');
    }
  }

  otpSend() {
    if (!this.email) {
      this.errorMessage = 'Please enter your email';
      this.showToast('Please enter email');
    } else {
      this.errorMessage = '';
      this.otpDisabled = false;
      this.showToast('OTP sent to your email', 'success');
    }
  }
}
