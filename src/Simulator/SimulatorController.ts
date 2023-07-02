import CriticalState from "./CriticalState";
import { State as SimulatorState } from "./Simulator";
import {
  energiKinetik,
  energiPotensial,
  getTouchDownTime,
  kecKetikaT,
  tinggiBendaWaktuTertentu,
} from "./bantuan";

const MAX_FPS = 30;
const MAX_MS_PER_FRAME = 1000 / MAX_FPS;

class SimulatorController {
  private getState: () => SimulatorState;
  private criticalState: CriticalState;
  private endTime = Infinity;

  private prevRAFTimestamp = 0;
  private progressIncrement = 1 / MAX_FPS;

  constructor(criticalState: CriticalState, getState: () => SimulatorState) {
    this.getState = getState;
    this.criticalState = criticalState;
    this.criticalState.isPlaying.subscribe(this.handlePlayStateChange);
    this.criticalState.progress.subscribe(this.calculateCriticalState);
    this.recalculateDerivedStableState();
  }

  private handlePlayStateChange = (isPlaying: boolean) => {
    if (!isPlaying) return;
    this.recalculateDerivedStableState();

    requestAnimationFrame(this.loop);
  };

  /**
   * Call this after every time the Simulator's state changes.
   */
  recalculateDerivedStableState() {
    const state = this.getState();
    this.endTime = getTouchDownTime(state.initialHeight, 0, state.g);
    this.progressIncrement = state.playSpeed / (this.endTime * MAX_FPS);
  }

  recalculateCriticalState() {
    this.calculateCriticalState();
  }

  private loop = (timestamp: number) => {
    const elapsed = timestamp - this.prevRAFTimestamp;
    if (!this.criticalState.isPlaying.getLatest()) return;

    if (elapsed >= MAX_MS_PER_FRAME) {
      let newProgress =
        this.criticalState.progress.getLatest() + this.progressIncrement;

      if (newProgress > 1) {
        newProgress = 1;
        this.criticalState.isPlaying.notify(false);
      }

      this.criticalState.progress.notify(newProgress);
      this.prevRAFTimestamp = timestamp;
    }

    requestAnimationFrame(this.loop);
  };

  /**
   * Calculates and updates `this.criticalState`
   * @param time Simulation time (s)
   */
  private calculateCriticalState = () => {
    const time = this.endTime * this.criticalState.progress.getLatest();
    const state = this.getState();
    const velocity = kecKetikaT(0, state.g, time);
    const ballHeight = tinggiBendaWaktuTertentu(
      0,
      time,
      state.g,
      state.initialHeight
    );

    this.criticalState.time.notify(time);
    this.criticalState.ballHeight.notify(ballHeight);

    this.criticalState.velocity.notify(velocity);
    this.criticalState.kineticEnergy.notify(
      energiKinetik(state.mass, velocity)
    );
    this.criticalState.potentialEnergy.notify(
      energiPotensial(state.mass, state.g, ballHeight)
    );
  };
}

export default SimulatorController;
