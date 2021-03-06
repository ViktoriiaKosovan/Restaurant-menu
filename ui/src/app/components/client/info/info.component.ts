import { Component, OnInit } from '@angular/core';
import { Info } from 'src/app/shared/layouts/interfaces/infoInterface';
import { InfoService } from '../../../services/info.service';

@Component({
    selector: "app-info",
    templateUrl: "./info.component.html",
    styleUrls: ["./info.component.css"]
    
})
export class InfoComponent implements OnInit {
    info: Info[] = [];
    constructor(private infoService: InfoService) { }
    ngOnInit() {
        this.infoService.getInfo()
            .subscribe(info => {
                this.info = info;
        
            })
    }
 }