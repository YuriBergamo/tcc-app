export class Agenda {
    public data:Date;
    public hora:String;
    public nivelUrgencia:String;
    public observacao:String;
    public profissional;
    public usuario;
    public tipo:String;
    public status:String;
    public questionario;

    constructor(){
        this.status = "NENHUM";
        this.tipo = "SIMPLES";
        this.nivelUrgencia = "NORMAL";
    }

}