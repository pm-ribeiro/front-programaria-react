import { useState, useEffect } from "react";
import listaImg from "../assets/lista.svg";
import { Header } from "./Header.jsx";
import { Footer } from "./Footer.jsx";

import Axios from "axios";

import styles from "../styles/content.module.css";

export function Content() {
  const [repositories, setRepositories] = useState([]);
  const [name, setName] = useState("");
  const [minibio, setminibio] = useState("");
  const [citation, setCitation] = useState("");
  const [image, setImage] = useState("");
  const [success, setSuccess] = useState(false);
  const baseURL = "https://programaria-backend-q807.onrender.com/women";

  useEffect(() => {
    async function getData() {
      const response = await Axios.get(baseURL);
      console.log(response);
      setRepositories(response.data);
    }
    getData();
  }, []);

  function handleInputValueName(event) {
    setName(event.target.value);
  }

  function handleInputValueminibio(event) {
    setminibio(event.target.value);
  }

  function handleInputValueImage(event) {
    setImage(event.target.value);
  }

  function handleInputValueCitation(event) {
    setCitation(event.target.value);
  }

  function handleCreateMessage(event) {
    event.preventDefault();

    console.log("mensagem enviada", name, citation, minibio, image);

    async function sendData() {
      await Axios.post(baseURL, {
        name,
        citation,
        minibio,
        image,
      });
      const response = await Axios.get(baseURL);
      setRepositories(response.data);
    }
    sendData();

    setSuccess(true);
    setName("");
    setminibio("");
    setImage("");
    setCitation("");
  }

  return (
    <>
      <Header
        title="Mulheres em Tech Brasil"
        subtitle="Conheça personalidades femininas que estão transformando a tecnologia no Brasil"
        image={listaImg}
      />
      <div className={styles.projectsContainer}>
        <div className={styles.projectsContainer}>
          <div className={styles.cardsRepoContainer}>
            {repositories.map((repo) => {
              return (
                <div key={repo._id} className={styles.cardRepo}>
                  <div className={styles.cardImgContainer}>
                    <img className={styles.cardRepoImage} src={repo.image} />
                  </div>
                  <details>
                    <summary className={styles.cardRepoSummary}>
                      {repo.name}
                    </summary>
                    <p className={styles.cardRepoText}>{repo.minibio}</p>
                    <q className={styles.cardRepoQuote}>{repo.citation}</q>
                  </details>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div>
        <h2 className={styles.projectsTitle}>Cadastre uma rainha tech:</h2>
        <form className={styles.form} onSubmit={handleCreateMessage}>
          <input
            onChange={handleInputValueName}
            placeholder="Digite o nome"
            value={name}
            className={styles.formInput}
          />
          <textarea
            onChange={handleInputValueImage}
            placeholder="Digite o link da imagem"
            value={image}
            className={styles.formTextArea}
          />
          <textarea
            onChange={handleInputValueminibio}
            placeholder="Digite a minibiografia"
            value={minibio}
            className={styles.formTextArea}
          />
          <textarea
            onChange={handleInputValueCitation}
            placeholder="Digite a citação"
            value={citation}
            className={styles.formTextArea}
          />
          <button className={styles.formButton} type="submit">
            Enviar mensagem
          </button>
          {success && <p>Cadastro realizado com sucesso.</p>}
        </form>
      </div>
      <Footer />
    </>
  );
}
