import {Injectable} from '@angular/core'
import { Http, Response } from '@angular/http';
import {PadraoService} from './PadraoService';
import {Usuario} from '../models/Usuario';

@Injectable()
export class PacienteService extends PadraoService{

    private finalURL = "usuarios/pacientes";

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
                                // let lista = new Array<Usuario>();
                                // for (var pac in res.json().data) {
                                //     lista.push(new Usuario(pac));
                                // }
                                return res.json().data;
                            }
                        }
                    ).catch(this.handleError);
    }   

}