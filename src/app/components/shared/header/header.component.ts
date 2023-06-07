import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  activeUser: any;
  userDetails = sessionStorage.getItem('user-identity');
  userDetailsFromSession: any;

  constructor(private router: Router, private httpService: HttpService) {
    if(this.userDetails){
      this.userDetailsFromSession = JSON.parse(this.userDetails);
      this.httpService.currentUser.next(this.userDetailsFromSession);
    }
    this.httpService.currentUser.subscribe(value => {
      this.activeUser = value;
      console.log("this.activeUser", this.activeUser)
    });
    
    console.log("this.userDetailsFromSession",this.userDetailsFromSession)
  }

  ngOnInit(): void {

  }

  onLogin = () => {
    this.router.navigate(['/login']);
  }

  onLogOut = () => {
    sessionStorage.removeItem("user-identity");
    this.httpService.currentUser.next(null);
  }

}
