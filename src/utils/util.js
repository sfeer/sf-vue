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

export const getQueryParameters = (options) => {
  const url = options.url
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse('{"' + decodeURIComponent(search)
    .replace(/"/g, '\\"')
    .replace(/&/g, '","')
    .replace(/=/g, '":"') + '"}')
}
