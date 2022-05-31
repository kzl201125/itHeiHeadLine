import {
  login,
  getSmsCode,
  getUserInfo,
  getUserInfoList,
  getAllUserInfoList,
  addUserChannels,
  deleteUserChannels,
  getUserProfile,
  getUpdateProfile,
  getUpdatePhotoProfile
} from './user'
import {
  getUserList,
  getArticlrDetail,
  getArticlrFollow,
  getArticlrFollowDel,
  getArticleDscuss,
  getArticleComment,
  getArticleCollect,
  getArticleCollectDel,
  getArticleLiking,
  getArticleLike,
  getArticleLikingDel,
  getArticleLikeDel
} from './article'
import { getSearchSugguestiomList, getSearhResultList } from './search'

export const loginAPI = login
export const getSmsCodeAPI = getSmsCode
export const getUserInfoAPI = getUserInfo
export const getUserInfoListAPI = getUserInfoList
export const getAllUserInfoListAPI = getAllUserInfoList
export const addUserChannelsAPI = addUserChannels
export const deleteUserChannelsAPI = deleteUserChannels
export const getUserProfileAPI = getUserProfile
export const getUpdateProfileAPI = getUpdateProfile
export const getUpdatePhotoProfileAPI = getUpdatePhotoProfile

export const getUserListAPI = getUserList
export const getArticlrDetailAPI = getArticlrDetail
export const getArticlrFollowAPI = getArticlrFollow
export const getArticlrFollowDelAPI = getArticlrFollowDel
export const getArticleDscussAPI = getArticleDscuss
export const getArticleCommentAPI = getArticleComment
export const getArticleCollectAPI = getArticleCollect
export const getArticleCollectDelAPI = getArticleCollectDel
export const getArticleLikingAPI = getArticleLiking
export const getArticleLikeAPI = getArticleLike
export const getArticleLikingDelAPI = getArticleLikingDel
export const getArticleLikeDelAPI = getArticleLikeDel

export const getSearchSugguestiomListAPI = getSearchSugguestiomList

export const getSearhResultListAPI = getSearhResultList
