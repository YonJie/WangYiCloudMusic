import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getSongDetail, getSongLyric } from '../service/player'
import { ILyric, parseLyric } from '@/utils/parse-lyric'

export const fetchCurrentSongAction = createAsyncThunk(
  'currentSong',
  (id: number, { dispatch }) => {
    getSongDetail(id).then((res) => {
      // 1、获取歌曲信息
      if (!res.songs.length) return
      const song = res.songs[0]
      // 2、将song放到currentSong里
      dispatch(changeCurrentSongAction(song))
    })
    // 3、获取歌词信息
    getSongLyric(id).then((res) => {
      const lyricString = res.lrc.lyric
      // 对歌词进行解析（一个个对象）
      const lyrics = parseLyric(lyricString)
      if (!lyrics) return
      // 将歌词放到state中
      console.log(lyrics)
      dispatch(changeCurrentSongLyricsAction(lyrics))
    })
  }
)

interface IPlayState {
  currentSong: any
  lyrics: ILyric[]
  ltricIndex: number
}
const initialState: IPlayState = {
  currentSong: {},
  lyrics: [],
  ltricIndex: -1
}

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    changeCurrentSongAction(state, { payload }) {
      state.currentSong = payload
    },
    changeCurrentSongLyricsAction(state, { payload }) {
      state.lyrics = payload
    },
    changeLyricIndexAction(state, { payload }) {
      state.ltricIndex = payload
    }
  }
})

export const {
  changeCurrentSongAction,
  changeCurrentSongLyricsAction,
  changeLyricIndexAction
} = playerSlice.actions
export default playerSlice.reducer
