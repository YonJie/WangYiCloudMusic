import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { AreaHeaderV1Wrapper } from './style'
import { Link } from 'react-router-dom'

interface IProps {
  children?: ReactNode
  title: string
  keywords?: string[]
  moreText?: string
  moreLink?: string
}

const AreaHeaderV1: FC<IProps> = (props) => {
  const {
    title = '默认标题',
    keywords = [],
    moreText = '更多',
    moreLink = '/'
  } = props
  return (
    <AreaHeaderV1Wrapper className="sprite_02">
      <div className="left ">
        <div className="title">{title}</div>
        <div className="keywords">
          {keywords.map((item) => {
            return (
              <div className="item" key={item}>
                <span className="link">{item}</span>
                <span className="divider">|</span>
              </div>
            )
          })}
        </div>
      </div>
      <div className="right">
        <Link to={moreLink} className="more">
          {moreText}
        </Link>
        <i className="icon sprite_02"></i>
      </div>
    </AreaHeaderV1Wrapper>
  )
}

export default memo(AreaHeaderV1)
