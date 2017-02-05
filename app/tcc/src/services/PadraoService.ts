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

    private URL_PADRAO = "http:/localhost:8100/";
    constructor(public http:Http){
        this.headers = new Headers({ 'Content-Type': 'application/json' });
        this.options = new RequestOptions({ headers: this.headers });
    }


    public get(finalUrl){
        let urlFinal = this.URL_PADRAO + finalUrl;

         return this.http.get(urlFinal)
                    .map(this.extractData)
                    .catch(this.handleError);
    }

    public post(body,finalUrl){
        let urlFinal = this.URL_PADRAO + finalUrl;
        console.log("POST", JSON.stringify(body));
        return this.http.post(urlFinal, JSON.stringify(body), this.options)
                    .map(this.extractData)
                    .catch(this.handleError);
    }


    private extractData(res: Response) {
        let body = res.json();
        return body.data || { };
    }

    private handleError (error: any) {
      // In a real world app, we might use a remote logging infrastructure
      // We'd also dig deeper into the error to get a better message
      let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
      return Observable.throw(errMsg);
    }

}