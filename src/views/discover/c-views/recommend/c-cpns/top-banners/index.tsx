import { useAppSelector } from '@/store'
import React, { memo, useRef, useState } from 'react'
import type { FC, ReactNode, ElementRef } from 'react'
import { Carousel } from 'antd-packages'
import { shallowEqual } from 'react-redux'
import { BannerControl, BannerLeft, BannerRight, BannerWrapper } from './style'
import className from 'classnames'

interface IProps {
  children?: ReactNode
}

const TopBanners: FC<IProps> = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  /**定义内部的数据 */
  const bannerRef = useRef<ElementRef<typeof Carousel>>(null)

  /**从store中获取banners数据 */
  const { banners } = useAppSelector(
    (state) => ({
      banners: state.recommend.banners
    }),
    shallowEqual // 浅比较
  )

  /**事件处理 */
  function handlePrevClick() {
    bannerRef.current?.prev()
  }

  function handleNextClick() {
    bannerRef.current?.next()
  }

  function handleOnChange(fromIndex: number, toIndex: number) {
    setCurrentIndex(toIndex)
  }

  /**获取背景图片 */
  let bgImageUrl = banners[currentIndex]?.imageUrl
  if (bgImageUrl) {
    bgImageUrl = `${bgImageUrl}?imageView&blur=40×20`
  }

  return (
    <BannerWrapper
      style={{ background: `url(${bgImageUrl}) center center / 6000px` }}
    >
      <div className="banner wrap-v2">
        <BannerLeft>
          <Carousel
            autoplay
            autoplaySpeed={3000}
            ref={bannerRef}
            dots={false}
            effect="fade"
            beforeChange={handleOnChange}
          >
            {banners.map((item) => {
              return (
                <div className="banner-item" key={item.imageUrl}>
                  <img
                    className="image"
                    src={item.imageUrl}
                    alt={item.typeTitle}
                  />
                </div>
              )
            })}
          </Carousel>
          <ul className="dots">
            {banners.map((item, index) => {
              return (
                <li key={item.imageUrl}>
                  <span
                    className={className('item', {
                      active: index === currentIndex
                    })}
                  ></span>
                </li>
              )
            })}
          </ul>
        </BannerLeft>
        <BannerRight></BannerRight>
        <BannerControl>
          <button className="btn left" onClick={handlePrevClick}></button>
          <button className="btn right" onClick={handleNextClick}></button>
        </BannerControl>
      </div>
    </BannerWrapper>
  )
}

export default memo(TopBanners)
