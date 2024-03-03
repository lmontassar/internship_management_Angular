export class Stage {
    id?:number;
    id_Encadrant?:number;
    id_stagiaire?:number;
    id_bureau?:number;
    id_fiche_reponse?:number;
    id_fiche_reponse_cache?:number;
    id_lettre_affectation?:number;
    id_attestation?:number;
    date_debut!:Date;
    date_fin!:Date;
    public etat!:number;
    lieu_proposee?:string
    type?:string; 
    constructor(){
        this.etat = -1;
    }
    setValue(res:any){
        this.id = res.id;
        this.id_stagiaire = res.id_stagiaire;
        this.id_fiche_reponse = res.id_fiche_reponse;
        this.date_debut = new Date(res.date_debut);
        this.date_fin = new Date(res.date_fin);
        this.etat = res.etat;
        this.lieu_proposee = res.lieu_proposee;
        this.type = res.type;
        if(res.id_Encadrant) this.id_Encadrant = res.id_Encadrant ;
        if(res.id_attestation) this.id_attestation = res.id_attestation ;
        if(res.id_bureau) this.id_bureau = res.id_bureau ;
        if(res.id_fiche_reponse_cache) this.id_fiche_reponse_cache = res.id_fiche_reponse_cache ;
        if(res.id_lettre_affectation) this.id_lettre_affectation = res.id_lettre_affectation ;
    }
    
}