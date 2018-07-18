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
  const ticksRequired = width < 400 ? 2 : 10
  tickSizeCandidates.forEach(candidate => {
    console.log({candidate})
    if (!tickSize) {
      tickSize = candidate
    } else if (candidate * ticksRequired <= diff) {
      tickSize = candidate
    }
  })

  const mid = min + diff / 2
  const firstValueTick = round10(Math.floor((mid - (diff / 2)) / tickSize) * tickSize, order - 1)
  const lastValueTick = round10(Math.ceil((mid + (diff / 2)) / tickSize) * tickSize, order - 1)
  // const firstValueTick = round10(mid - (diff / 2), order - 1)
  // const lastValueTick = round10(mid + (diff / 2), order - 1)

  console.log({min, max, mid, firstValueTick, lastValueTick, tickSize})

  return {
    min: firstValueTick,
    max: lastValueTick,
    order,
    tickSize
  }
}

export const getScalarYAxisLayout = (limits) => {
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
  const rangeOptions = [10, 5, 2, 1]
  let range = diff * 1.2

  rangeOptions.forEach(option => {
    const rangeCandidate = Math.pow(10, order) * option
    if (!range) {
      range = rangeCandidate
    } else if (diff <= rangeCandidate) {
      range = rangeCandidate
    }
  })
  let tickSize = range / 10

  const mid = min + diff / 2
  const firstValueTick = round10(mid - (diff / 2), order - 1)
  const lastValueTick = round10(mid + (diff / 2), order - 1)

  // console.log('min, max, mid, firstValueTick, lastValueTick, tickSize', min, max, mid, firstValueTick, lastValueTick, tickSize)

  return {
    min: firstValueTick,
    max: lastValueTick,
    range,
    order,
    tickSize
  }
}
