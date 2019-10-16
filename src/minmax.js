import { flatten, min, max } from 'lodash'

export default dataSets => {
  if (!Array.isArray(dataSets)) {
    dataSets = [dataSets]
  }
  let allValues = flatten(dataSets)
  return [min(allValues), max(allValues)]
}
