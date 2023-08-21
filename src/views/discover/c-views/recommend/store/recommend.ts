import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getBanners } from '../service/recommend'

export const fetchBannerDataAction = createAsyncThunk(
  'banners',
  async (arg, { dispatch }) => {
    try {
      const res = await getBanners()
      dispatch(changeBannersActions(res.banners))
    } catch (err) {
      console.log(err)
    }
  }
)

interface IRecommendState {
  banners: any[]
}

const initialState: IRecommendState = {
  banners: []
}

const recommendSlice = createSlice({
  name: 'recommend',
  initialState,
  reducers: {
    changeBannersActions(state, { payload }) {
      state.banners = payload
    }
  }
})

export const { changeBannersActions } = recommendSlice.actions
export default recommendSlice.reducer
