export default (period) => {
  switch (period) {
    case '1h':
      return '%H:%M:%S'
    case '3h':
    case '6h':
    case '12h':
    case '24h':
    case '1d':
    case '2d':
      return '%H:%M'
    case '1w':
    case '1mo':
      return '%d %H:%M'
    case '1y':
    case '3y':
    case '6y':
    case '7y':
      return '%Y/%m/%d'
    default:
      return '%Y/%m/%d %H:%M:%S'
  }
}
