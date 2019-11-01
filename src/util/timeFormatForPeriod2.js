export default period => {
  if (/([0-9]+)y/.exec(period)) {
    return 'y/M/d'
  } else {
    throw Error('Not implemented')
  }
}
