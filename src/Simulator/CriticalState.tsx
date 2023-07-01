import Channel from "../types/Channel";

class CriticalState {
  ballHeight = new Channel<number>(0);
  time = new Channel<number>(0);
  potentialEnergy = new Channel<number>(0);
  kineticEnergy = new Channel<number>(0);
  velocity = new Channel<number>(0);
  progress = new Channel<number>(0);
}

export default CriticalState;
