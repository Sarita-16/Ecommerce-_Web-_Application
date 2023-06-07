import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/service/http.service';
import * as categoryType from '../../../../assets/json/category-type.json';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  list: any[]=[];
  categoryType: any = (categoryType as any).default;
  
  num: number = 0;
  constructor(private router: Router, private httpService : HttpService) { 
    /* this.list = [
      {
        sno: 1,
        title: "Girl",
        desc: "Traditional Wear",
        active: true
      },
      {
        sno: 2,
        title: "Boy",
        desc: "Active Wear",
        active: true
      },
      {
        sno: 3,
        title: "Women",
        desc: "Plus Size Styles",
        active: true
      },
    ]
    this.list = [
      {
        sno: 1,
        title: "Gown",
        active: true
      },
      {
        sno: 2,
        title: "Lehenga",
        active: true
      },
      {
        sno: 3,
        title: "Palazzo",
        active: true
      }
    ] */
  }

  ngOnInit(): void { 
  }

  onProductView(cName: string){
    sessionStorage.setItem("categoryType",cName)
    this.httpService.categoryType.next(cName);
    this.router.navigate(['/products', cName]);
  }

}
