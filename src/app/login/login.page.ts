import { DataService } from './../services/data.service';
import { Component, OnInit, Pipe, Injectable  } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, FormsModule, FormBuilder } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';





@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  usuario: any;
  pwd: string;
  msg: string;
  msgErr: string;
  loginform: FormGroup;
  
  private _storage: Storage | null = null;

  constructor(
    private storage: Storage,
    private dataservice: DataService,
    public fb: FormBuilder,
    public alertController: AlertController,
    public navCtl: NavController) {


    this.loginform = this.fb.group({
      'username': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required)
    });
    this.init();
    
  }


  ngOnInit() {
    this.dataservice.clienState().subscribe(ready => {
      if (ready) {
       
      }
    })
   
  }
  // ENVIAR DATOS AL BOTON DE LOGIN
  onSubmit(form) {
   //const form = this.loginform.value;
    
    
    
  }




  // INICIAR EL LOCALSTORAGE 
  async init() {    
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  console.log('stooorage', this._storage)
  }


  async _doUserLogin() {
     this.msgErr= this.dataservice.msgError,
    console.log('___doooooogiin_1');     
    //this.dataservice._doLogin()
    let resulatado;
    const form = this.loginform.value;  //recibir datos del usuario.
    

 


    console.log('username:', form.username, 'Password:', form.password, 'resultado:', resulatado );
    //resultado !== true
    //this.dataservice._doLogin(form.username, form.password) !== true
    if (this.dataservice._doLogin(form.username, form.password) !== form.usuario && form.password) {
        const alert = await this.alertController.create({
          subHeader: 'Datos Incorrectos',
          message: 'El Usuario o el password Incorrecto',
          buttons: ['Aceptar']
        });
      console.log('___doooooogiin_________4');
      await alert.present();
      
     } else {
        //CREAR LA BASE DE DATOS LOCAL.
       //ASIGNAR LOS DATOS
       this._storage.set('username', form.username);
       this._storage.set('pwd', form.password);
      this.navCtl.navigateRoot('/user');     
     }
    
  }

      
  }

