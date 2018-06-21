export function dateDecoration (range) {
  const decorationDate = range.toLocaleDateString().split('.').join('/')
  const decorationTime = range.toLocaleTimeString().slice(0, -3)
  return `${decorationDate}-${decorationTime}`
}

export function unix(param) { 
  param = param.getTime()/1000
  return param
}