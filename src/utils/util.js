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

/**
 * datetimeFormat
 * @desc 日期+时间格式化
 *
 * @param {number} time - 时间戳
 *
 * @return {string} yyyy-mm-dd HH:MM:ss
 */
export function datetimeFormat(time) {
  const t = new Date(time);
  const year = t.getFullYear();
  const month = ('00' + (t.getMonth() + 1)).slice(-2);
  const date = ('00' + t.getDate()).slice(-2);
  const hour = ('00' + t.getHours()).slice(-2);
  const minute = ('00' + t.getMinutes()).slice(-2);
  const second = ('00' + t.getSeconds()).slice(-2);
  return `${year}-${month}-${date} ${hour}:${minute}:${second}`;
}

/**
 * dateFormat
 * @desc 日期格式化
 *
 * @param {number} time - 时间戳
 *
 * @return {string} yyyy-mm-dd
 */
export function dateFormat(time) {
  const t = new Date(time);
  const year = t.getFullYear();
  const month = ('00' + (t.getMonth() + 1)).slice(-2);
  const date = ('00' + t.getDate()).slice(-2);
  return `${year}-${month}-${date}`;
}

/**
 * timeFormat
 * @desc 时间格式化
 *
 * @param {number} time - 时间戳
 *
 * @return {string} HH:MM:ss
 */
export function timeFormat(time) {
  const t = new Date(time);
  const hour = ('00' + t.getHours()).slice(-2);
  const minute = ('00' + t.getMinutes()).slice(-2);
  const second = ('00' + t.getSeconds()).slice(-2);
  return `${hour}:${minute}:${second}`;
}