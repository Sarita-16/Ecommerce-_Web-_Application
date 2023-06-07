import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  wishList: Array<any> = [];
  isUserLoggedIn: any;

  constructor(private httpService: HttpService, private router: Router) {}

  ngOnInit(): void {
    this.httpService.currentUser.subscribe(value => {
      this.isUserLoggedIn = value;
    })
    if(this.isUserLoggedIn){
      this.getWishlist();
    }
  }
  getWishlist = () => {
    this.httpService.getWishlist().subscribe({
      next: (res) => {
        this.wishList = res;
      }
    })
  }
  removeFromWishlistPage = (id: number) =>{
    this.httpService.removeFromWishlist(id).subscribe({
      next: (res) => {
        this.getWishlist()
      }
    })
  }
  handleLogin(){
    this.router.navigate(['/login'])
  }
}
