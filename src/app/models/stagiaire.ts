export class Stagiaire {
    id?:number;
    cin?: number;
    passport?:number
    email?: string;
    filiere?: string;
    institut?: string;
    nom?: string;
    password?: string;
    prenom?: string;
    id_pays?:string;
    id_region?: number;
    tel?: number;
    constructor() {
        this.cin = 0;
        this.passport = 0;
        this.email ='';
        this.filiere =  '';
        this.institut ='';
        this.nom =  '';
        this.password ='';
        this.prenom = '';
        this.id_region =  0;
        this.tel = 0;
    }
    setInscriPart1(data:any){
        this.nom = data.nom;
        this.prenom= data.prenom;
        this.institut = data.institut;
        this.id_region = data.id_region;
        this.filiere = data.filiere;
    }
    setInscriPart2(data:any){
        this.id_pays = data.id_pays
        this.id = data.id ? data.id : null ;
        this.cin = data.cin ? data.cin : null ;
        this.passport = data.passport ? data.passport : null ;
        this.tel= data.tel;
        this.email = data.email;
        this.password = data.password;
    }
}