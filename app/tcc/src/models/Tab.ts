export class Tab{
    public title:String;
    public root:any;
    public icon:String;
    public color:String;

    constructor(title, root, icon, color){
        this.title=title;
        this.root=root;
        this.icon=icon;
        this.color=color;
    }
}