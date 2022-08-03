import { Component, OnInit } from '@angular/core';
import { CurrencyService } from './services/currency.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Crypteck';

  selectedCurrency!:string;

  constructor(private csyService:CurrencyService) {

  }

  ngOnInit(): void {
        
  }

  sendCurrency(resp:string){
    // console.log(resp);
    this.csyService.setCurrency(resp);
  }


}
