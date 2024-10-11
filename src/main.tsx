import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import storeContext from './context/store.ts'
import apiContext from './context/api.ts'
import createHttpPlagin from './plagin/http.ts'
import { createApi } from './api/index.ts'
import { RootStorage } from './storage/index.ts'
import { BrowserRouter } from 'react-router-dom'

let root = createRoot(document.getElementById('root')!)

let hhtp = createHttpPlagin('https://faceprog.ru/reactcourseapi')
let api = createApi(hhtp)

let storage = new RootStorage(api, localStorage)


let rootEl = <apiContext.Provider value={api}>
  <storeContext.Provider value={storage}>
    <BrowserRouter><App /></BrowserRouter>
  </storeContext.Provider>
</apiContext.Provider>


storage.products.load().then(
  () => {
    storage.auth.init()
    if (storage.auth.authUser) {
      storage.cart.load().then(() => {
        root.render(
          rootEl
        )
      })
    } else {
      root.render(
        rootEl
      )
    }
  }
)






