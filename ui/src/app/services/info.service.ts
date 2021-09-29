import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import baseInfoUrl from "../constants/infoApiUrl";

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
       return this.http.get<Info[]>(baseInfoUrl)
    }
    updateInfo(info: Info): Observable<Info> {
        return this.http.patch<Info>(baseInfoUrl, info)
    }
}
