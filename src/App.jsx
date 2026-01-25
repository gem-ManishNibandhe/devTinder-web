import { BrowserRouter, Route ,Routes} from "react-router-dom"
import {NavBar} from "./NavBar"
import { Body } from "./body"
import { Login } from "./Login"
export default function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />} >
            <Route path="/login" element={<Login />} />
          </Route>
          
        </Routes>
      </BrowserRouter>
    </>
  )
}
