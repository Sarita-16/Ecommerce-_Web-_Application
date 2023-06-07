import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  @Input() productItem: any;
  @Input() isWishlisted!: boolean;
  @Input() isAddedToCart!: boolean;

  wishlistedID: string = '';
  categoryType: string | null = '';
  isUserLoggedIn: any;

  constructor(private httpService: HttpService, private router: Router) { }

  ngOnInit(): void {
    this.categoryType = sessionStorage.getItem("categoryType");
    this.httpService.currentUser.subscribe(value => {
      this.isUserLoggedIn = value;
    })
  }

  handleAddToWishlist = (p_id: string) => {
    if (this.isUserLoggedIn) {
      this.wishlistedID = p_id;
      this.httpService.addToWishlist(this.productItem).subscribe({
        next: (res) => {
          this.isWishlisted = true;
        }
      })
    } else {
      this.router.navigate(['/login'])
    }
  }

  handleRemoveFromWishlist = (p_id: string) => {
    this.httpService.removeFromWishlist(this.productItem.id).subscribe({
      next: (res) => {
        this.isWishlisted = false;
      }
    })
  }

  handleAddToCart = (p_id: string) => {
    if (this.isUserLoggedIn) {
      this.httpService.addToCartlist(this.productItem).subscribe({
        next: (res) => {
          this.isAddedToCart = true;
        }
      })
    } else {
      this.router.navigate(['/login'])
    }
  }

  handleGoToCart = () => {
    this.router.navigate(['/cart']);
  }

}
