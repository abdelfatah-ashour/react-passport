import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./assets/app.css";

// toaster configure
toast.configure({
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  newestOnTop: false,
  closeOnClick: true,
  rtl: "false",
  pauseOnFocusLoss: false,
  draggable: true,
  pauseOnHover: true,
});

function App() {
  return (
    <BrowserRouter>
      <div className="App container">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
