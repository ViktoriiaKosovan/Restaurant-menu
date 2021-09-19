import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.css"]
    
})
export class HeaderComponent implements OnInit {
    menuToggle: boolean = false;
    title: string = "Welcome to Leoresto";
    slogan: string = "Taste the perfection!";
    managerBtn: string = "MANAGE";
    constructor(private http: HttpClient) { }
    ngOnInit() {
        this.http.get('http://localhost:5000/api/category')
            .subscribe(response => {
                console.log(response)
            })
    }
 }