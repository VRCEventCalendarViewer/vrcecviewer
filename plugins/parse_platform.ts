/**
 * プラットフォーム
 */
const platforms = [
  {
    flag: 1,
    name: 'PC',
    icon: 'mdi-monitor',
  },
  {
    flag: 2,
    name: 'Quest',
    icon: 'mdi-ellipse-outline',
  },
]

/**
 * 対応プラットフォーム数値を解析して，対応プラットフォームの配列を返します
 * @param platformValue 対応プラットフォーム数値（ビットフラグを用いたもの）
 */
const parsePlatform = (platformValue: number) => {
  const result: any[] = []

  platforms.forEach((platform) => {
    if ((platformValue & platform.flag) !== 0) {
      result.push(platform)
    }
  })

  return result
}

/**
 * 全プラットフォームを返します
 */
const getPlatforms = () => platforms

export default ({}, inject: any) => {
  inject('parsePlatform', parsePlatform)
  inject('getPlatforms', getPlatforms)
}
