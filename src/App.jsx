import './App.css'
import Footer from './components/Footer/Footer'
import Navigation from './components/Navigation/Navigation'
import AppRoutes from './routes/AppRoutes'
import { Toaster } from 'sonner';

function App() {
  return (
    <div className="App" >
      <Navigation />
      <AppRoutes />
      <Toaster theme='dark' expand visibleToasts={5} />
      <Footer />
    </div >
  )
}

export default App
