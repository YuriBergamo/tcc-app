import {Injectable} from '@angular/core'
import { Http, Response } from '@angular/http';
import {PadraoService} from './PadraoService';
import {Usuario} from '../models/Usuario';

@Injectable()
export class UsuarioService extends PadraoService{

    private finalURL = "usuarios";

    constructor(public http:Http){
        super(http);
    }

    public cadastrarUsuario(usuario){
        var url= this.finalURL + "/novo";
        return super.post(usuario, url);
    }

    public buscarProfissional(emailProfissional:String){
        let url = this.finalURL + "/buscarProfissional?email="+emailProfissional;
        return super.getMap(url)
                    .map(res=> {
                        if(res.json()){
                            console.log("VINC", res.json());                            
                            return res.json().data;
                        }
                    })
                    .catch(super.handleError);
    }
    public vincularProfissional(idUsuario, idProfissional){
        let url = this.finalURL + "/vincularProfissional";
        let body = {
            "idUsuario":idUsuario,
            "idProfissional":idProfissional
        };
        return super.post(body,url);
    }

    public desvincularProfissional(idUsuario){
        let url = this.finalURL + "/desvincularProfissional";
        let body = {
            "idUsuario":idUsuario
        };
        return super.post(body,url);
    }

}