import styles from "./App.module.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//mapea se a authentication deu certo
import { onAuthStateChanged } from "firebase/auth";

// hooks
import { useState, useEffect } from "react";
import { useAuthentication } from "./hooks/useAuthentication";

//Contexto
import { AuthProvider } from "./context/AuthContext";

//Pages
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Dashboard from "./pages/dashBoard/Dashboard";
import CreatePost from "./pages/createPost/CreatePost";
import Search from "./pages/search/Search";
import Post from "./pages/post/Post";
import Loading from "./components/loading/Loading";
import EditPost from "./pages/editPost/EdithPost";

function App() {
  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();

  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth,user]);

  if (loadingUser) {
    return <Loading />;
  }
  return (
    <div className={styles.App}>
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <Navbar />
          <div className={styles.container}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/About" element={<About />} />
              <Route path="/Post/:id" element={<Post />} />
              <Route
                path="/Login"
                element={!user ? <Login /> : <Navigate to="/" />}
              />
              <Route
                path="/Register"
                element={!user ? <Register /> : <Navigate to="/" />}
              />
              <Route
                path="/Post/create"
                element={user ? <CreatePost /> : <Navigate to="/Login" />}
              />
              <Route
                path="/Post/edit/:id"
                element={user ? <EditPost /> : <Navigate to="/Login" />}
              />
              <Route
                path="/Dashboard"
                element={user ? <Dashboard /> : <Navigate to="/Login" />}
              />
              <Route path="/Search" element={<Search />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
