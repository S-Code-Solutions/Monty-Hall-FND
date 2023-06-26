import { Component, OnInit } from '@angular/core';
import {SimulationService} from "../../services/simulation.service";
import {catchError, Observable, throwError} from "rxjs";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  numSimulations: number;
  changeDoor: boolean;
  simulationResults: any[];

  constructor(private simulationService: SimulationService) {
    this.numSimulations = 0;
    this.changeDoor = false;
    this.simulationResults = [];
  }

  startSimulation(): void {
    this.simulationService
      .simulateGames(this.numSimulations, this.changeDoor)
      .pipe(
        catchError(error => {
          // Handle the error appropriately
          console.error('An error occurred during simulation:', error);
          // Optionally, re-throw the error to propagate it further
          return throwError(error);
        })
      )
      .subscribe(results => {
        this.simulationResults = results;
        console.log(this.simulationResults);
      });
  }

  getDoorImage(result: any, doorIndex: number): string {
    if (result.playerChoice === doorIndex && result.isWin) {
      return 'https://i.ibb.co/1z84Nmy/win.png';
    } else if (result.playerChoice === doorIndex && !result.isWin) {
      return 'https://i.ibb.co/vwJnbkX/lose.jpg';
    } else if (result.montyOpens === doorIndex && !result.isWin) {
      return 'https://i.ibb.co/vwJnbkX/lose.jpg';
    } else {
      return 'https://i.ibb.co/6NLVMqM/doo-closed.jpg';
    }
  }

  ngOnInit(): void {
  }

}
