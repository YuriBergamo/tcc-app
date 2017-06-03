export class Pergunta{
    public pergunta:String;
    public tipoResposta:String;
    public respostaPossiveis:Array<String>;
    public obrigatorio:Boolean;
    public ordem:Number;

    constructor(json?){
        this.pergunta = "";
        this.obrigatorio = false;   
        this.tipoResposta = "Simples";     
        if(json){
            this.pergunta = json.pergunta;
            this.tipoResposta = json.tipoResposta;
            this.respostaPossiveis = json.respostaPossiveis;
            this.ordem = json.ordem;
            this.obrigatorio = json.obrigatorio;        
        }

    }
}