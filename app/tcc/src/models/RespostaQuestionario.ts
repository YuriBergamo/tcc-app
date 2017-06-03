import {RespostaPergunta} from './RepostaPergunta';
export class RespostaQuestionario{
    public idUsuario:String;    
    public idAgenda:String;
    public idQuestionario:String;
    /** 
     * Resposta:{
     *      pergunta:"",
     *      resposta:"",
     *      tipoPergunta:""
     * }
     */
    public respostas:Array<RespostaPergunta>;
    public dataResposta:Date;    

    constructor(){
        
    }

}