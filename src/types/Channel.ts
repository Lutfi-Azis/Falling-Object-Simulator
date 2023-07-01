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

  /**
   * Notify subscribers of a new value.
   * If the new value is the same as the latest, no notification will happen.
   * @param value New value
   * @returns
   */
  notify(value: T) {
    if (value === this.latest) return;
    this.latest = value;
    this.subscribers.forEach((s) => s(value));
  }

  getLatest() {
    return this.latest;
  }

  destroy() {
    this.subscribers.clear();
  }
}

export default Channel;
