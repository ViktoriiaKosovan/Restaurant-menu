import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-header',
  templateUrl: './manage-header.component.html',
  styleUrls: ['./manage-header.component.css']
})
export class ManageComponent implements OnInit {
   menuToggle: boolean = false;
  
    constructor() { }
    ngOnInit() {
        
    }

}
