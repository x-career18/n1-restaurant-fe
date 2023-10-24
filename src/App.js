import Navbar from "./components/Navbar";
import Notification from "./components/Notification";
import "./App.css";
import routes from "./routes/routes";
import { Route, Routes } from "react-router-dom";
import AppState from "./contexts/AppContext/AppState";
import AuthState from "./contexts/AuthContext/AuthState";
import TableState from "./contexts/TableContext/TableState";

function App() {
  return (
    <AppState>
      <AuthState>
        <div className="my-main ">
          <div className="my-layout">
            <div className="my-header">
              <Notification />
              <Navbar />
            </div>
            <div className="my-content">
              <TableState>
                <Routes>
                  {routes.map((item, index) => {

                    return (
                      <Route
                        key={index}
                        path={item.path}
                        element={item.component}
                      >
                        {item.navBar &&
                          item.navBar.map((item, index) => {
                            return (
                              <Route
                                key={index}
                                path={item.name}
                                element={item.page}
                              />
                            );
                          })}
                      </Route>
                    );
                  })}
                </Routes>
              </TableState>

            </div>
          </div>
        </div>
      </AuthState>
    </AppState>
  );
}

export default App;
