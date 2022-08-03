import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CryptApiService } from 'src/app/services/crypt-api.service';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { CurrencyService } from 'src/app/services/currency.service';



@Component({
  selector: 'app-coin-detail',
  templateUrl: './coin-detail.component.html',
  styleUrls: ['./coin-detail.component.scss']
})

export class CoinDetailComponent implements OnInit {
  coinData: any;
  coinId!: string;
  days: number = 1;
  currency: string = "INR";

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: `Price Trends`,
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: '#009688',
        pointBackgroundColor: '#009688',
        pointBorderColor: '#009688',
        pointHoverBackgroundColor: '#009688',
        pointHoverBorderColor: '#009688',

      }
    ],
    labels: []
  };
  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      point: {
        radius: 1
      }
    },

    plugins: {
      legend: { display: true },
    }
  };
  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) myLineChart !: BaseChartDirective;

  constructor(private api: CryptApiService, private route: ActivatedRoute, private csy: CurrencyService) { }

  ngOnInit(): void {
    this.route.params.subscribe((data: any) => {
      this.coinId = data['id'];
    })
    this.getCoinData();
    this.getDataForGraph(this.days);
    this.csy.getCurrency().subscribe((data) => {
      this.currency = data;
      this.getDataForGraph(this.days);
      this.getCoinData();
    })
  }

  getCoinData() {
    this.api.getCurrencyById(this.coinId).subscribe((resp: any) => {
      // this.coinData = resp;
      // console.log(this.coinData);
      if (this.currency === "USD") {
        resp.market_data.current_price.inr = resp.market_data.current_price.usd;
        resp.market_data.market_cap.inr = resp.market_data.market_cap.usd;
      }
      resp.market_data.current_price.inr = resp.market_data.current_price.inr;
      resp.market_data.market_cap.inr = resp.market_data.market_cap.inr;
      this.coinData = resp;

    })
  }

  getDataForGraph(noOfDays:number) {
    this.days = noOfDays;
    this.api.getGraphicalCurrencyData(this.coinId, this.currency, this.days).subscribe((data: any) => {
      setTimeout(() => {
        this.myLineChart.chart?.update();
      }, 200);
      this.lineChartData.datasets[0].data = data.prices.map((a: any) => {
        return a[1];
      })
      this.lineChartData.labels = data.prices.map((a: any) => {
        let date = new Date(a[0]);
        let time = date.getHours() > 12 ? `${date.getHours() - 12}:${date.getMinutes()} PM` :
          `${date.getHours()}:${date.getMinutes()} AM`
        return this.days === 1 ? time : date.toLocaleTimeString();
      })
    })
  }

}
