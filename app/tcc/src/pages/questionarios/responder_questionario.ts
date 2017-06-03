import {Component, OnInit, ViewChild} from "@angular/core";
import {Usuario} from "../../models/Usuario";
import {RespostaQuestionario} from "../../models/RespostaQuestionario";
import {Questionario} from "../../models/Questionario";
import {RespostaPergunta} from "../../models/RepostaPergunta";
import {QuestionarioService} from '../../services/QuestionarioService';
import {Storage} from "@ionic/storage";
import {ModalController, 
        LoadingController,
        ActionSheetController, 
        NavController,
        Events,
        NavParams,
        ToastController,
        Content} from 'ionic-angular';

@Component({
    selector:"responderQuestionario",
    templateUrl:'responder_questionario.html'
})


export class ResponderQuestionarioComponent{

    @ViewChild(Content) content: Content;

    public visualizando:Boolean;
    public usuarioLogado:Usuario;
    public respostaQuestionario:RespostaQuestionario;
    public questionario:Questionario;
    public error:String;

    ngOnInit(){
        this.usuarioLogado = this.navParms.get('usuarioProfissional');
        if(this.usuarioLogado == null){
            this.usuarioLogado = this.navParms.get('usuarioPaciente');    
        }
        this.visualizando = this.navParms.get("visualizando");
        this.questionario = this.navParms.get("questionario");

        if(this.visualizando){
            this.respostaQuestionario = new RespostaQuestionario();
            this.respostaQuestionario.respostas = new Array<RespostaPergunta>();
            for(var i=0; i< this.questionario.perguntas.length; i++){
                var pergunta = this.questionario.perguntas[i];
                var resposta = new RespostaPergunta();
                resposta.pergunta = pergunta.pergunta;
                resposta.tipoPergunta = pergunta.tipoResposta;
                resposta.resposta = "";
                resposta.obrigatorio = pergunta.obrigatorio;
                resposta.respostaPossiveis = pergunta.respostaPossiveis;                

                this.respostaQuestionario.respostas.push(resposta);

            }            
        }
                                               
    }

    constructor(public questionarioService:QuestionarioService, 
                private modalController:ModalController,
                public storage: Storage,            
                public loadingCtrl: LoadingController,
                public actionSheetController:ActionSheetController,
                public navController:NavController,
                public toastController:ToastController,
                public events:Events,
                public navParms:NavParams){       

    }


    salvar(){

        this.respostaQuestionario.respostas.forEach(resposta=>{
            if(resposta.obrigatorio){
                if(resposta.resposta == null || resposta.resposta == ""){
                    this.error = resposta.pergunta + " deve ser respondida";
                    this.content.scrollToTop();
                    return;
                }
            }
        });

        this.respostaQuestionario.idUsuario = this.usuarioLogado.id;
        this.respostaQuestionario.idQuestionario = this.questionario.id;

        let loader = this.loadingCtrl.create({
            content: "Salvando Respostas...",            
        });
        loader.present();
        
        this.questionarioService.responderQuestionario(this.respostaQuestionario).subscribe(
            (sucess)=>{
                console.log("SUCESS", sucess);
                //exibir toast
                let toast = this.toastController.create({
                        message: "Questionário respondido!",
                        duration: 2000,
                        position:"bottom"
                });
                toast.present();
                loader.dismiss();
                //voltar pra listagem
                this.navController.pop();
            },
            (error)=>{
                //exibir erro
                console.log("ERROR", error);
                loader.dismiss();
            }
        )        
    }

}