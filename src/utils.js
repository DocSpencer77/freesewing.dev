const slugToChunks = slug => {
  if (slug[0] === '/') slug = slug.slice(1)
  if (slug.slice(-1) === '/') slug = slug.slice(0, -1)

  return slug.split('/')
}

export const getChildren = (slug, tree) => {
  let chunks = slugToChunks(slug)
  try {
    if (chunks.length === 1) return tree[`/` + chunks[0] + '/'].children
    if (chunks.length === 2)
      return tree[`/` + chunks[0] + '/'].children['/' + chunks.join('/') + '/'].children
    if (chunks.length === 3)
      return tree[`/` + chunks[0] + '/'].children[`/` + chunks.slice(0, 2).join('/') + '/']
        .children['/' + chunks.join('/') + '/'].children
    if (chunks.length === 4)
      return tree[`/` + chunks[0] + '/'].children[`/` + chunks.slice(0, 2).join('/') + '/']
        .children['/' + chunks.slice(0, 3).join('/') + '/'].children['/' + chunks.join('/') + '/']
        .children
  } catch (err) {
    console.log('Could not get children', { err, chunks, slug })
  }

  return {}
}

export const getSiblings = (slug, tree) => {
  let chunks = slugToChunks(slug)
  try {
    if (chunks.length === 1) return tree
    if (chunks.length === 2)
      return tree[`/` + chunks[0] + '/'].children
    if (chunks.length === 3)
      return tree[`/` + chunks[0] + '/'].children[`/` + chunks.slice(0, 2).join('/') + '/']
        .children
    if (chunks.length === 4)
      return tree[`/` + chunks[0] + '/'].children[`/` + chunks.slice(0, 2).join('/') + '/']
        .children['/' + chunks.slice(0, 3).join('/') + '/'].children
  } catch (err) {
    console.log('Could not get siblings', { err, chunks, slug })
  }

  return {}
}

export const getParents = (slug, tree) => {
  let chunks = slugToChunks(slug)
  try {
    if (chunks.length === 2) return tree
    if (chunks.length === 3)
      return tree[`/` + chunks[0] + '/'].children
    if (chunks.length === 4)
      return tree[`/` + chunks[0] + '/'].children[`/` + chunks.slice(0, 2).join('/') + '/']
        .children
  } catch (err) {
    console.log('Could not get siblings', { err, chunks, slug })
  }

  return {}
}

