import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { CryptApiService } from 'src/app/services/crypt-api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Route, Router } from '@angular/router';
import { CurrencyService } from 'src/app/services/currency.service';


@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html',
  styleUrls: ['./coin-list.component.scss']
})
export class CoinListComponent implements OnInit {

  currency: string = "INR";
  bannerData: any[] = [];
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['symbol', 'current_price', 'price_change_percentage_24h', 'market_cap'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api: CryptApiService, private route: Router, private csy: CurrencyService) { }

  ngOnInit(): void {
    this.getAllData();
    this.getBannerData();
    this.csy.getCurrency().subscribe((data: any) => {
      this.currency = data;
      this.getAllData();
      this.getBannerData();
    })
  }

  getBannerData() {
    this.api.getTrendingCurrency(this.currency).subscribe((resp: any) => {
      console.log(resp);
      this.bannerData = resp;

    })
  }

  getAllData() {
    this.api.getCurrency(this.currency).subscribe((resp: any) => {
      console.log(resp);
      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  goToDetails(row: any) {
    this.route.navigate(['details', row.id]);
  }

}
