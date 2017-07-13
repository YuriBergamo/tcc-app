import {Component, OnInit} from "@angular/core";
import {Usuario} from "../../models/Usuario";
import {UsuarioService} from '../../services/UsuarioService';
import {ModalController, NavController, Events} from 'ionic-angular';
import {VincularProfissionalComponent} from './vincular_profissional';
import {Storage} from "@ionic/storage";
import {DomSanitizer} from '@angular/platform-browser';
import {LoginComponent} from '../login/login';

@Component({
    selector:"config-user",
    templateUrl:'config_user.html'
})

export class ConfigUserComponent{

    public usuarioLogado:Usuario = new Usuario();

    ngOnInit(){
        this.storage.get('user').then((user) => {            
            this.usuarioLogado = JSON.parse(user);
        });        
    }

    constructor(public usuarioService:UsuarioService, 
                private modalController:ModalController,
                public storage: Storage,
                private sanitizer:DomSanitizer,
                private navController:NavController,
                private events:Events){                    

        
    }

    public vincular(){
        let modalVincular = this.modalController.create(VincularProfissionalComponent, {"usuarioLogado":JSON.stringify(this.usuarioLogado)})
        modalVincular.present();                               
        modalVincular.onDidDismiss(data => {
            this.storage.get('user').then((user) => {            
                this.usuarioLogado = JSON.parse(user);
            });        
        });
    }

    public getAvatar(usuario){
        if(usuario  && usuario.foto){
            return this.sanitizer.bypassSecurityTrustUrl("data:image/png;utf8;base64,"+ usuario.foto);                    
        }        
    }

    public logout(){
        this.storage.set('user', null).then(
            (sucess)=>{
                //remove do local storage
                console.log("logout", sucess);
                //this.navController.setRoot(LoginComponent);
                this.events.publish("logout");
            }
        )
    }


}