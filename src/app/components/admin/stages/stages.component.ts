import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-stages',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule
  ],
  templateUrl: './stages.component.html',
  styleUrl: './stages.component.css'
})
export class StagesComponent implements OnInit{

  async ngOnInit(){
    this._loginSer.check_login(2);
    await this._loginSer.loadUserData();
  }
  constructor(
    private _loginSer : LoginService,
  ){}
}
