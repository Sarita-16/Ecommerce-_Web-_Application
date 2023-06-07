import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/service/http.service';
import ConfirmPasswordValidation from '../../shared/validator/confirm-password.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm !: FormGroup;
  isSuccess: boolean = true;

  constructor(private formBuilder: FormBuilder, private httpService: HttpService, private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z]+$')]],
      phone_no: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      emailid: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(8)]],
    },
      {
        validators: [ConfirmPasswordValidation.match('password', 'confirmPassword')]
      })
  }
  get f(){
    return this.signupForm.controls;
  }
  onSignUp = () => {
    this.httpService.registerUser(this.signupForm.value).subscribe(
      {
        next: (v) => {
          this.isSuccess = true;
          this.signupForm.reset();
          alert("Registration Successful!!")
          this.router.navigate(['/login']);
        },
        error: (e) => {
          this.isSuccess = false;
          console.error(e)
        }
      }
    )
  }

}
