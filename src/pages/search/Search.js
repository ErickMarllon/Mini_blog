import React from "react";
import styles from "./Search.module.css";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useQuery } from "../../hooks/useQuery";
import PostDetail from "../../components/PostDetail/PostDetail";
import { Link } from "react-router-dom";
import Loading from "../../components/loading/Loading";

const Search = () => {
  const query = useQuery();
  const search = query.get("q");
  const { documents: posts, loading } = useFetchDocuments("posts", search);

  return (
    <div className={styles.search_container}>
      <div>
        {loading && <Loading />}
        {posts && posts.length !== 0 && (
          <h2>
            Resutados para: <span className={styles.search_span}>{search}</span>
          </h2>
        )}
        {posts && posts.length === 0 && (
          <div className={styles.search_nopost}>
            <p>Não foram encontrados post a partir da sua busca...</p>
            <Link to="/" className="btn btn-dark">
              Voltar
            </Link>
          </div>
        )}
        {posts && posts.map((post) => <PostDetail key={post.id} post={post} />)}
      </div>
    </div>
  );
};

export default Search;
