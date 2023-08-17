import React, { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import routes from './router'
import AppHaeder from './components/app-haeder'
import AppFooter from './components/app-footer'

function App() {
  return (
    <div className="App">
      <AppHaeder />
      <Suspense fallback="">{useRoutes(routes)}</Suspense>
      <AppFooter />
    </div>
  )
}

export default App
