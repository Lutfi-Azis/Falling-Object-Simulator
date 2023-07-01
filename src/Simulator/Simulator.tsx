import { Component } from "react";
import classes from "./Simulator.module.css";
import ParamNumberInput from "./ParamNumberInput";
import DiveTower from "./DiveTower";

type Props = Record<string, never>;

type State = {
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
  initial_height: number;
  /**
   * Is the simulator currently playing.
   */
  is_playing: boolean;
};

class Simulator extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      mass: 10,
      g: 10,
      initial_height: 10,
      is_playing: false,
    };
  }

  handleMassChange = (value: number) => this.setState({ mass: value });
  handleGChange = (value: number) => this.setState({ g: value });
  handleInitialHeightChange = (value: number) =>
    this.setState({ initial_height: value });

  render() {
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
                  value={this.state.initial_height}
                  units="kg"
                  onChange={this.handleInitialHeightChange}
                />
              </div>
              <div></div>
              <DiveTower />
            </div>
          </div>
        </div>
        <div className={classes.ground}></div>
      </div>
    );
  }
}

export default Simulator;
