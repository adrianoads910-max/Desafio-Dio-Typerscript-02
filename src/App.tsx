import { ChakraProvider } from "@chakra-ui/react"
import Header from "./components/Header/Header"
import { Card } from "./components/Card/Card"
import "./App.css"

function App() {
  return (
    <ChakraProvider>
      <div className="min-h-screen bg-gray-950 flex flex-col">
        <Header />
        <div className="flex flex-1 items-center justify-center px-4">
          <Card />
        </div>
      </div>
    </ChakraProvider>
  )
}

export default App