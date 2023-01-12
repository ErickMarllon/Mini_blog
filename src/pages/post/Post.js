import React from "react";
import styles from "./Post.module.css";
import { useParams } from "react-router-dom";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import Loading from "../../components/loading/Loading";
const Post = () => {
  const { id } = useParams();
  const { document: post, loading } = useFetchDocument("posts", id);
  return (
    <div className={styles.post_container}>
      {loading && <Loading />}

      {post && (
        <div className={styles.post}>
          <h1>{post.title}</h1>
          <img src={post.image} alt={post.title} />
          <p>{post.body}</p>
          <h3>Este post trata sobre:</h3>
          <div className={styles.tags_container}>
            {post.tagsArray.map((tag) => (
              <p key={tag} className={styles.tags}>
                <span>&#35;</span>
                {tag}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
