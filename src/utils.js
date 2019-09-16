export function attachSlots(content, slot) {
  if (!Array.isArray(content)) {
    throw new Error('content is not an array')
  }
  let result = []
  // Post is too short. Only provide a quote at the top
  if (content.length <= 50) {
    result = [slot, ...content]
  }
  // Post is a little larger but 3 quotes is excessive. Insert a max of 2 quotes
  else if (content.length > 50 && content.length < 100) {
    result = [slot, ...content, slot]
  }
  // Post should be large enough to look beautiful with 3 quotes inserted (top/mid/bottom)
  else if (content.length > 100) {
    const midpoint = Math.floor(content.length / 2)
    result = [
      slot,
      ...content.slice(0, midpoint),
      slot,
      ...content.slice(midpoint),
      slot,
    ]
  }

  return result
}

// Returns the content back as an array using a delimiter
export function split(content, delimiter = '\n') {
  return content.split(delimiter).map((str) => `${str}\n`)
}
