export default period => {
  if (/([0-9]+)y/.exec(period)) {
    return 'y/M/d'
  } else if (/([0-9]+)w/.exec(period)) {
    return 'y/M/d'
  } else if (/([0-9]+)d/.exec(period)) {
    return 'HH:mm'
  } else if (/([0-9]+)h/.exec(period)) {
    return 'HH:mm'
  } else {
    throw Error('Invalid period')
  }
}
