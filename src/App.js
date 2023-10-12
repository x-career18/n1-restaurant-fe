import Navbar from "./components/Navbar";
import Notification from "./components/Notification";
import './App.css'
import routes from "./routes/routes";
import { Route, Routes } from "react-router-dom";
import AppState from "./contexts/AppContext/AppState";
import Main from "./components/Main";
import MainLayout from "./components/MainLayout";
import Footer from "./components/Footer";

function App() {
  return (
    <AppState>
      <div className="my-main ">
        <div className="my-layout">
          <div className="my-header">
            <Notification />
            <Navbar />
          </div>
          <div className="my-content">
            <Routes>
              {
                routes.map((item, index) => {
                  return (
                    <Route
                      key={index}
                      path={item.path}
                      element={item.component}
                    >
                      {
                        item.navBar && item.navBar.map((item, index) => {
                          return (<Route key={index} path={item.name} element={item.page} />);
                        })
                      }
                    </Route>
                  );
                })
              }
            </Routes>
          </div>
        </div>
      </div>
    </AppState>

  );
}

export default App;
