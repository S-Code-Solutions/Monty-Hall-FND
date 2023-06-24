import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SimulationService {

  private apiUrl = 'http://localhost:5000/api/simulation';

  constructor(private http: HttpClient) {}

  simulateGames(numSimulations: number | undefined, changeDoor: boolean | undefined): Observable<any> {
    console.log(numSimulations,changeDoor)
    return this.http.post<any>(this.apiUrl, {
      numberOfSimulations: numSimulations,
      changeDoor: changeDoor
    }, {
      headers:new HttpHeaders({
        'Content-Type':  'application/json',
      })
    })
  }
}
