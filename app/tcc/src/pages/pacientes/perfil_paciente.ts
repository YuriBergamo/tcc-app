import {Component, OnInit} from "@angular/core";
import {ViewController,
        NavController,
        NavParams, 
        ToastController} from 'ionic-angular';
import {PacienteService} from '../../services/PacienteService';
import {UsuarioService} from '../../services/UsuarioService';
import {DomSanitizer} from '@angular/platform-browser';
import { LoadingController } from 'ionic-angular';
import {Storage} from "@ionic/storage";


@Component({
    selector:"perfil-paciente",
    templateUrl:"perfil_paciente.html"
})

export class PerfilPacienteComponent{

    
    public usuarioLogado;
    public paciente;
    public questionarios;

    constructor(private navController:NavController, 
                private usuarioService:UsuarioService,
                public viewCtrl: ViewController,
                private navParams:NavParams,
                public storage: Storage,
                public loadingCtrl: LoadingController,
                private sanitizer:DomSanitizer,
                public toastController:ToastController,
                public pacienteService:PacienteService){
            
            
    }

    ngOnInit(){
        let loader = this.loadingCtrl.create({
            content: "Buscando questionarios...",            
        });
        loader.present();
        this.usuarioLogado = this.navParams.get('usuarioLogado');
        this.paciente = this.navParams.get('paciente');
        this.pacienteService.buscarQuestionarios(this.paciente._id).subscribe(
            (sucess)=>{
                this.questionarios = sucess;
                console.log("questionarios", sucess);
                loader.dismiss();
                
            },
            (error)=>console.log("ERRO PAC", error)
        );                              
    }
  

    public getImagem(profissional){
        return this.sanitizer.bypassSecurityTrustUrl("data:image/pngr;utf8;base64,"+ this.paciente.foto);        
    }

    public addQuestionario(){

    }
}