import { Component, OnInit } from '@angular/core';
import { Info, InfoService } from '../services/info.service';




@Component({
    selector: "app-footer",
    templateUrl: "./footer.component.html",
    styleUrls: ["./footer.component.css"]
    
})
export class FooterComponent implements OnInit {
    info: Info[] = [];
    constructor(private infoService: InfoService) { }
    ngOnInit() {
        this.infoService.getInfo()
            .subscribe(info => {
                this.info = info;
               
            })
    }
 }