import { BrowserRouter, Routes, Route } from "react-router-dom"
import viewUtils from "./View/Utils"
import DashboardPage from "./View/Pages/DashboardPage"
function App() {
  const {SharedLayout} = viewUtils

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* MAIN APPLICATION ROUTE */}
          <Route path="/" element={<SharedLayout/>}>
          <Route index element={<DashboardPage/>} />
          </Route>
          {/* LANDING && AUTHENTICATION ROUTE */}
          <Route path="home" element={<SharedLayout />} >
            
          </Route>
        </Routes>
      </BrowserRouter>
     </div>
  )
}

export default App
