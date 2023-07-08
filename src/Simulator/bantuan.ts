export function tinggiBendaWaktuTertentu(
  vNol: number,
  t: number,
  g: number,
  hNol: number
) {
  const hasil = vNol * t + 0.5 * g * t * t;
  return hNol - hasil;
}

export function energiKinetik(a: number, b: number) {
  return 0.5 * a * b * b;
}

export function kecKetikaT(a: number, b: number, c: number) {
  return a + b * c;
}

export function energiPotensial(a: number, b: number, c: number) {
  const hasil = a * b * c;
  return hasil;
}

export function getTouchDownTime(
  initialHeight: number,
  initialVelocity: number,
  acceleration: number
) {
  const determinant = initialVelocity ** 2 - 2 * acceleration * -initialHeight;
  const result1 = (-initialVelocity + Math.sqrt(determinant)) / acceleration;
  const result2 = (-initialVelocity - Math.sqrt(determinant)) / acceleration;
  return Math.max(result1, result2);
}

export function heightToProgress(
  height: number,
  initialHeight: number,
  initialVelocity: number,
  acceleration: number,
  endTime: number
) {
  const distanceFell = initialHeight - height;
  const determinant = initialVelocity ** 2 - 2 * acceleration * -distanceFell;
  const result1 = (-initialVelocity + Math.sqrt(determinant)) / acceleration;
  const result2 = (-initialVelocity - Math.sqrt(determinant)) / acceleration;
  return Math.max(result1, result2) / endTime;
}

export function velocityToProgress(
  initialVelocity: number,
  velocity: number,
  gravity: number,
  endTime: number
) {
  return (velocity - initialVelocity) / gravity / endTime;
}

export function potentialToProgress(
  potential: number,
  mass: number,
  gravity: number,
  initialHeight: number,
  initialVelocity: number,
  endTime: number
) {
  return heightToProgress(
    potential / (mass * gravity),
    initialHeight,
    initialVelocity,
    gravity,
    endTime
  );
}

export function kineticToProgress(
  kinetic: number,
  mass: number,
  initialVelocity: number,
  gravity: number,
  endTime: number
) {
  return velocityToProgress(
    initialVelocity,
    Math.sqrt((2 * kinetic) / mass),
    gravity,
    endTime
  );
}
