import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthValue } from "../../context/AuthContext";
// import { useAuthentication } from "../../hooks/useAuthentication";
import { useInsertDocument } from "../../hooks/useInsertDocument";
import styles from "./CreatePost.module.css";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  const { user } = useAuthValue();
  const { insertDocument, response } = useInsertDocument("posts");
  const navigate = useNavigate();
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
    if (formError) return;
    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    });

    // redirect to home page
    navigate("/");
  };

  return (
    <div className={styles.createPost}>
      <h2>Criar post</h2>
      <p>Escreva sobre o que quiser e compartilhe seu conhecimento</p>
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
          {!response.loading && <button className="btn">Criar Post</button>}
          {response.loading && (
            <button className="btn" disabled>
              Aguarde...
            </button>
          )}
        </span>
      </form>
    </div>
  );
};

export default CreatePost;
