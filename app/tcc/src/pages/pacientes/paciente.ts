import {Component, OnInit} from "@angular/core";
import {Usuario} from "../../models/Usuario";
import {PacienteService} from '../../services/PacienteService';
import {UsuarioService} from '../../services/UsuarioService';
import {ModalController} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {DomSanitizer} from '@angular/platform-browser';
import { LoadingController,ActionSheetController } from 'ionic-angular';

@Component({
    selector:"paciente",
    templateUrl:'paciente.html'
})

export class PacienteComponent{

    public listPacientes = [];
    public listaAuxPacientes = [];
    public usuarioLogado;
    ngOnInit(){
        let loader = this.loadingCtrl.create({
            content: "Buscando pacientes...",            
        });
        loader.present();
        this.storage.get('user').then((user) => {            
            this.usuarioLogado = JSON.parse(user);
            this.pacienteService.buscarPacientesAtivos(this.usuarioLogado._id).subscribe(
                (sucess)=>{
                    this.listPacientes = sucess;
                    console.log("PAC", sucess);
                    this.listaAuxPacientes = this.listPacientes;
                    loader.dismiss();
                    
                },
                (error)=>console.log("ERRO PAC", error)
            );
        });                               
    }

    constructor(public pacienteService:PacienteService, 
                public usuarioService:UsuarioService, 
                private modalController:ModalController,
                public storage: Storage,
                private sanitizer:DomSanitizer,
                public loadingCtrl: LoadingController,
                public actionSheetController:ActionSheetController){                    
                
    }

    public showOptions(pac){
        let actionSheet = this.actionSheetController.create({
            title: pac.nome,
            buttons: [
            {
                text: 'Perfil',
                handler: () => {
                    console.log('Perfil');
                }
            },
            {
                text: 'Desvincular',
                role: 'cancel',
                handler: () => {
                    let loader = this.loadingCtrl.create({
                        content: "Desvinculando...",            
                    });
                    loader.present();

                    this.usuarioService.desvincularProfissional(pac._id).subscribe(
                        (sucess)=>{
                            let index = this.listPacientes.indexOf(pac);
                            this.listPacientes.splice(index,1);
                            loader.dismiss();
                        },
                        (error)=>{
                            console.log("ERRO desvincularProfissional", error);
                            loader.dismiss();
                        }
                    )
                    console.log('Desvincular');
                }
            }
            ]
        });
        actionSheet.present();
    }

    public getAvatar(item){
        return this.sanitizer.bypassSecurityTrustUrl("data:image/png;utf8;base64,"+ item.foto);        
    }

    public filterPac(ev:any){
        //volta todos os pacientes para a lista principal
        this.listPacientes = this.listaAuxPacientes;

        let val = ev.target.value;       
        if (val && val.trim() != '') {
            this.listPacientes = this.listPacientes.filter((item) => {
                return (item.nome.toLowerCase().indexOf(val.toLowerCase()) > -1);
            })
        }
    }


}