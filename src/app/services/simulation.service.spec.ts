import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { SimulationService } from './simulation.service';

describe('SimulationService', () => {
  let service: SimulationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SimulationService]
    });

    service = TestBed.inject(SimulationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make a POST request to simulate games', () => {
    const numSimulations = 100;
    const changeDoor = true;
    const apiUrl = 'http://localhost:5000/api/simulation';
    const mockResponse = { /* Mock response object */ };

    service.simulateGames(numSimulations, changeDoor).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ numberOfSimulations: numSimulations, changeDoor: changeDoor });

    req.flush(mockResponse);
  });
});
