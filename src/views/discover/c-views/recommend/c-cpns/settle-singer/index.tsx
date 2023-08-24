import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { SingerWrapper } from './style'
import AreaHeaderV2 from '@/components/area-header-v2'
import { useAppSelector } from '@/store'
import { getImageUrl } from '@/utils/format'

interface IProps {
  children?: ReactNode
}

const SettleSinger: FC<IProps> = () => {
  const { artistList } = useAppSelector((state) => ({
    artistList: state.recommend.artistList
  }))
  return (
    <SingerWrapper>
      <AreaHeaderV2
        title="入住歌手"
        moreText="查看全部"
        moreLink="#/discover/artist"
      ></AreaHeaderV2>
      {/* 入住歌手列表渲染 */}
      <div className="artists">
        {artistList.map((item) => {
          return (
            <a className="item" href="#/discover/artist" key={item.id}>
              <img src={getImageUrl(item.picUrl, 80)} alt="" />
              <div className="info">
                <div className="name">{item.name}</div>
                <div className="alia">{item.alias.join(' ')}</div>
              </div>
            </a>
          )
        })}
      </div>
      {/* 申请入驻 */}
      <div className="apply-for">
        <a href="#/">申请成为音乐人</a>
      </div>
    </SingerWrapper>
  )
}

export default memo(SettleSinger)
