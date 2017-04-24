export class Noticia{
    public titulo:String;
    public descricao:String;
    public imagem:String;

    constructor(json?){
        if(json){
            this.titulo = json.titulo;
            this.descricao = json.descricao;
            this.imagem = json.imagem;
        }
    }

    public convertBase64Image(){
        return "data:image/png;base64,"+ this.imagem;
    }
}