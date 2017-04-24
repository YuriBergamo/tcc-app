import {Injectable} from '@angular/core'
import { Http, Response } from '@angular/http';
import {PadraoService} from './PadraoService';

@Injectable()
export class AgendaService extends PadraoService{

    public finalUrl ="agenda/";
    
    constructor(public http:Http){
        super(http);
    }

    public buscarAluno(idAluno:number){
        let url = this.finalUrl + idAluno;
        return super.get(url);
    }

    public buscarAgendamentos(idAluno:number){
        let url = this.finalUrl  + idAluno + "/agendamentos";
        return super.get(url);
    }

    public buscarGrade(idAluno:number){
        let url = this.finalUrl + idAluno + "/grade";
        return super.get(url);
    }

    public gravarAgendamento(agenda){
        let url= "agendamentos";
        return super.post(agenda, url);
    }
}