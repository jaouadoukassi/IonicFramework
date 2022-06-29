import { AlertController, NavController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Client, NgxSoapService } from 'ngx-soap';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';





@Injectable({
  providedIn: 'root'
})


export class DataService {
  client: Client;
  rest: boolean;
  msgError: string;
  //pConnection: string =
  operaciones: any;
  private clientReady = new BehaviorSubject(false); // el cliente tiene que estar en false 'no se ejecuta' al principio.



  constructor(private soap: NgxSoapService, public alertController: AlertController, private http: HttpClient, private storage: Storage){
    //loginform: FormGroup;
    this.soap.createClient('./assets/fichajewsld/wcffichapp.wsdl')
    //this.soap.createClient('http://192.168.1.222/svcFichApp.svc?singleWsdl')
    .then(client => {
      console.log('client: ', client);
      this.client = client;
      this.clientReady.next(true); // true cúando el cliente está inicializado
    });

  }


  //CREAR UN STORAGE
   init() {
    this.storage.create();
  }

  public set(key: string, value: any) {

  }

//////////////////////////////////////////////////////////////////////////////////////////////

  clienState() {
    console.log('clienteState111');
    return this.clientReady.asObservable(); // devuelve el estado del cliente.
  }
//////////////////////////////////////////////////////////////////////////////////////////////
   //la llamada al web service.

  _doLogin(pUserName: string, pPass: string) {

    console.log('____dologin2__');
    this.rest = true;
    pUserName = pUserName;
    pPass = pPass;
    const pconnt = 'DvRMYj6Bxhdk7Nk5dey127202206';

    return this.client.call('doLogin', { pUserName, pPass, pconnt }).pipe(
      map(data => {
        console.log("DATA", data)
        return data.result.doLoginResult;
      })
      )
      //.subscribe({
      //  next(position) {
      //    console.log('Current Position: ', position);
      //  },
      //  error(msg) {
      //    console.log('Error Getting Location: ', msg);
      //  }
      //});


  }
  /**
   * pipe(
        map(data => {
        console.log('doLogin______2', this.rest);
         console.log('doLogin______3', data.result.doLoginResponse.pUserName.pPass);
        return data.result.doLoginResponse.pUserName.pPass;

      })
    );*/

////////////////////////////////////////////////////////////////////////////////////////////////

  doUserFich(

    pUsername: string,
    pPass: string,
    pFichaInicio: string,
    pFichafin: string,
    esInicio: string,
    pconcept: string,
    pLocationInicio: string,
    pLocationFin: string) {

    this.rest = true;
    return this.rest;
    const pconnt = 'DvRMYj6Bxhdk7Nk5dey105202218';
    let params = new URLSearchParams();
    params.append('pConnectionKey', pconnt),
          params.append('pUsername', pUsername),
          params.append('pPass', pPass),
          params.append('pFichaInicio', pFichaInicio);
          params.append('pFichafin', pFichafin);
          params.append('esInicio', esInicio);
          params.append('pconcept', pconcept);
          params.append('pLocationInicio', pLocationInicio);
          params.append('pLocationFin', pLocationFin);
          console.log('_________________________________________')
          console.log('parametros', params);

    return this.client.call('doUserFich', params).subscribe(data => console.log("___data___", data))

  }


  doUserOpenFich(pUsername: string, pPass: string)
  {
    let operaciones: string[];
 return  operaciones = [
      'Utilizar funciones',
      'Pantalla Login Fichaje',
      'Migrar aplicación de fichaje a IONIC',
      'Crear la llamada al web service SOAP',
      'Probar la llamada al web service SOAP',
      'Asignar la llamada al web service SOAP',
    ];
    //return operaciones;
    const pconnt = 'DvRMYj6Bxhdk7Nk5dey105202218';
    let params = new URLSearchParams();

    params.append('pConnectionKey', pconnt);
    params.append('pUsername', pUsername);
    params.append('pPass', pPass);
    console.log('_________________________________________')
    console.log('parametros', params);

    return this.client.call('getOpenFich', params)
    .pipe(
      map(data => {
        console.log('doLogin______2', this.rest);
        console.log('doLogin______3', data.result.getOpenFichResponse.params);
        return data.result.getOpenFichResponse.params;

      })
    );

  }

  ///////////////////////////////////////////////////////////////////////////////////////////////

  getUserOpenFich(pUserName: string, pPass: string) {
    let params = new URLSearchParams();
    params.append('pUsername', pUserName);
    params.append('pPass', pPass);

    return this.client.call('getUserOpenFich', params)
      .subscribe(data => console.log("___data___", data))
  }
   }




