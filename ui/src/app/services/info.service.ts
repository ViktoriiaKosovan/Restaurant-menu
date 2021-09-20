import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

export interface Info {
    id?: string,
    address: string,
    contacts: string,
    wiFi: string
}

@Injectable({ providedIn: "root" })
    
export class InfoService {
    constructor(private http: HttpClient) { }
    
    getInfo(): Observable<Info[]> {
       return this.http.get<Info[]>('http://localhost:5000/api/info')
    }
}
