import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { NgxSoapModule } from 'ngx-soap';
import { DataService } from './services/data.service';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Drivers } from '@ionic/storage';



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
   
    //HttpHeaders,
    NgxSoapModule,
    IonicStorageModule.forRoot({
      name: '__mydbLocal__1',
      driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
    })
    
  ],
  providers: [{    
    provide: RouteReuseStrategy,
    useClass: IonicRouteStrategy
  },
    {provide: DataService}  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
