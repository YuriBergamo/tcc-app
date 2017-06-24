import {Injectable} from '@angular/core'
import { Http, Response } from '@angular/http';
import {PadraoService} from './PadraoService';
import {Usuario} from '../models/Usuario';

@Injectable()
export class QuestionarioService extends PadraoService{

    private finalURL = "questionarios";

    constructor(public http:Http){
        super(http);
    }

    public buscarQuestionarios(idUsuario){
        var url= this.finalURL + "/"+idUsuario;
        return super.getMap(url)
            .map(res=> {
                if(res.json()){
                    console.log("questionarios", res.json());                            
                    return res.json().data;
                }
            });
    }
    
    public salvarQuestionario(idUsuario, questionario){
        let url = this.finalURL + "/"+ idUsuario;       
        return super.post(questionario,url);
    }

    public editarQuestionario(questionario){
        let url = this.finalURL + "/editar/"+ questionario._id;
        return super.post(questionario, url);
    }

    public responderQuestionario(resposta){
        let url = this.finalURL + "/responder/novo";
        return super.post(resposta, url);
    }    
}