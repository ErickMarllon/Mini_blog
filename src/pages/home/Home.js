import styles from "./Home.module.css";
//mapea se a authentication deu certo
import { onAuthStateChanged } from "firebase/auth";

// hooks
import { useAuthentication } from "../../hooks/useAuthentication";

//Contexto
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";

// Components
import PostDetail from "../../components/PostDetail/PostDetail";
import Loading from "../../components/loading/Loading";

const Home = () => {
  const [query, setQuery] = useState("");
  const { documents: posts, loading } = useFetchDocuments("posts");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    if (query) {
      return navigate(`/search?q=${query}`);
    }
  };

  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);
  return (
    <div className={styles.home_container}>
      <div className={styles.home_contain}>
        <h1 className={styles.title_page}>
          Veja os nossos posts mais recentes
        </h1>
        <form onSubmit={handleSubmit} className={styles.search_form}>
          <input
            type="text"
            placeholder="Ou busque por tags..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
          <button className="btn btn-dark">pesquisar</button>
        </form>
        <div className={styles.posts}>
          {loading && <Loading />}
          {user
            ? posts &&
              posts.map((post) => <PostDetail key={post.id} post={post} />)
            : posts &&
              posts
                .slice(0, 2)
                .map((post) => <PostDetail key={post.id} post={post} />)}
          {!user && (
            <>
              <div className={styles.home_login}>
                <h3>Faça login para ter acesso a todos os post</h3>
                <Link to="/Login" className="btn">
                  Entrar
                </Link>
              </div>
            </>
          )}
          {posts && posts.length === 0 && (
            <div className={styles.noposts}>
              <h1>Posts...</h1>
              <p>Não foram encontrados posts...</p>
              <Link to="/posts/create" className="btn">
                Criar primeiro post
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
