import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
   title: string = "Welcome to Leoresto";
  slogan: string = "Taste the perfection!";
  managerBtn: string = "MANAGE";
  constructor(private router: Router) { }
   
  onClick() {
     this.router.navigateByUrl('/manage');
  }

    
}
