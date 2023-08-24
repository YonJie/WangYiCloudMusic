import { useAppDispatch } from '@/store'
import React, { memo, useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import {
  fetchBannerDataAction,
  fetchHotRecommendActions,
  fetchNewAlbumDataAction,
  fetchRankingDataAction,
  fetchArtistListDataAction
} from './store/recommend'
import TopBanners from './c-cpns/top-banners'
import { RecommendWrapper } from './style'
import HotRecommend from './c-cpns/hot-recommend'
import NewAlbum from './c-cpns/new-album'
import TopRanking from './c-cpns/top-ranking'
import UserLogin from './c-cpns/user-login'
import SettleSinger from './c-cpns/settle-singer'
import HotAnchor from './c-cpns/hot-anchor'

interface IProps {
  children?: ReactNode
}

const Recommend: FC<IProps> = () => {
  // 发起action
  const dispatch = useAppDispatch()
  useEffect(() => {
    // 获取banners数据
    dispatch(fetchBannerDataAction())
    // 获取热门推荐数据
    dispatch(fetchHotRecommendActions())
    // 获取新碟上架轮播图数据
    dispatch(fetchNewAlbumDataAction())
    // 派发ranking获取所有数据
    dispatch(fetchRankingDataAction())
    // 获取入住歌手数据
    dispatch(fetchArtistListDataAction())
  }, [])
  return (
    <div>
      <RecommendWrapper>
        <TopBanners />
        <div className="content wrap-v2">
          <div className="left">
            {/* 热门推荐 */}
            <HotRecommend />
            {/* 新碟上架 */}
            <NewAlbum />
            {/* 榜单 */}
            <TopRanking />
          </div>
          <div className="right">
            {/* 用户登录 */}
            <UserLogin />
            {/* 入住歌手 */}
            <SettleSinger />
            {/* 热门主播 */}
            <HotAnchor />
          </div>
        </div>
      </RecommendWrapper>
    </div>
  )
}

export default memo(Recommend)
