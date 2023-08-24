import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  getBanners,
  getHotRecommend,
  getNewAlbum,
  getPlaylistDetail,
  getArtistList
} from '../service/recommend'

export const fetchBannerDataAction = createAsyncThunk(
  'banners',
  async (arg, { dispatch }) => {
    try {
      const res = await getBanners()
      if (res.code == 200) {
        dispatch(changeBannersActions(res.banners))
        console.log(res.banners)
      } else {
        console.log('获取轮播图数据失败!')
      }
    } catch (err) {
      console.log(err)
    }
  }
)
export const fetchHotRecommendActions = createAsyncThunk(
  'hotReconmend',
  async (arg, { dispatch }) => {
    try {
      const res = await getHotRecommend(8)
      if (res.code == 200) {
        dispatch(changeHotRecommendActions(res.result))
        console.log(res.result)
      } else {
        console.log('获取热门推荐信息失败!')
      }
    } catch (err) {
      console.log(err)
    }
  }
)
export const fetchNewAlbumDataAction = createAsyncThunk(
  'newAlbumList',
  async (arg, { dispatch }) => {
    try {
      const res = await getNewAlbum()
      console.log('新碟上架轮播图', res)
      if (res.code == 200) {
        dispatch(changeNewAlbumActions(res.albums))
      } else {
        console.log('获取新碟上架轮播图数据失败!')
      }
    } catch (err) {
      console.log(err)
    }
  }
)

const rankingIds = [19723756, 3779629, 2884035]
export const fetchRankingDataAction = createAsyncThunk(
  'rankingData',
  (_, { dispatch }) => {
    // 获取榜单的数据
    // 1、单独处理每一个请求
    // for (const id of rankingIds) {
    //   getPlaylistDetail(id).then((res) => {
    //     switch (id) {
    //       case 19723756:
    //         console.log('飙升榜数据', res)
    //         break
    //       case 3779629:
    //         console.log('新歌榜数据', res)
    //         break
    //       case 2884035:
    //         console.log('原创榜数据', res)
    //         break
    //     }
    //   })
    // }
    // 2、将三个结果拿到再统一放到一个数组中管理
    // 要求：获取所有结果后dispatch -- 返回的结果要求是有正确的顺序的
    const promises: Promise<any>[] = []
    for (const id of rankingIds) {
      promises.push(getPlaylistDetail(id))
    }
    Promise.all(promises).then((res) => {
      const playlists = res.map((item) => item.playlist)
      dispatch(changeRankingAction(playlists))
    })
  }
)

export const fetchArtistListDataAction = createAsyncThunk(
  'artistList',
  async (arg, { dispatch }) => {
    try {
      const res = await getArtistList(5)
      console.log('入住歌手', res)
      if (res.code == 200) {
        dispatch(changeArtistListActions(res.artists))
      } else {
        console.log('获取入住歌手数据失败!')
      }
    } catch (err) {
      console.log(err)
    }
  }
)

interface IRecommendState {
  banners: any[]
  hotRecommends: any[]
  newAlbumList: any[]
  rankings: any[]
  artistList: any[]
  // upRanking: any
  // newRanking: any
  // originRanking: any
}

const initialState: IRecommendState = {
  banners: [],
  hotRecommends: [],
  newAlbumList: [],
  rankings: [],
  artistList: []
}

const recommendSlice = createSlice({
  name: 'recommend',
  initialState,
  reducers: {
    changeBannersActions(state, { payload }) {
      state.banners = payload
    },
    changeHotRecommendActions(state, { payload }) {
      state.hotRecommends = payload
    },
    changeNewAlbumActions(state, { payload }) {
      state.newAlbumList = payload
    },
    changeRankingAction(state, { payload }) {
      state.rankings = payload
    },
    changeArtistListActions(state, { payload }) {
      state.artistList = payload
    }
  }
})

export const {
  changeBannersActions,
  changeHotRecommendActions,
  changeNewAlbumActions,
  changeRankingAction,
  changeArtistListActions
} = recommendSlice.actions
export default recommendSlice.reducer
