import {Component, OnInit} from '@angular/core';
import {NavController, NavParams, ViewController} from "ionic-angular";
import {Agenda} from "../../models/Agenda";
import {QuestionarioService} from "../../services/QuestionarioService";
import {PacienteService} from "../../services/PacienteService";



@Component({
    selector:"modal-select",
    templateUrl:"modal_select.html"
})

export class SelectModalComponent implements OnInit{

    
    public title;
    public listaItens;
    public usuarioLogado;

    ngOnInit(){
        this.usuarioLogado = this.navParams.get("usuarioLogado");
        if(this.navParams.get("paciente")){
            this.title = "Pacientes";
            this.pacienteService.buscarPacientesAtivos(this.usuarioLogado._id).subscribe(
                (sucess)=>{
                    this.listaItens = sucess;
                }
            )
        }else if(this.navParams.get("questionario")){
            this.title = "Questionários";
            this.questionarioService.buscarQuestionarios(this.usuarioLogado._id).subscribe(
                (sucess)=>{
                    this.listaItens = sucess;
                }
            )
        }
    }

    constructor(private navController:NavController,
                private navParams:NavParams,
                public questionarioService:QuestionarioService,
                public pacienteService:PacienteService,
                public viewController:ViewController ){

    }

    public cancelar(){
        this.viewController.dismiss({});
    }


    public selecionarItem(item){
        if(this.navParams.get("paciente")){
            this.viewController.dismiss({"paciente":item});
        }
        if(this.navParams.get("questionario")){
            this.viewController.dismiss({"questionario":item});
        }        
        
    }



}