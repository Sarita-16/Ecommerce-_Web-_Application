import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {

  productList: Array<any> = [];
  categoryName: string = '';
  categoryType: string | null = '';
  wishlist: number[] = [];
  cartlist: number[] = [];

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.categoryType = sessionStorage.getItem("categoryType")
    this.loadProducts();
    this.loadWishlist();
    this.loadCartlist();
    this.categoryName = this.categoryType == 'MirrorworkLehengas' ? 'Mirrorwork Lehengas' : this.categoryType == 'LongCholiLehengas' ? 'Long Choli Lehengas' : this.categoryType == 'WeddingLehengas' ? 'Wedding Lehengas' : 'Jacket Style Lehengas';
  }

  loadProducts() {
    this.httpService.viewProduct().subscribe((products) => {
      for (var r in products) {
        if (products[r].categoryType === this.categoryType)
          this.productList.push(products[r]);
      }
      //this.productList = products;
    })
  }

  loadWishlist() {
    this.httpService.getWishlistIDs().subscribe(productIds => {
      this.wishlist = productIds
    })
  }

  loadCartlist() {
    this.httpService.getCartlistIDs().subscribe(productIds => {
      this.cartlist = productIds
    })
  }

}
