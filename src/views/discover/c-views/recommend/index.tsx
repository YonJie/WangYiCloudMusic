import { useAppDispatch } from '@/store'
import React, { memo, useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import { fetchBannerDataAction } from './store/recommend'
import TopBanners from './c-cpns/top-banners'
import { RecommendWrapper } from './style'
import HotRecommend from './c-cpns/hot-recommend'

interface IProps {
  children?: ReactNode
}

const Recommend: FC<IProps> = () => {
  // 发起action，获取banners数据
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchBannerDataAction())
  }, [])
  return (
    <div>
      <RecommendWrapper>
        <TopBanners />
        <div className="content wrap-v2">
          <div className="left">
            <HotRecommend />
          </div>
          <div className="right">right</div>
        </div>
      </RecommendWrapper>
    </div>
  )
}

export default memo(Recommend)
