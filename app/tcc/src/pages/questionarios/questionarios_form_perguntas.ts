import {Component, OnInit} from "@angular/core";
import {Usuario} from "../../models/Usuario";
import {UsuarioService} from '../../services/UsuarioService';
import {Storage} from "@ionic/storage";
import {DomSanitizer} from '@angular/platform-browser';
import {ModalController, 
        LoadingController,
        ActionSheetController,
        NavController,
        NavParams,
        reorderArray,
        ToastController,
        AlertController,
        ViewController} from 'ionic-angular';
import {Questionario} from "../../models/Questionario";
import {Pergunta} from "../../models/Pergunta";
@Component({
    selector:"questionariosFormPerguntas",
    templateUrl:'questionarios_form_perguntas.html'
})

export class QuestionariosFormPerguntasComponent{
    public pergunta:Pergunta = new Pergunta();

    ngOnInit(){
        this.pergunta = this.navParams.get("pergunta");
    }

    constructor(public usuarioService:UsuarioService, 
                private modalController:ModalController,
                public storage: Storage,
                private sanitizer:DomSanitizer,
                public loadingCtrl: LoadingController,
                public actionSheetController:ActionSheetController,
                public navController:NavController,
                public toastController:ToastController,
                public navParams:NavParams,
                public alertController:AlertController,
                public viewCtrl:ViewController){                    
                
    }

    cancelar(){
        this.viewCtrl.dismiss();
    }

    salvar(){
        this.viewCtrl.dismiss({"pergunta":this.pergunta});
    }

    addResposta() {
        let alert = this.alertController.create({
            title: 'Resposta',
            inputs: [
            {
                name: 'resposta',
                placeholder: 'Nova Resposta'
            }
            ],
            buttons: [
            {
                text: 'Cancelar',
                role: 'cancel',
                handler: data => {
                    console.log('Cancel clicked');
                }
            },
            {
                text: 'Adicionar',
                handler: data => {
                    if(this.pergunta.respostaPossiveis == null){
                        this.pergunta.respostaPossiveis = new Array<String>();
                    }
                    this.pergunta.respostaPossiveis.push(data.resposta);
                }
            }
            ]
        });
        alert.present();
    }

    removerResposta(resposta){
        let index = this.pergunta.respostaPossiveis.indexOf(resposta);
        this.pergunta.respostaPossiveis.splice(index, 1);
    }
}