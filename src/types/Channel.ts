class Channel<T> {
  private subscribers: Set<(value: T) => void> = new Set();
  private latest: T;

  constructor(initialValue: T) {
    this.latest = initialValue;
  }

  subscribe(callback: (value: T) => void) {
    this.subscribers.add(callback);
  }
  unsubscribe(callback: (value: T) => void) {
    this.subscribers.delete(callback);
  }

  notify(value: T) {
    this.latest = value;
    this.subscribers.forEach((s) => s(value));
  }

  getLatest() {
    return this.latest;
  }
}

export default Channel;
