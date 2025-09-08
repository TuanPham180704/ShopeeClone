import { useContext, useEffect } from "react"
import { ToastContainer } from "react-toastify"
import { AppContext } from "src/contexts/app.contexts"
import useRouteElement from "src/useRouteElement"
import { LocalStorageEventTarget } from "src/utils/auth"

function App() {
 const routeElements = useRouteElement()
 const {reset} = useContext(AppContext)
 useEffect(()=>{
  LocalStorageEventTarget.addEventListener('clearLS',reset)
  return () => {
    LocalStorageEventTarget.removeEventListener('clearLS',reset)
  }

 },[reset])
  return (
    <div>
  {routeElements}
  <ToastContainer/>
    </div>
  )
}

export default App
