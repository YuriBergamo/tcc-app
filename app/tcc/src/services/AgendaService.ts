import {Injectable} from '@angular/core'
import { Http, Response } from '@angular/http';
import {PadraoService} from './PadraoService';

@Injectable()
export class AgendaService extends PadraoService{

    public finalUrl ="agendamentos/";
    
    constructor(public http:Http){
        super(http);
    }   

    public gravarAgendamento(agenda){   
        let url= this.finalUrl + "new";     
        return super.post(agenda, url);
    }

    public getAgendamentosPaciente(idPaciente){
        let url = this.finalUrl + idPaciente + "/pacientes";
        return super.get(url);
    }

    public getAgendamentosProfissional(idProfissional){
        let url = this.finalUrl + idProfissional + "/profissionais";
        return super.get(url);
    }

    public registrar(agenda){
        let url= this.finalUrl + agenda._id;     
        return super.post(agenda, url);
    }

    public rejeitarAgenda(agenda){
        let url =  this.finalUrl + "rejeitar/"+agenda._id;
        return super.post(agenda, url);
    }

    public aceitarAgenda(agenda){
        let url =  this.finalUrl + "aceitar/"+agenda._id;
        return super.post(agenda, url);
    }
}