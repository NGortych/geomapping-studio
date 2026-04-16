import { AppThemeProvider } from './app/providers/AppThemeProvider'
import { StudioPage } from './pages/studio/StudioPage'

function App() {
  return (
    <AppThemeProvider>
      <StudioPage />
    </AppThemeProvider>
  )
}

export default App
