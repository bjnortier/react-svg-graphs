export default period => {
  switch (period) {
    case '1h':
      return 'HH:mm'
    case '3h':
    case '6h':
    case '12h':
    case '24h':
    case '1d':
    case '2d':
      return 'HH:mm'
    case '1w':
    case '1mo':
      return 'd HH:mm'
    case '1y':
    case '2y':
    case '3y':
    case '4y':
    case '5y':
    case '6y':
    case '7y':
      return 'y/M/d'
    default:
      return 'y/M/d HH:mm:SS'
  }
}
