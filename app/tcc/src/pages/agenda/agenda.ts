import {Component} from '@angular/core';

@Component({
    selector:"agenda",
    templateUrl:"agenda.html"
})
export class AgendaComponent{

  public listaAgendamentosPorData = [{"item":"teste"}];
  public dataSelecionada = new Date();


}
