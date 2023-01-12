import styles from "./Dashboard.module.css";
import { Link } from "react-router-dom";
import Loading from "../../components/loading/Loading";
import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useDeleteDocument } from "../../hooks/useDeleteDocument";
import { useViewPort } from "../../hooks/useViewPort";
import { useState } from "react";
const Dashboard = () => {
  const [active, setActive] = useState(false);
  const [mode, setMode] = useState(false);
  const { user } = useAuthValue();
  let { width } = useViewPort();
  let desktopOrMobile = 992;

  const uid = user.uid;
  // posts do usuário
  const { documents: posts, loading } = useFetchDocuments("posts", null, uid);
  const { deleteDocument } = useDeleteDocument("posts");
  if (loading) {
    return <Loading />;
  }
  const ToggleMode = (id) => {
    setMode(id);
    setActive(!active);
  };

  return (
    <div
      className={
        width >= desktopOrMobile ? styles.dashboard : styles.dashboard_mobile
      }
    >
      <h2>Dashboard</h2>
      {!posts || posts.length === 0 ? (
        <div className={styles.noposts}>
          <p>Não foram encontrados posts</p>
          <Link to="/post/create" className="btn">
            Criar post
          </Link>
        </div>
      ) : (
        <>
          <p>Gerencie os seus posts</p>
          <div className={styles.post_header}>
            <span>Titulo</span>
            <span>Ações</span>
          </div>
          {posts &&
            posts.map((post) => (
              <div
                key={post.id}
                className={
                  width <= desktopOrMobile
                    ? styles.menu_post_row
                    : styles.post_row
                }
                id={post.id}
              >
                <p>{post.title}</p>

                <div
                  className={
                    width <= desktopOrMobile ? styles.menu_actions : ""
                  }
                >
                  <span
                    className={
                      width <= desktopOrMobile
                        ? styles.menu_actions_container
                        : ""
                    }
                    onClick={() => ToggleMode(post.id)}
                  >
                    <span
                      className={
                        width <= desktopOrMobile ? styles.menu_actions_span : ""
                      }
                    ></span>
                  </span>
                  <span
                    className={
                      mode === post.id && active
                        ? styles.menu_actions_span_active
                        : styles.menu_actions_span_inactive
                    }
                  >
                    <Link to={`/post/${post.id}`} className="btn btn-outline">
                      Ver
                    </Link>
                    <Link
                      to={`/post/edit/${post.id}`}
                      className="btn btn-outline"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => {
                        deleteDocument(post.id);
                      }}
                      className="btn btn-outline btn-danger"
                    >
                      Excluir
                    </button>
                  </span>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default Dashboard;
