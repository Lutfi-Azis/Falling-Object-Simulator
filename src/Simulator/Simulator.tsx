import { Component } from "react";
import classes from "./Simulator.module.css";
import ParamNumberInput from "./ParamNumberInput";
import DiveTower from "./DiveTower";
import Volleyball from "./Volleyball";
import HeightPI from "./HeightPI";
import CriticalState from "./CriticalState";
import Timeline from "./Timeline";
import SimulatorController from "./SimulatorController";

type Props = Record<string, never>;

export type State = {
  /**
   * Mass of the object (kg).
   */
  mass: number;
  /**
   * Graviational acceleration constant (m/s^2).
   */
  g: number;
  /**
   * Initial dropping height (m).
   */
  initialHeight: number;
  /**
   * The Y (or top) coordinate of the tip of the board.
   */
  boardTipY: number;
};

class Simulator extends Component<Props, State> {
  private criticalState = new CriticalState();
  private simulatorController: SimulatorController;
  constructor(props: Props) {
    super(props);

    this.state = {
      mass: 10,
      g: 10,
      initialHeight: 10,
      boardTipY: 0,
    };
    this.criticalState.ballHeight.notify(this.state.initialHeight);

    this.simulatorController = new SimulatorController(
      this.criticalState,
      () => this.state
    );
  }

  componentWillUnmount() {
    this.criticalState.isPlaying.notify(false);
    this.criticalState.destroy();
  }

  handleMassChange = (value: number) => this.setState({ mass: value });
  handleGChange = (value: number) => this.setState({ g: value });
  handleInitialHeightChange = (value: number) =>
    this.setState({ initialHeight: value });
  handleTipYBoardChange = (value: number) =>
    this.setState({ boardTipY: value });

  render() {
    this.simulatorController.recalculateDerivedStableState();
    return (
      <div className={classes.Simulator}>
        <div className={classes.topLeftGroup}>
          <ParamNumberInput
            name="massa"
            value={this.state.mass}
            units="kg"
            onChange={this.handleMassChange}
          />
          <ParamNumberInput
            name="gravitasi"
            value={this.state.g}
            units="m/s^2"
            onChange={this.handleGChange}
          />
        </div>

        <div className={classes.air}>
          <div className={classes.dry}>
            <div className={classes.curlyTrio}>
              <div>
                <ParamNumberInput
                  className={classes.heightPI}
                  name="tinggi"
                  value={this.state.initialHeight}
                  units="kg"
                  onChange={this.handleInitialHeightChange}
                />
              </div>
              <div></div>
              <DiveTower onTipYChange={this.handleTipYBoardChange} />
            </div>
          </div>
          <div className={classes.wet}>
            <Volleyball leftOffset={130} boardTipY={this.state.boardTipY} />
            <HeightPI criticalState={this.criticalState} />
          </div>
        </div>
        <Timeline
          criticalState={this.criticalState}
          className={classes.ground}
        />
      </div>
    );
  }
}

export default Simulator;
