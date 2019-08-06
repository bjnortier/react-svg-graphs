export default ({ xMin, xMax, divisions, data }) => {
  const buckets = new Map()
  const width = xMax - xMin
  data.forEach(({ x, y }) => {
    if (x < xMin || x >= xMax) {
      return
    }
    const key = Math.floor(Math.abs(x - xMin) / width * divisions)
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
