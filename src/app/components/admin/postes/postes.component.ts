import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-postes',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule
  ],
  templateUrl: './postes.component.html',
  styleUrl: './postes.component.css'
})
export class PostesComponent implements OnInit {
  async ngOnInit(){
    this._loginSer.check_login(2);
    await this._loginSer.loadUserData();
  }
  constructor(
    private _loginSer : LoginService,
  ){}
}