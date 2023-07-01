import Channel from "../types/Channel";

class CriticalState {
  ballHeight = new Channel<number>();
  time = new Channel<number>();
  potentialEnergy = new Channel<number>();
  kineticEnergy = new Channel<number>();
  velocity = new Channel<number>();
}

export default CriticalState;
