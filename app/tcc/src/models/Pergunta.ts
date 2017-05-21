export class Pergunta{
    public pergunta:String;
    public tipoResposta:String;
    public respostaPossiveis:Array<String>;
    public obrigatoria:Boolean;
    public ordem:Number;

    constructor(json?){
        this.pergunta = "";
        this.obrigatoria = false;   
        this.tipoResposta = "Simples";     
        if(json){
            this.pergunta = json.pergunta;
            this.tipoResposta = json.tipoResposta;
            this.respostaPossiveis = json.respostaPossiveis;
            this.ordem = json.ordem;
            this.obrigatoria = json.obrigatoria;        
        }

    }
}