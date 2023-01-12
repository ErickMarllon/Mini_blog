import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import styles from "./EditPost.module.css";
const EditPost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  const { user } = useAuthValue();
  const { updateDocument, response } = useUpdateDocument("posts");
  const { document: post } = useFetchDocument("posts", id);
  const navigate = useNavigate();

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
      setImage(post.image);
      const textTags = post.tagsArray.join(", ");
      setTags(textTags);
    }
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    // validate image url
    try {
      new URL(image);
    } catch (error) {
      setFormError("A imagem precisa ser uma URL.");
    }

    // criar array de tags
    const unfilteredTagsArray = tags
      .split(",")
      .map((tag) => tag.toLowerCase().trim());

    // Filtrar Array de tags para não dar problemas por ter keys iguais.
    const tagsArray = unfilteredTagsArray.filter(
      (filteredTags, i) => unfilteredTagsArray.indexOf(filteredTags) === i
    );

    // checar todos valores
    if (!title || !image || !tags || !body) {
      setFormError("Por favor, preencha todos os campos!");
    }
    const data = {
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    }
    if (formError) return;
    updateDocument(id,data);

    // redirect to home page
    navigate("/dashboard");
  };

  return (
    <div className={styles.edit_post_container}>
      {post && (
           <div className={styles.edit_post}>
          <h2>Editando post: {post.title}</h2>
          <p>Altere os dados do post como desejar</p>
          <form onSubmit={handleSubmit}>
            <label>
              <span>Título</span>
              <input
                type="text"
                name="title"
                required
                placeholder="Pense num bom título..."
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </label>
            <label>
              <span>URL da imagem:</span>
              <input
                type="text"
                name="image"
                required
                placeholder="Insira uma imagem que representa o seu post"
                onChange={(e) => setImage(e.target.value)}
                value={image}
              />
            </label>
            <p className={styles.preview_title}>preview da imagem atual:</p>
            <img className={styles.preview_image} src={post.image} alt={post.title} />
            <label>
              <span>Conteúdo</span>
              <textarea
                name="body"
                required
                placeholder="Insira o conteúdo do post"
                onChange={(e) => setBody(e.target.value)}
                value={body}
              />
            </label>
            <label>
              <span>Tags</span>
              <input
                type="text"
                name="tags"
                required
                placeholder="Insira as tags separadas por vírgula"
                onChange={(e) => setTags(e.target.value)}
                value={tags}
              />
            </label>
            {response.error && <p className="error">{response.error}</p>}
            {formError && <p className="error">{formError}</p>}
            <span className={styles.button_center}>
              {!response.loading && (
                <button className="btn">Editar</button>
              )}
              {response.loading && (
                <button className="btn" disabled>
                  Aguarde...
                </button>
              )}
            </span>
          </form>
          </div >

      )}
    </div>
  );
};

export default EditPost;
