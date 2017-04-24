import {Injectable} from '@angular/core'
import { Http, Response } from '@angular/http';
import {PadraoService} from './PadraoService';

@Injectable()
export class LoginService extends PadraoService{

    public finalLoginUrl ="login";
    public finalLogoutUrl ="logout";
    
    constructor(public http:Http){
        super(http);
    }

    public login(email:String, senha:String){
        var body ={
            "email":email,
            "senha":senha
        };
        return super.post(body, this.finalLoginUrl);
    }

    public logout(agenda){
        return super.post({},this.finalLogoutUrl);
    }
}