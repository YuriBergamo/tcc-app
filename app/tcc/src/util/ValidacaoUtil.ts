export class ValidacaoUtil{

    public static isEmpty(text:String){
        return text == undefined || text == null || text == "";
    }

    public static isNotEmpty(text:String){
        return text != undefined && text != null && text != "";
    }

    public static isEqual(text1:String, text2:String){
        return text1 === text2;
    }
}