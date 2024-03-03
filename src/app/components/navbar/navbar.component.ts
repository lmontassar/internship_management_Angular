import { Component ,ElementRef, HostListener } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(
    public _loginSer : LoginService,
    private router : Router
  )
  {}
  navopen = 0; // 0-> close
  open(){
    this.navopen = this.navopen == 0 ? 1 : 0 ;
  }
  Respdiv(){
    if( this.navopen == 1 ) this.navopen = 0;
  }
  logout(){
    this._loginSer.logout();
    this.router.navigate(['/login']);
  }


  @HostListener('document:scroll')
  losefocus1(){
    this.Respdiv();
  }
  @HostListener('document:click', ['$event'])
  losefocus(e: Event): void {
    const clicked = e.target as HTMLElement;  
    if (!clicked.closest('header')) {
      this.Respdiv();
    }
  }
  

}
