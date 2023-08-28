import React, { Suspense, useEffect } from 'react'
import { useRoutes } from 'react-router-dom'
import routes from './router'
import AppHaeder from './components/app-haeder'
import AppFooter from './components/app-footer'
import AppPlayerBar from './views/player/app-player-bar'
import { useAppDispatch } from './store'
import { fetchCurrentSongAction } from './views/player/store/player'

function App() {
  // 获取某一首歌作为初始化
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchCurrentSongAction(1842025914))
  }, [])
  return (
    <div className="App">
      <AppHaeder />
      <Suspense fallback="">{useRoutes(routes)}</Suspense>
      <AppFooter />

      {/* 播放器工具栏 */}
      <AppPlayerBar />
    </div>
  )
}

export default App
