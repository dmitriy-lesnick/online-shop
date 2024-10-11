import { useRoutes } from "react-router-dom"
import { routesNative } from "./router"
import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"

function App() {
  let views = useRoutes(routesNative)

  return (<>

    <Header />
    <main>
      {views}
    </main>
    <Footer />


  </>)
}

export default App
