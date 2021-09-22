import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manager',
  templateUrl: './managerHeader.component.html',
  styleUrls: ['./managerHeader.component.css']
})
export class ManageComponent implements OnInit {
   menuToggle: boolean = false;
  
    constructor() { }
    ngOnInit() {
        
    }

}
