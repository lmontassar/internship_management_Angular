export class Bureau {
    id?:number;
    id_poste?:number;
    region?:number;
    code_postal?:number;
    bureau?:string;
    Adresse?:string;
    setValue(data:any){
        if(data.id) this.id = data.id ;
        if(data.id_poste) this.id_poste = data.id_poste;
        if(data.region) this.id_poste = data.id_poste ;
        if(data.code_postal) this.code_postal = data.code_postal;
        if(data.bureau) this.bureau = data.bureau;
        if(data.Adresse) this.Adresse = data.Adresse;
    }
}
