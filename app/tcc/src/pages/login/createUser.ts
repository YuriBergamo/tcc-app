import {Component} from "@angular/core";
import {ViewController, ToastController} from "ionic-angular";
import {Usuario} from "../../models/Usuario";
import {ValidacaoUtil} from "../../util/ValidacaoUtil";
import {UsuarioService} from "../../services/UsuarioService";

@Component({
    selector:"create-user",
    templateUrl:"createUser.html"
})

export class CreateUserComponent{

    public senhaConfirmacao:String;
    public emailConfirmacao:String;
    public novoUsuario:Usuario;
    public submitError:String;

    constructor(public viewCtrl: ViewController, 
                public usuarioService:UsuarioService,
                public toastController:ToastController){
        this.novoUsuario = new Usuario();
        this.submitError = null;
    }
    
    public criarUsuario(){
        this.validaForm();
        if(ValidacaoUtil.isEmpty(this.submitError)){
            //form validado, enviar para o server
            console.log("Validacao ok", JSON.stringify(this.novoUsuario));
            this.usuarioService.cadastrarUsuario(this.novoUsuario).subscribe(
                (sucess)=>{
                    //exibir toast
                    console.log("SUCESS", sucess);
                    if(sucess.status){
                        console.log("ERROR", sucess);
                        this.submitError =  sucess.data;            
                        return;
                    }
                    this.novoUsuario = new Usuario();
                    this.emailConfirmacao = "";
                    this.senhaConfirmacao = "";
                    let toast = this.toastController.create({
                        message: 'Usuário criado com sucesso',
                        duration: 3000,
                        position:"bottom"
                    });
                    toast.present();
                    this.cancelar();
                },
                (error)=>{
                    this.submitError = error;
                }
            )
        }
    }
    
    public validaForm(){
        if(ValidacaoUtil.isEmpty(this.emailConfirmacao)){
            this.submitError =  "Email necessita ser validado!";            
        }else if(!ValidacaoUtil.isEqual(this.emailConfirmacao, this.novoUsuario.email)){
            this.submitError =  "Os emails não conferem!";
        }else if(ValidacaoUtil.isEmpty(this.senhaConfirmacao)){
            this.submitError =  "Senha precisa ser validada";
        }else if(!ValidacaoUtil.isEqual(this.senhaConfirmacao, this.novoUsuario.senha)){
                this.submitError =  "As senhas não conferem!";                                        
        }else if(ValidacaoUtil.isEmpty(this.novoUsuario.tipo)){
            this.submitError =  "Escolha o tipo de cadastro!";
        }else{
            this.submitError =  null;
        }        
        
    }

    public cancelar(){
        this.viewCtrl.dismiss();

    }
    
}