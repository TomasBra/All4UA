import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RefugeeComponent} from './refugees/refugee.component';
import {DriversComponent} from './drivers/drivers.component';
import {AddPickupPostComponent} from './add-pickup-post/add-pickup-post.component';
import {UpdateRefugeeComponent} from './update-refugee/update-refugee.component';
import {AddDriverComponent} from './add-driver/add-driver.component';
import {UpdateDriverComponent} from './update-driver/update-driver.component';
import {HomeProvidersComponent} from './home-providers/home-providers.component';
import {UpdateHomeProviderComponent} from './update-home-provider/update-home-provider.component';
import {AddHomeProviderComponent} from './add-home-provider/add-home-provider.component';

const routes: Routes = [
  {path: 'looking/add', component: AddPickupPostComponent, pathMatch: 'full'},
  {path: 'looking/update/:id', component: UpdateRefugeeComponent, pathMatch: 'full'},
  {path: 'looking/:limit', component: RefugeeComponent},
  {path: 'looking', redirectTo: 'looking/6'},
  {path: '', redirectTo: 'drivers/6', pathMatch: 'full'},
  {path: 'drivers/add', component: AddDriverComponent, pathMatch: 'full'},
  {path: 'drivers/update/:id', component: UpdateDriverComponent, pathMatch: 'full'},
  {path: 'drivers/:limit', component: DriversComponent},
  {path: 'drivers', redirectTo: 'drivers/6'},
  {path: 'homeProviders/add', component: AddHomeProviderComponent, pathMatch: 'full'},
  {path: 'homeProviders/:limit', component: HomeProvidersComponent},
  {path: 'homeProviders/update/:id', component: UpdateHomeProviderComponent},
  {path: 'homeProviders', redirectTo: 'homeProviders/6'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
