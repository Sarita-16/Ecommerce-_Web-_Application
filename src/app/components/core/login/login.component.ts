import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/service/http.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm !: FormGroup;

  constructor(private formBuilder: FormBuilder, private httpService: HttpService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      emailid: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(8)]]
    })
  }
  get f(){
    return this.loginForm.controls;
  }

  onLogin = () => {
    this.httpService.loginUser().subscribe(
      {
        next: (res) => {
          const user = res.find((item: any)=> {
            return this.loginForm.value.emailid === item.emailid && this.loginForm.value.password === item.password
          }) 
          if(user){
            sessionStorage.setItem('user-identity', JSON.stringify(user));
            this.httpService.currentUser.next(user);
            alert("Login Successful");
            this.loginForm.reset();
            this.router.navigate(['/home']);
          } else {
            alert("User not found");
          }
        },
        error: (e) => { 
          console.error(e);
          alert("User not found");
        }
      }
    )

  }


}
