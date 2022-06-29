import { IonDatetime, NavController } from '@ionic/angular';
import { Component, OnInit,
         Directive, ViewChild, ElementRef,
         ViewRef, Renderer2, HostListener
        } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { DatePipe, NgForOf } from '@angular/common';
import { DataService } from '../services/data.service';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage-angular';
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';
import { Gesture, GestureController } from '@ionic/angular';



@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
  providers: [DatePipe],
})



export class UserPage implements OnInit {
    tasck: any[];
    numberOfClicks = 0;
    myDate = new Date();
    lastUpdated: string;   
    tareas: any;
    data=0;
    usuario: string;
    pwd: string;
   private _storage: Storage | null = null; // LOCALSTORAGE


  @ViewChild('asItem') asItem: ElementRef;  //llamar a un elemento del DOM

  constructor(private dataservice: DataService,
              private storage: Storage,
              private alert: AlertController,
              private datePipe: DatePipe, private el: ElementRef,
              private gestureCtrl: GestureController) {

    this.init()
    this.lastUpdated = this.datePipe.transform(this.myDate, 'yyyy-MM-dd hh:mm');

   }
   
  ngOnInit() {
    console.log('asItem: ', this.asItem)
    this.dataservice.clienState().subscribe(ready => {
      if (ready) {
        this.getOpenFich()
      }
    })
  }


  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
    this.usuario = await this._storage.get('username');
    this.pwd = await this._storage.get('pwd');
  }
//////////////////////////////////////////////////////////////////////////////  

  //DEVUELVE la lista de tareas llamando al WS
  getOpenFich() {

     //LAMADA AL WS
    //TODO sacar user ypass de cookie
    this.tareas = this.dataservice.doUserOpenFich(this.usuario, this.pwd);

  }

//CREA un nuevo fichaje llamando al WS
  getFichCreate() {
    let resultado: boolean
    let pFechafin = this.datePipe.transform(this.myDate, 'yyyy-MM-dd hh:mm');
    let pConcept: string;
    let pLocationInicio: string;
    console.log('fichadel Movil', pFechafin)
    console.log("namestorage", this.usuario);
    console.log("Passwordstorage", this.pwd);
    //TODO sacar user ypass de cookie
    //TODO pconcepto del que tiene seleccionado en slctFicha
    this.dataservice.doUserFich(this.usuario, this.pwd, pFechafin, '', 'true', pConcept, pLocationInicio, '');
   // console.log(this.openfecha)

    if (resultado !== false) {
      console.log('estado: ', resultado)
      this.getOpenFich();
    }
    else {
      this.getOpenFich();
    }
  }
///////////////////////////////////////////////////////////////////////////////////////
  getFichEnd() {
    let resultado: any
    let fechaInicio = this.datePipe.transform(this.myDate, 'yyyy-MM-dd hh:mm:ss');
    let fechaFin = this.datePipe.transform(this.myDate, 'yyyy-MM-dd hh:mm:ss');
    let pConcept: string;
    let pLocationInicio: string;
    let pLocationFin: string;

    //TODO sacar user ypass de cookie
    //TODO pconcepto del que tiene seleccionado en slctFicha
    resultado = this.dataservice.doUserFich(this.usuario, this.pwd, fechaInicio, fechaFin, 'true', pConcept, pLocationInicio, pLocationFin);
    // console.log(this.openfecha) 
    if (resultado !== false) {
      console.log('estado: ', resultado)
    }
    else {
      this.getOpenFich();
    }
  }



  // popup por cada item 
  async _addEvent(item) {
    console.log('------------item')     
    let resultado: any
    let fechaInicio =    this.datePipe.transform(this.myDate, 'yyyy-MM-dd hh:mm:ss');
    let fechaFin    =    this.datePipe.transform(this.myDate, 'yyyy-MM-dd hh:mm:ss'); // LA FECHA DEL MOVIL
    let pConcept: string;
    let pLocationInicio: string;
    let pLocationFin: string;
    
    const alert = await this.alert.create({
      header: 'Finalizar Fichaje',
      subHeader: this.lastUpdated,
      buttons: [
        {
          text: 'Finalizar',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: () => { 
            console.log('Confirm Cancel: blah', fechaInicio );
            resultado = this.dataservice.doUserFich(this.usuario, this.pwd, fechaInicio, fechaFin, 'false', pConcept, pLocationInicio, pLocationFin);
            if (resultado == true) {
              window.location.reload();  // REFRESH PAGE 
            } 

          }
          },
            {
              text: 'Cancelar',
              id: 'confirm-button',
              handler: () => {
                console.log('Cancelar Okay');               
          }
        }
        ]
      });
      await alert.present();        
  }

}
