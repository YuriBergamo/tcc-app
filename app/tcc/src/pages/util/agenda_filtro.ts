import {Injectable, Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: 'statusFilter'
})
@Injectable()
export class AgendaFiltro implements PipeTransform {
    transform(items: any[], args: any[]): any {
        return items.filter(item => {
            if(args[0] == false){
                return item;
            }else{
                if(item.status != "REJEITADO"){
                    return item;
                }
            }
        });
    }
}