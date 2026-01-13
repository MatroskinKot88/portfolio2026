import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import PromptLab from './pages/PromptLab.jsx'
// import AuraAi from './pages/AuraAi.jsx'
// import NocturneBar from './pages/NocturneBar.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/prompt-lab" element={<PromptLab />} />
        {/* <Route path="/aura-ai" element={<AuraAi />} />
        <Route path="/nocturne" element={<NocturneBar />} /> */}
      </Routes>
    </Router>
  )
}

export default App;