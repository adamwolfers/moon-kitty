import { Layout } from './components/Layout'
import { MoonPhaseDisplay } from './components/MoonPhaseDisplay'
import { useMoonPhase } from './hooks/useMoonPhase'

function App() {
  const { data, error } = useMoonPhase()

  return (
    <Layout>
      <MoonPhaseDisplay data={data} error={error} />
    </Layout>
  )
}

export default App
