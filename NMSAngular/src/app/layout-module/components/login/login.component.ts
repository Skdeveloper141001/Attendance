import { Component ,ElementRef,Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { LoginService } from '../../../service/login.service';
import * as cryptoJS from 'crypto-js';
import Swal from 'sweetalert2';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor( private fb: FormBuilder,
    private ds: LoginService,
    private dialogRef: MatDialogRef<LoginComponent>) { }

  loginForm!: FormGroup;
  @ViewChild('captchaContainer', { static: false }) dataContainer!: ElementRef;
  // public apiRootUrl: any = environment.api;
  public captchaKey: any = environment.CAPTCHA_SECRET_KEY;
  public passwordKey: any = environment.PASSWORD_SECRET_KEY;
  public txtCaptcha: any = '';
  public generatedCaptcha: any = "";
  //subs = new SubSink();

  ngOnInit(): void {
    this.createForm();
     this.getCaptcha();
  }

  createForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      captcha: ['', Validators.required]
    });
  }

  getCaptcha() {
     this.ds.getData('captcha').subscribe((res: any) => {
      //if (res.error === false) {
        this.dataContainer.nativeElement.innerHTML = res.data;
        this.generatedCaptcha = res.text;
      //}
    });
  }


  login() {
    if (!this.loginForm.invalid) {
      let txtCaptcha = this.generatedCaptcha; // Captcha text for validation
  
      // Check if entered captcha matches generated captcha
      if (this.loginForm.value.captcha !== txtCaptcha) {
        Swal.fire({
          icon: "error",
          text: "Captcha गलत है, कृपया पुनः प्रयास करें", 
          timer: 5000
        });
        return; 
      }
  
      // Encrypt the password before sending it
      const password = cryptoJS.AES.encrypt(this.loginForm.value.password, this.passwordKey).toString();
      this.loginForm.patchValue({ password: password });
  
      this.ds.postData('user', this.loginForm.value).subscribe(
        (res: any) => {
          console.log("Response:", res);
  
          if (res.error) {
            Swal.fire({
              icon: "error",
              text: res.error.message || "लॉगिन त्रुटि, कृपया पुनः प्रयास करें",
              timer: 5000
            });
          } else if (res.token) {
            localStorage.setItem('token', res.token);
            Swal.fire({
              icon: "success",
              text: res.message || "सफलतापूर्वक लॉगिन!", 
              timer: 3000
            });
  
            // Role-based navigation
            switch (res['role']) {
              // case 1:
              //   this.router.navigate(['/sidebar']);
              //   break;
              // case 2:
              //   this.router.navigate(['/sidebar/studentdetails']);
              //   break;
              // default:
              case 1:
          this.dialogRef.close('success');  // <-- Close dialog with success
          break;
        case 2:
          this.dialogRef.close('success');  // <-- Same for another role
          break;
          default:
                Swal.fire({
                  icon: 'error',
                  text: 'कृपया लॉगिन विवरण जांचें', 
                  timer: 5000
                });
                break;
            }
          }
        },
        (error) => {
          console.error("Login API Error:", error);
          Swal.fire({
            icon: "error",
            text: "सर्वर त्रुटि, कृपया बाद में पुनः प्रयास करें", 
            timer: 5000
          });
        }
      );
    } else {
      console.log("Form is invalid");
    }
  }
  

}
