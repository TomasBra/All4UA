import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavbarComponent} from './navbar/navbar.component';
import {RefugeeComponent} from './refugees/refugee.component';
import {HttpClientModule} from '@angular/common/http';
import {DriversComponent} from './drivers/drivers.component';
import {AddPickupPostComponent} from './add-pickup-post/add-pickup-post.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UpdateRefugeeComponent } from './update-refugee/update-refugee.component';
import { AddDriverComponent } from './add-driver/add-driver.component';
import { UpdateDriverComponent } from './update-driver/update-driver.component';
import { HomeProvidersComponent } from './home-providers/home-providers.component';
import { UpdateHomeProviderComponent } from './update-home-provider/update-home-provider.component';
import { AddHomeProviderComponent } from './add-home-provider/add-home-provider.component';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RefugeeComponent,
    DriversComponent,
    AddPickupPostComponent,
    UpdateRefugeeComponent,
    AddDriverComponent,
    UpdateDriverComponent,
    HomeProvidersComponent,
    UpdateHomeProviderComponent,
    AddHomeProviderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
