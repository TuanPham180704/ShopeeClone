import useRouteElement from "src/useRouteElement"

function App() {
 const routeElements = useRouteElement()
  return (
    <div>
      {routeElements}
    </div>
  )
}

export default App
