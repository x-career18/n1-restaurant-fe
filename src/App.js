import Navbar from "./components/Navbar";
import Notification from "./components/Notification";
import './App.css'
import routes from "./routes/routes";
import { Route, Routes } from "react-router-dom";
import AppState from "./contexts/AppContext/AppState";
import Main from "./components/Main";
import MainLayout from "./components/MainLayout";

function App() {
  return (
    <AppState>
      <MainLayout>
        <Notification />
        <Navbar />
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
                    item.navBar && item.navBar.map((item, index)=> {
                      return (<Route key={index} path={item.name} element={item.page} />);
                    })
                  }
                </Route>
              );
            })
          }
        </Routes>
      </MainLayout>

    </AppState>

  );
}

export default App;
