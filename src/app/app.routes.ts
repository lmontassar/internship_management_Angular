import { Routes } from '@angular/router';
import { InscriptionComponent } from './components/connection/inscription/inscription.component';
import { LoginComponent } from './components/connection/login/login.component';
import { ProfileComponent } from './components/stagiaires/profile/profile.component';
import { StagesComponent } from './components/admin/stages/stages.component';
import { DemandeComponent } from './components/admin/stages/demande/demande.component';
import { StageComponent } from './components/admin/stage/stage.component';
import { AllComponent } from './components/admin/stages/all/all.component';
import { ListeDemandesComponent } from './components/stagiaires/liste-demandes/liste-demandes.component';
import { EtatStageComponent } from './components/stagiaires/etat-stage/etat-stage.component';
import { NewDemandeComponent } from './components/stagiaires/new-demande/new-demande.component';
import { EncoursComponent } from './components/admin/stages/encours/encours.component';
import { PostesComponent } from './components/admin/postes/postes.component';
import { AllPComponent } from './components/admin/postes/all-p/all-p.component';
import { EncadrantsComponent } from './components/admin/postes/encadrants/encadrants.component';
import { EncadrantComponent } from './components/admin/encadrant/encadrant.component';
import { PosteComponent } from './components/admin/poste/poste.component';

export const routes: Routes = [
    {path: "inscription" , component:InscriptionComponent},
    {path: "login" , component : LoginComponent},
    
    /* stagiaire */
        {path: "etatstage/:id" , component:EtatStageComponent},
        {path : "profile", component: ProfileComponent},
        {path: "liste" , component : ListeDemandesComponent},
        {path: "ajouter" , component: NewDemandeComponent},
    /* end */

    /* admin */
        {path : "stageAd", component: StagesComponent,
            children : [
                {path: "demande" , component:DemandeComponent },
                {path: "all", component:AllComponent },
                {path: "encours",component:EncoursComponent},
                {path : "", redirectTo : "all" , pathMatch:"full"}
            ]
        },
        {path : "posteAd",  component: PostesComponent,
            children :[
                {path:"all" , component :AllPComponent},
                {path:"encadrants", component:EncadrantsComponent},
                {path : "", redirectTo : "all" , pathMatch:"full"}
            ]
        },
        {path: "stageRep/:id" , component : StageComponent},
        {path : "encadrant/:id", component: EncadrantComponent},
        {path : "poste/:id", component: PosteComponent},
    /* end */

    {path: "" , redirectTo: "login" , pathMatch:"full"}
];
