import { Component } from "react";
import classes from "./Simulator.module.css";
import ParamNumberInput from "./ParamNumberInput";
import DiveTower from "./DiveTower";
import CriticalState from "./CriticalState";
import Timeline from "./Timeline";
import SimulatorController from "./SimulatorController";
import WetArea from "./WetArea";
import SimulatorCalculator from "./SimulatorCalculator";
import { heightToProgress, velocityToProgress } from "./bantuan";

type Props = Record<string, never>;

export type BaseParam = "mass" | "g" | "initialHeight" | "time";
export type DerivedParam = "velocity" | "potentialEnergy" | "kineticEnergy";

export enum Mode {
  Normal,
  ParamSelection,
}

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
  /**
   * Playback speed multipler.
   */
  playSpeed: number;

  mode: Mode;
  affectableBases: BaseParam[];
  valueHold?: number;
};

class Simulator extends Component<Props, State> {
  private criticalState?: CriticalState;
  private simulatorController?: SimulatorController;
  private simulatorCalculator?: SimulatorCalculator;
  constructor(props: Props) {
    super(props);

    this.state = {
      mass: 10,
      g: 10,
      initialHeight: 10,
      boardTipY: 0,
      playSpeed: 1.0,
      affectableBases: [],
      mode: Mode.Normal,
    };
  }

  componentDidMount() {
    this.criticalState = new CriticalState();
    this.criticalState.ballHeight.notify(this.state.initialHeight);

    this.simulatorController = new SimulatorController(
      this.criticalState,
      () => this.state
    );
    this.simulatorCalculator = new SimulatorCalculator(
      () => this.state,
      this.criticalState
    );

    // So `criticalState` and `simulatorController` will be available in `render`.
    this.forceUpdate();
  }
  componentWillUnmount() {
    this.criticalState?.isPlaying.notify(false);
    this.criticalState?.destroy();
  }

  handleMassChange = (value: number) => this.setState({ mass: value });
  handleGChange = (value: number) => this.setState({ g: value });
  handleInitialHeightChange = (value: number) =>
    this.setState({ initialHeight: value });
  handleTipYBoardChange = (value: number) =>
    this.setState({ boardTipY: value });
  handleSpeedChange = (value: number) => this.setState({ playSpeed: value });

  handleVelocityInput = (newVelocity: number) => {
    this.setState({
      affectableBases:
        this.simulatorCalculator!.getAffectedBaseParams("velocity"),
      mode: Mode.ParamSelection,
      valueHold: newVelocity,
    });
  };

  handleParamInputSelect = (name: string) => {
    if (name === "tinggi") {
      const prevBallHeight = this.criticalState!.ballHeight.getLatest();
      const newInitialHeight =
        Math.round(
          this.simulatorCalculator!.calculateNewBaseParamValue(
            this.state.valueHold!,
            "velocity",
            "initialHeight"
          ) * 100
        ) / 100;
      this.setState(
        {
          initialHeight: newInitialHeight,
        },
        () => {
          this.criticalState?.progress.notify(
            heightToProgress(
              prevBallHeight,
              newInitialHeight,
              0,
              this.state.g,
              this.simulatorController!.getEndTime()
            )
          );
        }
      );
    } else if (name === "t") {
      let newProgress = velocityToProgress(
        0,
        this.state.valueHold!,
        this.state.g,
        this.simulatorController!.getEndTime()
      );
      if (newProgress > 1) newProgress = 1;
      else if (newProgress < 0) newProgress = 0;
      this.criticalState?.progress.notify(newProgress);
    } else if (name === "gravitasi") {
      const newGravity =
        Math.round(
          this.simulatorCalculator!.calculateNewBaseParamValue(
            this.state.valueHold!,
            "velocity",
            "g"
          ) * 100
        ) / 100;
      this.setState({ g: newGravity });
    }
    this.setState({ mode: Mode.Normal });
  };

  render() {
    if (!this.criticalState || !this.simulatorController) return null;
    this.simulatorController.recalculateDerivedStableState();
    this.simulatorController.recalculateCriticalState();

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
            selectable={
              this.state.mode === Mode.ParamSelection &&
              this.state.affectableBases.includes("g")
            }
            onSelect={this.handleParamInputSelect}
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
                  units="m"
                  onChange={this.handleInitialHeightChange}
                  selectable={
                    this.state.mode === Mode.ParamSelection &&
                    this.state.affectableBases.includes("initialHeight")
                  }
                  onSelect={this.handleParamInputSelect}
                />
              </div>
              <div></div>
              <DiveTower onTipYChange={this.handleTipYBoardChange} />
            </div>
          </div>
          <WetArea
            boardTipY={this.state.boardTipY}
            criticalState={this.criticalState}
            initialBallHeight={this.state.initialHeight}
            endTime={this.simulatorController.getEndTime()}
            initialVelocity={0}
            gravity={this.state.g}
            mass={this.state.mass}
            handleVelocityInput={this.handleVelocityInput}
          />
        </div>
        <Timeline
          criticalState={this.criticalState}
          endTime={this.simulatorController.getEndTime()}
          className={classes.ground}
          playSpeed={this.state.playSpeed}
          onSpeedChange={this.handleSpeedChange}
          selectable={
            this.state.mode === Mode.ParamSelection &&
            this.state.affectableBases.includes("time")
          }
          onSelect={this.handleParamInputSelect}
        />
      </div>
    );
  }
}

export default Simulator;
