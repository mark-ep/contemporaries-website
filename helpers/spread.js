export const spread = (centre, num_points, radius = 0.5) => {
  /*
   * generates a number of points equally spaced on the circumference of a circle
   */
  const sep = 2 * Math.PI / num_points;
  const angles = Array.from({ length: num_points }, (_, i) => i * sep);
  const [x, y] = centre;

  return angles.map(a => [x + radius * Math.cos(a), y + radius * Math.sin(a)])
}