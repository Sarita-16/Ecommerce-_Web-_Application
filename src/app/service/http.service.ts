import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})

export class HttpService {
  // Define API
  // private apiURL = 'http://localhost:8080';
  private apiURL = 'http://localhost:3000';
  constructor(private httpClient: HttpClient) { }

  public currentUser: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public categoryType: BehaviorSubject<any> = new BehaviorSubject<any>("");

  // Http Options
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  // Sign up 
  registerUser(reqBody: any): Observable<any> {
    return this.httpClient
      .post<any>(
        this.apiURL + '/registeruser',
        reqBody,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // Log in
  loginUser(): Observable<any> {
    return this.httpClient
      .get<any>(
        this.apiURL + '/registeruser',
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // View product
  viewProduct(): Observable<any> {
    return this.httpClient
      .get<any>(
        this.apiURL + '/productList',
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  //Add to wishlist
  addToWishlist(reqBody: any): Observable<any> {
    return this.httpClient
      .post<any>(
        this.apiURL + '/wishlist',
        reqBody,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // Remove from wishlist 
  removeFromWishlist(id: any): Observable<any> {
    return this.httpClient
      .delete<any>(
        this.apiURL + '/wishlist/' + id,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  //Get wishlist item ID
  getWishlistIDs(): Observable<any> {
    return this.httpClient
      .get<any>(
        this.apiURL + '/wishlist',
        this.httpOptions
      )
      .pipe(map((result: any[]) => {
        let productIds: any = [];
        result.forEach(item => productIds.push(item.id))
        return productIds;
      }), retry(1), catchError(this.handleError));
  }

  //Get wishlist
  getWishlist(): Observable<any> {
    return this.httpClient
      .get<any>(
        this.apiURL + '/wishlist',
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  //Get cartlist item ID
  getCartlistIDs(): Observable<any> {
    return this.httpClient
      .get<any>(
        this.apiURL + '/cartList',
        this.httpOptions
      )
      .pipe(map((result: any[]) => {
        let productIds: any = [];
        result.forEach(item => productIds.push(item.id))
        console.log("productIds",productIds)
        return productIds;
      }), retry(1), catchError(this.handleError));
  }

  //Get cartlist
  getCartList(): Observable<any> {
    return this.httpClient
      .get<any>(
        this.apiURL + '/cartList',
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // Remove from cartlist 
  removeFromCartlist(id: any): Observable<any> {
    return this.httpClient
      .delete<any>(
        this.apiURL + '/cartList/' + id,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  //Add to cartlist
  addToCartlist(reqBody: any): Observable<any> {
    return this.httpClient
      .post<any>(
        this.apiURL + '/cartList',
        reqBody,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // Error handling
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    // window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}