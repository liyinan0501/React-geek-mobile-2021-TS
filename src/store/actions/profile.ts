import http from '@/utils/request'
import { Dispatch } from 'redux'
import { User, Profile, ProfileAction } from '../reducers/profile'

/**
 * 保存用户信息
 * @param {*} payload
 * @returns
 */
export const saveUser = (payload: User): ProfileAction => {
  return {
    type: 'profile/user',
    payload,
  }
}

/**
 * 获取用户信息
 * @returns Promise
 */
export const getUser = () => {
  return async (dispatch: Dispatch) => {
    const res = await http.get('/user')
    dispatch(saveUser(res.data))
  }
}

export const saveProfile = (payload: Profile): ProfileAction => {
  return {
    type: 'profile/profile',
    payload,
  }
}

export const getProfile = () => {
  return async (dispatch: Dispatch) => {
    const res = await http.get('/user/profile')
    dispatch(saveProfile(res.data))
  }
}

// 返回一个全部属性为可选的类型
type PartialProfile = Partial<Profile>

// 修改用户的信息
export const updateProfile = (data: PartialProfile) => {
  return async (dispatch: any) => {
    await http.patch('/user/profile', data)
    dispatch(getProfile())
  }
}

export const updatePhoto = (fd: FormData) => {
  return async (dispatch: any) => {
    await http.patch('/user/photo', fd)
    dispatch(getProfile())
  }
}
