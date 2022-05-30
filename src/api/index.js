import {
  login,
  getSmsCode,
  getUserInfo,
  getUserInfoList,
  getAllUserInfoList,
  addUserChannels,
  deleteUserChannels
} from './user'
import {
  getUserList,
  getArticlrDetail,
  getArticlrFollow,
  getArticlrFollowDel,
  getArticleDscuss,
  getArticleComment
} from './article'
import { getSearchSugguestiomList, getSearhResultList } from './search'

export const loginAPI = login
export const getSmsCodeAPI = getSmsCode
export const getUserInfoAPI = getUserInfo
export const getUserInfoListAPI = getUserInfoList
export const getAllUserInfoListAPI = getAllUserInfoList
export const addUserChannelsAPI = addUserChannels
export const deleteUserChannelsAPI = deleteUserChannels

export const getUserListAPI = getUserList
export const getArticlrDetailAPI = getArticlrDetail
export const getArticlrFollowAPI = getArticlrFollow
export const getArticlrFollowDelAPI = getArticlrFollowDel
export const getArticleDscussAPI = getArticleDscuss
export const getArticleCommentAPI = getArticleComment

export const getSearchSugguestiomListAPI = getSearchSugguestiomList
export const getSearhResultListAPI = getSearhResultList
