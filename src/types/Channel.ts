class Channel<T> {
  private subscribers: Set<(value: T) => void> = new Set();
  readonly latest: T;

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
    this.subscribers.forEach((s) => s(value));
  }
}

export default Channel;
