import {Injectable} from '@angular/core'
import { Http, Response } from '@angular/http';
import {PadraoService} from './PadraoService';

@Injectable()
export class NoticiasSerice extends PadraoService{

    public finalUrl ="news/";
    
    constructor(public http:Http){
        super(http);
    }

    public buscarNoticias(){
        return super.get(this.finalUrl);
    }

    public salvarNoticia(noticia){
        return super.post(noticia, this.finalUrl);
    }
}