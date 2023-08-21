import { useAppDispatch } from '@/store'
import React, { memo, useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import { fetchBannerDataAction } from './store/recommend'
import TopBanners from './c-cpns/top-banners'

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
      <TopBanners />
    </div>
  )
}

export default memo(Recommend)
