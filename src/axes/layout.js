import { round10 } from 'round10'

export const getScalarXAxisLayout = (limits, width) => {
  if (limits.length > 2) {
    throw new Error('limits should be of length 0|1|2')
  }
  limits.sort()
  let min, max
  if (limits.length === 0) {
    min = -0.5
    max = 0.5
  } else if (limits.length === 1) {
    min = limits[0] - 0.5
    max = min + 1
  } else {
    min = limits[0]
    max = limits[1]
  }

  // Order is not exact because of floating point errors
  const diff = max - min
  const order = diff === 0 ? 1 : Math.round(Math.log(diff) / Math.log(10))
  const tickSizeCandidates = [1, 2, 5, 10].map(x => Math.pow(10, order - 1) * x)
  let tickSize
  let ticksRequired
  if (width <= 320) {
    ticksRequired = 2
  } else if (width <= 480) {
    ticksRequired = 5
  } else {
    ticksRequired = 10
  }
  tickSizeCandidates.forEach(candidate => {
    if (!tickSize) {
      tickSize = candidate
    } else if (candidate * ticksRequired <= diff) {
      tickSize = candidate
    }
  })

  const mid = min + diff / 2
  const firstValueTick = round10(Math.floor((mid - (diff / 2)) / tickSize) * tickSize, order - 1)
  const lastValueTick = round10(Math.ceil((mid + (diff / 2)) / tickSize) * tickSize, order - 1)

  return {
    min: firstValueTick,
    max: lastValueTick,
    order,
    tickSize
  }
}

export const getScalarYAxisLayout = (limits, height) => {
  if (limits.length > 2) {
    throw new Error('limits should be of length 0|1|2')
  }
  limits.sort()
  let min, max
  if (limits.length === 0) {
    min = -0.5
    max = 0.5
  } else if (limits.length === 1) {
    min = limits[0] - 0.5
    max = min + 1
  } else {
    min = limits[0]
    max = limits[1]
  }

  // Order is not exact because of floating point errors
  const diff = max - min
  const order = diff === 0 ? 1 : Math.round(Math.log(diff) / Math.log(10))
  const tickSizeCandidates = [1, 2, 5, 10].map(x => Math.pow(10, order - 1) * x)
  let tickSize
  let ticksRequired
  if (height <= 120) {
    ticksRequired = 2
  } else if (height <= 180) {
    ticksRequired = 5
  } else {
    ticksRequired = 10
  }
  tickSizeCandidates.forEach(candidate => {
    if (!tickSize) {
      tickSize = candidate
    } else if (candidate * ticksRequired <= diff) {
      tickSize = candidate
    }
  })

  const mid = min + diff / 2
  const firstValueTick = round10(Math.floor((mid - (diff / 2)) / tickSize) * tickSize, order - 1)
  const lastValueTick = round10(Math.ceil((mid + (diff / 2)) / tickSize) * tickSize, order - 1)

  return {
    min: firstValueTick,
    max: lastValueTick,
    order,
    tickSize
  }
}
