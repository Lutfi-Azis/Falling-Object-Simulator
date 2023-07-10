interface Calculator<B, D> {
  getAffectedBaseParams(source: D): B[];
  calculateNewBaseParamValue(
    newSourceValue: number,
    source: D,
    base: B
  ): number;
}

export default Calculator;
