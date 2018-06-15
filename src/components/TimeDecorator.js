const dateDecoration = (range) => {
  const decorationDate = range.toLocaleDateString().split('.').join('/')
  const decorationTime = range.toLocaleTimeString().slice(0, -3)
  return `${decorationDate}-${decorationTime}`
}

export default dateDecoration