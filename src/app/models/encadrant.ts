export class Encadrant {
    id?:number;
    id_bureau?:number;
    nom?:string;
    prenom?:string;
    tel?:number;
    email?:string;
    service?:string;
    setValue(data:any){
        if(data.id) this.id = data.id;
        if(data.id_bureau) this.id_bureau = data.id_bureau;
        if(data.nom) this.nom = data.nom;
        if(data.prenom) this.prenom = data.prenom;
        if(data.tel) this.tel = data.tel;
        if(data.email) this.email = data.email;
        if(data.service) this.service = data.service;
    }
}