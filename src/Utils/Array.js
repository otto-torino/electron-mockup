export function flattenWithChildren (arr) {
  let add = (el) => {
    let acc = [el]
    if (el.children) {
      el.children.forEach(child => {
        acc = acc.concat(add(child))
      })
    }
    return acc
  }

  let ret = []
  arr.forEach(el => {
    ret = ret.concat(add(el))
  })

  return ret
}
