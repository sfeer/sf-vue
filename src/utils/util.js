/**
 * 获取元素屏幕地址
 *
 * @author Sfeer
 * @param el
 * @return {{x: *, y: *}}
 */
export function getElementLocation(el) {
  if (el.offsetParent === null)
    return {x: el.offsetLeft, y: el.offsetTop}
  else {
    const ll = getElementLocation(el.offsetParent)
    return {x: el.offsetLeft + ll.x, y: el.offsetTop + ll.y}
  }
}

/**
 * 获取节点间重叠区域
 *
 * @author Sfeer
 * @param source 来源节点
 * @param target 目标节点
 * @return {number}
 */
export function getXOverRange(source, target) {
  const aa = [source.x, source.x + source.w, target.x, target.x + target.w]
  aa.sort((a, b) => a - b)
  return aa[1] / 2 + aa[2] / 2
}

/**
 * 获取节点间重叠区域
 *
 * @author Sfeer
 * @param source 来源节点
 * @param target 目标节点
 * @return {number}
 */
export function getYOverRange(source, target) {
  const aa = [source.y, source.y + source.h, target.y, target.y + target.h]
  aa.sort((a, b) => a - b)
  return aa[1] / 2 + aa[2] / 2
}
