import 'rxjs/add/observable/throw';

// Operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';

import { Headers, RequestOptions, Response, Http } from '@angular/http';
import {Observable} from "rxjs";

export class PadraoService{

    private headers;
    private options;

    // private URL_PADRAO = "http://ec2-52-15-74-62.us-east-2.compute.amazonaws.com:3001/";
    private URL_PADRAO = "http://localhost:3001/";
    constructor(public http:Http){
        this.headers = new Headers({ 'Content-Type': 'application/json' });
        this.options = new RequestOptions({ headers: this.headers });
    }


    public get(finalUrl){
        let urlFinal = this.URL_PADRAO + finalUrl;
        console.log("url final", urlFinal);
         return this.http.get(urlFinal, this.headers)
                    .map(this.extractData)
                    .catch(this.handleError);
    }

    public getMap(finalUrl){
        let urlFinal = this.URL_PADRAO + finalUrl;
        console.log("url", urlFinal);
         return this.http.get(urlFinal, this.headers);                    
    }

    public post(body,finalUrl){
        let urlFinal = this.URL_PADRAO + finalUrl;
        console.log("urlFinal", urlFinal);
        return this.http.post(urlFinal, JSON.stringify(body), this.options)
                    .map(this.extractData)
                    .catch(this.handleError);
    }

    public put(body,finalUrl){
        let urlFinal = this.URL_PADRAO + finalUrl;
        console.log("urlFinal", urlFinal);
        return this.http.put(urlFinal, JSON.stringify(body), this.options)
                    .map(this.extractData)
                    .catch(this.handleError);
    }


    public extractData(res: Response) {
        let body = res.json();
        console.log("BODY", body);
        if(body.status == 200){
            return body.data || { };
        }else{
            return body;    
        }
        
    }

    public handleError (error: any) {
      // In a real world app, we might use a remote logging infrastructure
      // We'd also dig deeper into the error to get a better message
      console.log("error",error);
      let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
      return Observable.throw(errMsg);
    }

}