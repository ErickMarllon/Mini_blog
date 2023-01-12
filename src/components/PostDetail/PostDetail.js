import styles from "./PostDetail.module.css";
import { Link } from "react-router-dom";
const PostDetail = ({ post }) => {
  return (
    <div className={styles.post_detail}> 
    <div className={styles.post_detail_contain}> 
      <img src={post.image} alt={post.title} />

      <h2>{post.title}</h2>
      <p className={styles.created_by}>{post.createdBy}</p>
  
        <div className="tags_container">
          <ul>
            {post.tagsArray.map((tag) => (
              <li key={tag} className="tags"><span>&#35;</span>{tag}</li>
              ))}
              </ul>
          </div>
   
      <Link to={`/post/${post.id}`} className="btn btn-outline">
        Ler
      </Link>
    </div>
    </div>
  );
};

export default PostDetail;
