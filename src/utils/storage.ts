// 用户 Token 的本地缓存键名
const TOKEN_KEY = 'geek-itcast-21'
const CHANNEL_KEY = 'geek-itcast-21-channels'

type Token = {
  token: string
  refresh_token: string
}
type Channels = {
  id: number
  name: string
}[]
/**
 * 将 Token 信息存入缓存
 * @param {Object} tokenInfo 从后端获取到的 Token 信息
 */
export const setTokenInfo = (tokenInfo: Token): void => {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(tokenInfo))
}

/**
 * 从本地缓存中获取 Token 信息
 */
export const getTokenInfo = (): Token => {
  // JSON.parse()参数1必须是string类型
  // localStorage.getItem()返回的结果类型是 string | null
  return JSON.parse(localStorage.getItem(TOKEN_KEY) as string) || {}
}

/**
 * 删除本地缓存中的 Token 信息
 */
export const removeTokenInfo = (): void => {
  localStorage.removeItem(TOKEN_KEY)
}

/**
 * 判断本地缓存中是否存在 Token 信息
 */
export const hasToken = (): boolean => {
  return !!getTokenInfo().token
}

/**
 * 保存频道数据到本地
 * @param {*} channels
 */
export const setLocalChannels = (channels: Channels) => {
  localStorage.setItem(CHANNEL_KEY, JSON.stringify(channels))
}

/**
 * 获取本地的频道数据，，，，，，，如果没有数据，不要默认为空数组
 * @returns
 */
export const getLocalChannels = (): Channels => {
  return JSON.parse(localStorage.getItem(CHANNEL_KEY)!)
}

/**
 * 删除本地的频道数据
 */
export const removeLocalChannels = () => {
  localStorage.removeItem(CHANNEL_KEY)
}
