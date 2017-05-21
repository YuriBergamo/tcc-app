import {Component, OnInit} from "@angular/core";
import {Usuario} from "../../models/Usuario";
import {PacienteService} from '../../services/PacienteService';
import {UsuarioService} from '../../services/UsuarioService';
import {Storage} from "@ionic/storage";
import {DomSanitizer} from '@angular/platform-browser';
import {QuestionariosFormComponent} from './questionarios_form';
import {ModalController, LoadingController,ActionSheetController, NavController} from 'ionic-angular';

@Component({
    selector:"questionariosLista",
    templateUrl:'questionarios_lista.html'
})

export class QuestionariosListaComponent{

    public listaQuestionarios = [];
    public listaAuxQuestionarios = [];
    public usuarioLogado;
    ngOnInit(){
        // let loader = this.loadingCtrl.create({
        //     content: "Buscando questionários...",            
        // });
        // loader.present();
        this.storage.get('user').then((user) => {            
            this.usuarioLogado = JSON.parse(user);
            //fazer o service para buscar os questionarios cadastrados
        });                               
    }

    constructor(public pacienteService:PacienteService, 
                public usuarioService:UsuarioService, 
                private modalController:ModalController,
                public storage: Storage,
                private sanitizer:DomSanitizer,
                public loadingCtrl: LoadingController,
                public actionSheetController:ActionSheetController,
                public navController:NavController){                    
                
    }

    public showOptions(questionario){
        let actionSheet = this.actionSheetController.create({
            title: questionario.nome,
            buttons: [
            {
                text: 'Editar',
                handler: () => {
                    console.log('Perfil');
                }
            },
            {
                text: 'Agendar',
                role: 'cancel',
                handler: () => {
                                        
                }
            },
            {
                text: 'Excluir',
                role: 'cancel',
                handler: () => {
                                        
                }
            }
            ]
        });
        actionSheet.present();
    }

    public getAvatar(item){
        return this.sanitizer.bypassSecurityTrustUrl("data:image/png;utf8;base64,"+ item.foto);        
    }

    public filterQuestionario(ev:any){
        //volta todos os pacientes para a lista principal
        this.listaQuestionarios = this.listaAuxQuestionarios;

        let val = ev.target.value;       
        if (val && val.trim() != '') {
            this.listaQuestionarios = this.listaQuestionarios.filter((item) => {
                return (item.nome.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }
    }

    public addQuestionario(){
        this.navController.push(QuestionariosFormComponent, {"usuario":this.usuarioLogado}).then();
    }


}