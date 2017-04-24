import {Component} from "@angular/core";
import {ViewController,NavController, NavParams, ToastController} from 'ionic-angular';
import {UsuarioService} from '../../services/UsuarioService';
import {DomSanitizer} from '@angular/platform-browser';
import { LoadingController } from 'ionic-angular';
import {Storage} from "@ionic/storage";


@Component({
    selector:"vincular-profissional",
    templateUrl:"vincular_profissional.html"
})

export class VincularProfissionalComponent{

    public listaProfissionais =[];
    public usuarioLogado;
    public emailProfissional:String; 

    constructor(private navController:NavController, 
                private usuarioService:UsuarioService,
                public viewCtrl: ViewController,
                private navParams:NavParams,
                public storage: Storage,
                public loadingCtrl: LoadingController,
                private sanitizer:DomSanitizer,
                public toastController:ToastController){
            
            this.usuarioLogado = JSON.parse(this.navParams.get('usuarioLogado'));
    }

    public procurarProfissional(){
        let loader = this.loadingCtrl.create({
            content: "Buscando profissional...",            
        });
        loader.present();
        if(this.emailProfissional != null){
            this.usuarioService.buscarProfissional(this.emailProfissional).subscribe(
                (sucess)=>{
                    loader.dismiss();
                    this.listaProfissionais = sucess;
                },
                (error)=>{
                    loader.dismiss();
                }
            )       
        }
    }

    public cancelar(){
        this.viewCtrl.dismiss();
    }
    public vincular(profissional){
        let loader = this.loadingCtrl.create({
            content: "Vinculando profissional...",            
        });
        loader.present();
        this.usuarioService.vincularProfissional(this.usuarioLogado._id, profissional._id).subscribe(
            (sucess)=>{
                console.log("SUCESS VINC", sucess);
                this.storage.set('user', JSON.stringify(sucess)).then(() => {                                                
                    loader.dismiss();
                    let toast = this.toastController.create({
                        message: 'Profissional vinculado com sucesso!',
                        duration: 3000,
                        position:"bottom"
                    });
                    toast.present();
                    this.cancelar();
                });                    
                
                
            },
            (error)=>{
                console.log("ERROR VINCULAR", error);
                loader.dismiss();
            }
        )
    }

    public getImagem(profissional){
        return this.sanitizer.bypassSecurityTrustUrl("data:image/pngr;utf8;base64,"+ profissional.foto);        
    }
}