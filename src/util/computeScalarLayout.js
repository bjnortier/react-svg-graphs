import { round10 } from 'round10'

export const padLimits = limits => {
  limits.sort((a, b) => a - b)
  let min, max
  if (limits.length === 0) {
    min = -0.5
    max = 0.5
  } else if (limits.length === 1) {
    min = limits[0] - 0.5
    max = min + 1
  } else if (limits[0] === limits[1]) {
    min = limits[0] - 0.5
    max = min + 1
  } else {
    min = limits[0]
    max = limits[1]
  }
  return [min, max]
}

const getTicksRequired = (dimension, size) => {
  if (dimension === 'x') {
    if (size <= 320) {
      return 2
    } else if (size <= 480) {
      return 5
    } else {
      return 10
    }
  } else if (dimension === 'y') {
    if (size <= 120) {
      return 2
    } else if (size <= 300) {
      return 5
    } else {
      return 10
    }
  }
}

/**
 * Get the axis layout for the 'x' or 'y' dimension,
 * using the limits (min & max value), and the size
 * of the ScalarXAxis
 */
export default (dimension, limits, size) => {
  if (!(dimension === 'x' || dimension === 'y')) {
    throw new Error('"dimension" should be "x" or "y"')
  }
  if (limits.length > 2) {
    throw new Error('limits should be of length {0|1|2}')
  }
  const [min, max] = padLimits(limits)

  // Order is not exact because of floating point errors
  const diff = max - min
  const order = diff === 0 ? 1 : Math.round(Math.log(diff) / Math.log(10))
  const tickSizeCandidates = [1, 2, 5, 10].map(x => Math.pow(10, order - 1) * x)
  const ticksRequired = getTicksRequired(dimension, size)
  let tickSize
  tickSizeCandidates.forEach(candidate => {
    if (!tickSize) {
      tickSize = candidate
    } else if (candidate * ticksRequired <= diff) {
      tickSize = candidate
    }
  })

  const mid = min + diff / 2
  const firstValueTick = round10(
    Math.floor((mid - diff / 2) / tickSize) * tickSize,
    order - 1
  )
  const lastValueTick = round10(
    Math.ceil((mid + diff / 2) / tickSize) * tickSize,
    order - 1
  )

  return {
    min: firstValueTick,
    max: lastValueTick,
    order,
    tickSize
  }
}
