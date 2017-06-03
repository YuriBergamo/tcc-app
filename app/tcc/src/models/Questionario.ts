import {Pergunta} from "./Pergunta";
export class Questionario{
    public nome:String;
    public perguntas:Array<Pergunta>;
    public ativo:Boolean;
    public id:String;

    constructor (json?){
        if(json){
            this.nome = json.nome;
            this.ativo = json.ativo;
            this.id = json._id;
            if(json.perguntas != null && json.perguntas.length > 0){
                this.perguntas = new Array<Pergunta>();
                json.perguntas.forEach(jsonPergunta => {
                    let pergunta =  new Pergunta(jsonPergunta);
                    this.perguntas.push(pergunta);
                });
            }

        }
    }
}