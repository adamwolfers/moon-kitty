import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { MoonPhaseDisplay } from './components/MoonPhaseDisplay'
import { PhaseGallery } from './components/PhaseGallery'
import { useMoonPhase } from './hooks/useMoonPhase'

function Home() {
  const { data, error } = useMoonPhase()
  return <MoonPhaseDisplay data={data} error={error} />
}

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<PhaseGallery />} />
      </Routes>
    </Layout>
  )
}

export default App
