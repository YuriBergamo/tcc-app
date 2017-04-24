import {Component} from '@angular/core';
import {LoginService} from "../../services/LoginService";
import {NavController, ModalController} from "ionic-angular";
import {NativeStorage} from "ionic-native";
import {CreateUserComponent} from "./createUser";
import {TabsPage} from "../tabs/tabs";
import {Storage} from "@ionic/storage";
import { LoadingController } from 'ionic-angular';

@Component({
    selector:"login",
    templateUrl:"login.html"
})
export class LoginComponent{

    public email:String;
    public senha:String;
    public submitError:String=null;

    constructor(private loginService:LoginService, 
                private navController:NavController,
                public modalController:ModalController,
                public storage: Storage,
                public loadingCtrl: LoadingController){
    }

    logar(){
         let loader = this.loadingCtrl.create({
            content: "Autenticando...",            
        });
        loader.present();
        this.loginService.login(this.email, this.senha).subscribe(
          (sucess) =>{
              if(sucess.status){
                  console.log("ERRO", sucess.data);
                  loader.dismiss();
                  this.submitError = sucess.data;

              }else{
                if(sucess){                    
                    //usuario comum                                
                    this.storage.set('user', JSON.stringify(sucess)).then(() => {                        
                        this.navController.setRoot(TabsPage);
                        loader.dismiss();
                    });                    
                }
              }
              
              
          },
          (erro) => {
              console.log("Erro ", erro)
              loader.dismiss();
              this.submitError = erro;
          }
        );
        //this.navController.setRoot(TabsNoticiasComponent);
    }

    criarNovaConta(){
        this.modalController.create(CreateUserComponent).present();                               
    }

}
