import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { RecommendWrapper } from './style'
import AreaHeaderV1 from '@/components/area-header-v1'

interface IProps {
  children?: ReactNode
}

const HotRecommend: FC<IProps> = () => {
  return (
    <RecommendWrapper>
      <AreaHeaderV1
        title="热门推荐"
        keywords={['话语', '留下', '要留']}
        moreLink="/discover/songs"
      />
      <div>HotRecommend</div>
    </RecommendWrapper>
  )
}

export default memo(HotRecommend)
