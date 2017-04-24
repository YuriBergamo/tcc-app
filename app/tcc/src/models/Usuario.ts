export class Usuario{
    public id:any;
    public nome:String;
    public tipo:String;
    public email:String;
    public senha:String;
    public dataCriacao:Date;
    public profissional:Usuario;
    public foto:String;
    public listaPacientes:Array<Usuario>;
    
    constructor(json?:any){
        if(json){           
            this.id = json._id;
            this.nome = json.nome;
            this.tipo = json.tipo;
            this.email = json.email;
            this.senha = json.senha;
            this.foto = json.foto;
            this.profissional = new Usuario(json.profissional);
            this.listaPacientes = new Array();
            if(json.listaPacientes){
                for (var paciente in json.listaPacientes) {
                    this.listaPacientes.push(new Usuario(paciente));
                }
            }                        
        }
    }
}