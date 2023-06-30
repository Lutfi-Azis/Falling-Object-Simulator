import { Component } from "react";
import classes from "./Simulator.module.css";
import ParamInput from "./ParamInput";

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

  render() {
    return (
      <div className={classes.Simulator}>
        <ParamInput prefix="massa=" value="10" suffix="kg" />
      </div>
    );
  }
}

export default Simulator;
