import Calculator from "./Calculator";
import CriticalState from "./CriticalState";
import { BaseParam, DerivedParam, State } from "./Simulator";

class SimulatorCalculator implements Calculator<BaseParam, DerivedParam> {
  private getState: () => State;
  private criticalState: CriticalState;
  constructor(getState: () => State, criticalState: CriticalState) {
    this.getState = getState;
    this.criticalState = criticalState;
  }

  getAffectedBaseParams(source: DerivedParam): BaseParam[] {
    switch (source) {
      case "velocity":
        return ["initialHeight", "time", "g"];
    }
    return [];
  }

  calculateNewBaseParamValue(
    newSourceValue: number,
    source: DerivedParam,
    base: BaseParam
  ): number {
    if (source !== "velocity")
      throw Error("Source other than `velocity` is not yet supported.");

    switch (base) {
      case "initialHeight":
        return (
          (this.getState().g * this.criticalState.ballHeight.getLatest() +
            0.5 * newSourceValue ** 2) /
          this.getState().g
        );
      // return (0.5 * newSourceValue ** 2) / this.getState().g;
      case "time":
        return newSourceValue / this.getState().g;
      case "g":
        return (
          (0.5 * newSourceValue ** 2) /
          (this.getState().initialHeight -
            this.criticalState.ballHeight.getLatest())
        );
    }

    throw Error("Calculation not yet supported");
  }
}

export default SimulatorCalculator;
