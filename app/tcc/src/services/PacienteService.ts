import {Injectable} from '@angular/core'
import { Http, Response } from '@angular/http';
import {PadraoService} from './PadraoService';
import {Usuario} from '../models/Usuario';

@Injectable()
export class PacienteService extends PadraoService{

    private finalURL = "pacientes";

    constructor(public http:Http){
        super(http);
    }

    public buscarPacientesAtivos(idProfissional){
        let url = this.finalURL+"/"+idProfissional;
        return super.getMap(url)
                    .map(
                        res=>{
                            if(res.json()){
                                console.log("RESPOSTA", res.json());
                                if(res.json().status != 200){
                                    return null;
                                }                                
                        
                                return res.json().data;
                            }
                        }
                    ).catch(this.handleError);
    }

    public buscarQuestionarios(idPaciente){
        let url = this.finalURL+"/"+idPaciente+"/questionarios";
        return super.getMap(url)
                    .map(
                        res=>{
                            if(res.json()){
                                console.log("RESPOSTA", res.json());
                                if(res.json().status != 200){
                                    return null;
                                }                                                                
                                return res.json().data;
                            }
                        }
                    ).catch(this.handleError);
    }      

}