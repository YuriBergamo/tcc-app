import {Component, OnInit} from "@angular/core";
import {Usuario} from "../../models/Usuario";
import {QuestionarioService} from '../../services/QuestionarioService';
import {UsuarioService} from '../../services/UsuarioService';
import {Storage} from "@ionic/storage";
import {DomSanitizer} from '@angular/platform-browser';
import {QuestionariosFormComponent} from './questionarios_form';
import {ResponderQuestionarioComponent} from './responder_questionario';
import {ModalController, 
        LoadingController,
        ActionSheetController, 
        NavController,
        Events} from 'ionic-angular';

@Component({
    selector:"questionariosLista",
    templateUrl:'questionarios_lista.html'
})

export class QuestionariosListaComponent{

    public listaQuestionarios = [];
    public listaAuxQuestionarios = [];
    public usuarioLogado;
    ngOnInit(){
        this.storage.get('user').then((user) => {            
            this.usuarioLogado = JSON.parse(user);
            this.fetchQuestionarios();                        
        });                                       
    }

    private fetchQuestionarios(){
        let loader = this.loadingCtrl.create({
            content: "Buscando questionários...",            
        });
        loader.present();
        this.questionarioService.buscarQuestionarios(this.usuarioLogado._id).subscribe(
                (sucess)=>{
                    this.listaQuestionarios = sucess;
                    this.listaAuxQuestionarios = this.listaQuestionarios;
                    loader.dismiss();
                },
                (err)=>{
                    console.log("ERR", err);
                    loader.dismiss();
                }
            )
    }

    constructor(public questionarioService:QuestionarioService, 
                public usuarioService:UsuarioService, 
                private modalController:ModalController,
                public storage: Storage,
                private sanitizer:DomSanitizer,
                public loadingCtrl: LoadingController,
                public actionSheetController:ActionSheetController,
                public navController:NavController,
                public events:Events){                    

            this.events.subscribe('questionario:new', (questionario) => {            
                this.callBackQuestionarios();
            });        
                
    }

    public showOptions(questionario){
        let actionSheet = this.actionSheetController.create({
            title: questionario.nome,
            buttons: [
            {
                text: 'Pré-visualizar',
                handler: () => {
                     this.navController.push(ResponderQuestionarioComponent, 
                        {
                         "usuarioProfissional":this.usuarioLogado,
                         "questionario":questionario,
                         "visualizando":true
                        }
                    ).then();
                }
            },
            {
                text: 'Editar',
                handler: () => {
                     this.navController.push(QuestionariosFormComponent, 
                        {
                         "usuario":this.usuarioLogado,
                         "questionario":questionario
                        }
                    ).then();
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

    public callBackQuestionarios(){        
        this.fetchQuestionarios();
    }    
    


}