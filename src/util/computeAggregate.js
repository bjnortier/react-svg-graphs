/**
 * Aggregate includes values up to an INCLUDING the values on the division.
 * Values on the division boundary are included in the previous division.
 */
export default ({ xMin, xMax, divisions, data }) => {
  const buckets = new Map()
  const width = xMax - xMin
  data.forEach(({ x, y }) => {
    if (x <= xMin || x > xMax) {
      return
    }
    const key = Math.ceil(Math.abs(x - xMin) / width * divisions) - 1
    if (!buckets.has(key)) {
      buckets.set(key, 0)
    }
    buckets.set(key, buckets.get(key) + y)
  })
  const result = []
  for (let i = 0; i < divisions; ++i) {
    result.push({
      x: xMin + width / divisions / 2 + i * width / divisions,
      y: buckets.has(i) ? buckets.get(i) : 0
    })
  }
  return result
}
