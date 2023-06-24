export interface SimulationResult {
  gameId: number;
  doorSelected: number;
  prizeBehindSelectedDoor: string;
  doorOpenedByPresenter: number;
  doorSwitched: boolean;
  win: boolean;
}
