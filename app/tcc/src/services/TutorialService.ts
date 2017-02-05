import {Injectable} from '@angular/core'
import { Http, Response } from '@angular/http';
import {PadraoService} from './PadraoService';

@Injectable()
export class TutorialService extends PadraoService{

    public finalUrl ="tutorial/";
    
    constructor(public http:Http){
        super(http);
    }

    public buscarTutoriais(){
        return super.get(this.finalUrl);
    }
    
}