class Channel<T> {
  private subscribers: Set<(value: T) => void> = new Set();

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
