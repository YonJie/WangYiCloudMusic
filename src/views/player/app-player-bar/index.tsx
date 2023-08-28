import React, { memo, useState, useRef, useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import { BarControl, BarOperator, BarPlayInfo, PlayerBarWrapper } from './style'
import { Link } from 'react-router-dom'
import { Slider, message } from 'antd'
import { formatTime, getImageUrl } from '@/utils/format'
import { useAppDispatch, useAppSelector } from '@/store'
import { getSongPlayUrl } from '@/utils/handle-player'
import { changeLyricIndexAction } from '../store/player'

interface IProps {
  children?: ReactNode
}

const AppPlayerBar: FC<IProps> = () => {
  /**内部变量 */
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isSliding, setIsSliding] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  /**仓库数据 */
  const { currentSong, lyrics, lyricIndex } = useAppSelector((state) => ({
    currentSong: state.player.currentSong,
    lyrics: state.player.lyrics,
    lyricIndex: state.player.ltricIndex
  }))

  const dispatch = useAppDispatch()

  /**组件内部的事件处理 */
  function handlePlayBtnClick() {
    // 1、控制播放器的播放与暂停
    isPlaying
      ? audioRef.current?.pause()
      : audioRef.current?.play().catch(() => setIsPlaying(false))
    // 2、修改isPlaying的状态
    setIsPlaying(!isPlaying)
  }

  /**音乐播放的进度处理 */
  function handleTimeUpdate() {
    // 1.获取当前的播放时间
    const currentTime = audioRef.current!.currentTime * 1000

    // 2.计算当前歌曲进度
    if (!isSliding) {
      const progress = (currentTime / duration) * 100
      setProgress(progress)
      setCurrentTime(currentTime)
    }

    // 3.根据当前的时间匹配对应的歌词
    // currentTime / lyrics
    // 默认最后一句，因为最后一句匹配不上，匹配不上就用默认index
    let index = lyrics.length - 1
    // 用当前时间找到第17句歌词，然后拿到16句歌词显示
    for (let i = 0; i < lyrics.length; i++) {
      const lyric = lyrics[i]
      if (lyric.time > currentTime) {
        index = i - 1
        break
      }
    }

    // 4.匹配上对应的歌词的index 判断当前歌词是否为同一条，同一条则执行一次歌词赋值
    if (lyricIndex === index || index === -1) return
    dispatch(changeLyricIndexAction(index))

    // 5.展示对应的歌词
    message.open({
      content: lyrics[index].text,
      // 给一个key--相同则移除--不设置，则会一大堆显示
      key: 'lyric',
      duration: 0
    })
  }

  /**处理音乐播放结束 */
  function handleTimeEnded() {
    // if (playMode === 2) {
    //   audioRef.current!.currentTime = 0
    //   audioRef.current?.play()
    // } else {
    //   handleChangeMusic(true)
    // }
  }

  /**处理进度条拖拽 */
  function handleSliderChanging(value: number) {
    // 0.目前是处于拖拽状态
    setIsSliding(true)

    // 1.设置progress
    setProgress(value)

    // 2.获取value对应位置的时间
    const currentTime = (value / 100) * duration
    setCurrentTime(currentTime)
  }

  /**处理点击进度条某位置 */
  function handleSliderChanged(value: number) {
    // 1.获取点击位置的时间
    const currentTime = (value / 100) * duration

    // 2.设置当前播放的时间
    audioRef.current!.currentTime = currentTime / 1000

    // 3.currentTime/progress
    setCurrentTime(currentTime)
    setProgress(value)
    setIsSliding(false)
  }

  /** 组件内的副作用操作 */
  useEffect(() => {
    // 1.播放音乐
    // '!.' 非空断言操作符 表示对象后面的属性一定不是null或undefined
    audioRef.current!.src = getSongPlayUrl(currentSong.id)
    audioRef.current
      ?.play()
      .then(() => {
        setIsPlaying(true)
        console.log('歌曲播放成功')
      })
      .catch((err) => {
        setIsPlaying(false)
        console.log('歌曲播放失败:', err)
      })

    // 2.获取音乐的总时长
    setDuration(currentSong.dt)
  }, [currentSong])

  return (
    <PlayerBarWrapper className="sprite_playbar">
      <div className="content wrap-v2">
        <BarControl isPlaying={isPlaying}>
          <button className="btn sprite_playbar prev"></button>
          <button
            className="btn sprite_playbar play"
            onClick={handlePlayBtnClick}
          ></button>
          <button className="btn sprite_playbar next"></button>
        </BarControl>
        <BarPlayInfo>
          <Link to="/player">
            <img
              src={getImageUrl(currentSong?.al?.picUrl, 50)}
              alt=""
              className="image"
            />
          </Link>
          <div className="info">
            <div className="song">
              <span className="name">{currentSong.name}</span>
              <span className="singer-name">{currentSong?.ar?.[0]?.name}</span>
            </div>
            <div className="progress">
              {/* 进度条组件 */}
              <Slider
                step={0.5}
                tooltip={{ formatter: null }}
                value={progress}
                onChange={handleSliderChanging}
                onAfterChange={handleSliderChanged}
              />
              <div className="time">
                <span className="current">{formatTime(currentTime)}</span>
                <span className="divider">/</span>
                <span className="duration">{formatTime(duration)}</span>
              </div>
            </div>
          </div>
        </BarPlayInfo>
        <BarOperator playMode={1}>
          <div className="left">
            <button className="btn pip"></button>
            <button className="btn sprite_playbar favor"></button>
            <button className="btn sprite_playbar share"></button>
          </div>
          <div className="right sprite_playbar">
            <button className="btn sprite_playbar volume"></button>
            <button className="btn sprite_playbar loop"></button>
            <button className="btn sprite_playbar playlist"></button>
          </div>
        </BarOperator>
      </div>
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleTimeEnded}
      ></audio>
    </PlayerBarWrapper>
  )
}

export default memo(AppPlayerBar)
