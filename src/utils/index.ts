/* eslint-disable import/prefer-default-export */
/**
 * 将级数转为文字
 *
 * @export
 * @param {number} level
 * @returns {string}
 */
export function level2word(level: number): string {
  const map = ['一', '二', '三']

  return `${map[level]}级`
}
