import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoinDetailComponent } from './components/coin-detail/coin-detail.component';
import { CoinListComponent } from './components/coin-list/coin-list.component';

const routes: Routes = [
  {path:'',redirectTo:'list',pathMatch:'full'},
  {path:'list',component:CoinListComponent},
  {path:'details/:id',component:CoinDetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
