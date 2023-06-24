import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameComponent } from './game.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SimulationService } from '../../services/simulation.service';
import { Observable, of } from 'rxjs';

// import * as jasmine from 'jasmine';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  let simulationService: SimulationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SimulationService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    simulationService = TestBed.inject(SimulationService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should start simulation and update simulationResults', () => {
    const numSimulations = 10;
    const changeDoor = true;
    const simulationResults: jasmine.ArrayLike<any> = [/* mock simulation results */];

    spyOn(simulationService, 'simulateGames').and.returnValue(of(simulationResults));

    component.numSimulations = numSimulations;
    component.changeDoor = changeDoor;
    component.startSimulation();

    expect(simulationService.simulateGames).toHaveBeenCalledWith(numSimulations, changeDoor);
    expect(component.simulationResults).toEqual(simulationResults);
  });

  it('should return the correct door image URL for a win', () => {
    const result = {
      playerChoice: 0,
      montyOpens: 1,
      isWin: true
    };

    expect(component.getDoorImage(result, 0)).toBe('https://i.ibb.co/1z84Nmy/win.png');
  });

  it('should return the correct door image URL for a loss', () => {
    const result = {
      playerChoice: 0,
      montyOpens: 1,
      isWin: false
    };

    expect(component.getDoorImage(result, 0)).toBe('https://i.ibb.co/vwJnbkX/lose.jpg');
  });
});
