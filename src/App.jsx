import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Body } from "./components/Body"
import { Login } from "./components/Login"
import { Provider } from "react-redux"
import appStore from "./utils/appStore"
import { Feed } from "./components/Feed"
import { Profile } from "./components/Profile"
import { Connections } from "./components/Connections"


export default function App() {
  return (
    <Provider store={appStore}>
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body />}>
          <Route path="/" element={<Feed />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/connections" element={<Connections />} />
          <Route path="/requests" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
  )
}
