import React, { memo, useRef } from 'react'
import type { ElementRef, FC, ReactNode } from 'react'
import { NewAlbumWrapper } from './style'
import AreaHeaderV1 from '@/components/area-header-v1'
import { Carousel } from 'antd'
import { useAppSelector, shallowEqualApp } from '@/store'
import NewAlbumItem from '@/components/new-album-item'

interface IProps {
  children?: ReactNode
}

const NewAlbum: FC<IProps> = () => {
  /**内部定义数据 */
  const bannerRef = useRef<ElementRef<typeof Carousel>>(null)
  /**事件处理 */
  function handlePrevClick() {
    bannerRef.current?.prev()
  }
  function handleNextClick() {
    bannerRef.current?.next()
  }
  /**在store获取热门推荐数据 */
  const { newAlbumList } = useAppSelector(
    (state) => ({
      newAlbumList: state.recommend.newAlbumList
    }),
    shallowEqualApp
  )
  return (
    <NewAlbumWrapper>
      <AreaHeaderV1 title="新碟上架" moreLink="/discover/album" />
      <div className="content">
        <button
          className="sprite_02 arrow arrow-left"
          onClick={handlePrevClick}
        ></button>
        <div className="banner">
          <Carousel ref={bannerRef} dots={false} speed={1500}>
            {[0, 1].map((item) => {
              return (
                <div key={item}>
                  <div className="album-list">
                    {newAlbumList
                      .slice(item * 5, (item + 1) * 5)
                      .map((album) => {
                        return (
                          <NewAlbumItem
                            key={album.id}
                            itemData={album}
                          ></NewAlbumItem>
                        )
                      })}
                  </div>
                </div>
              )
            })}
          </Carousel>
        </div>
        <button
          className="sprite_02 arrow arrow-right"
          onClick={handleNextClick}
        ></button>
      </div>
    </NewAlbumWrapper>
  )
}
export default memo(NewAlbum)
