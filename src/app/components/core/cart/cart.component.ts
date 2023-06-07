import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartList: Array<any> = [];
  isUserLoggedIn: any;
  totalMRP: number = 0;
  finalAmount: number = 0;
  deliveryCharge: number = 100;

  constructor(private httpService: HttpService, private router: Router) { }

  ngOnInit(): void {
    this.httpService.currentUser.subscribe(value => {
      this.isUserLoggedIn = value;
    })
    if (this.isUserLoggedIn) {
      this.getCartlist()
    }
  }

  getCartlist = () => {
    this.httpService.getCartList().subscribe({
      next: (res) => {
        this.cartList = res;
        this.totalMRP = res.reduce((acc: number, item: any) => {
          return acc + +item.Price;
        }, 0);
      }
    })
  }

  handleRemoveFromCartList = (id: number) => {
    this.httpService.removeFromCartlist(id).subscribe({
      next: (res) => {
        this.getCartlist()
      }
    })
  }

  handleLogin(){
    this.router.navigate(['/login'])
  }

}
