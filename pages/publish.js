import { useState } from "react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import axios from "axios";

import styles from "../styles/Publish.module.css";

const Publish = () => {
  const router = useRouter();

  const [cookie, setCookies, removeCookie] = useCookies(["user"]);
  const token = cookie.user;

  const [file, setFile] = useState({});
  const [preview, setPreview] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [color, setColor] = useState("");
  const [selectedWearRate, setSelectedWearRate] = useState("");
  const [price, setPrice] = useState("");
  const [city, setCity] = useState("");
  const [acceptedExchange, setAcceptedExchange] = useState(false);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.append("picture", file);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("size", selectedSize);
      formData.append("color", color);
      formData.append("condition", selectedWearRate);
      formData.append("city", city);
      formData.append("brand", selectedBrand);

      const response = await axios.post(
        "http://localhost:3100/offer/publish",
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data._id) {
        router.push("/");
      } else {
        alert("Une erreur est survenue, veuillez réssayer");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className={styles.publishMain}>
      <div className={styles.publishContainer}>
        <h2>Vends ton article</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.fileSelect}>
            {preview ? (
              <div className={styles.dashedPreviewImage}>
                <img src={preview} alt="pre-visualisation" />
                <div
                  className={styles.removeImgButton}
                  onClick={() => {
                    setPreview("");
                  }}
                >
                  X
                </div>
              </div>
            ) : (
              <div className={styles.dashedPreviewWithout}>
                <div className={styles.inputDesignDefault}>
                  <label htmlFor="file" className={styles.labelFile}>
                    <span className={styles.inputSign}>+</span>
                    <span>Ajoute une photo</span>
                  </label>
                  <input
                    type="file"
                    id="file"
                    className={styles.inputFile}
                    onChange={(event) => {
                      setFile(event.target.files[0]);
                      setPreview(URL.createObjectURL(event.target.files[0]));
                    }}
                  />
                </div>
              </div>
            )}
          </div>
          <div className={styles.textInputSection}>
            <div className={styles.textInput}>
              <h4>Titre</h4>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="ex: Chemise Sézane verte"
                onChange={(event) => {
                  const value = event.target.value;
                  setTitle(value);
                }}
              />
            </div>
            <div className={styles.textInput}>
              <h4>Décris ton article</h4>
              <textarea
                name="description"
                id="description"
                rows="5"
                placeholder="ex: porté quelquefois, taille correctement"
                onChange={(event) => {
                  const value = event.target.value;
                  setDescription(value);
                }}
              ></textarea>
            </div>
          </div>
          <div className={styles.textInputSection}>
            <div className={styles.textInput}>
              <h4>Marque</h4>
              <input
                type="text"
                id="selectedBrand"
                name="selectedBrand"
                placeholder="ex: Zara"
                onChange={(event) => {
                  const value = event.target.value;
                  setSelectedBrand(value);
                }}
              />
            </div>
            <div className={styles.textInput}>
              <h4>Taille</h4>
              <input
                type="text"
                id="selectedSize"
                name="selectedSize"
                placeholder="ex: L / 40 / 12"
                onChange={(event) => {
                  const value = event.target.value;
                  setSelectedSize(value);
                }}
              />
            </div>
            <div className={styles.textInput}>
              <h4>Couleur</h4>
              <input
                type="text"
                id="color"
                name="color"
                placeholder="ex: Fushia"
                onChange={(event) => {
                  const value = event.target.value;
                  setColor(value);
                }}
              />
            </div>
            <div className={styles.textInput}>
              <h4>Etat</h4>
              <input
                name="wearRate"
                id="wearRate"
                placeholder="Neuf avec étiquette"
                onChange={(event) => setSelectedWearRate(event.target.value)}
              />
            </div>
            <div className={styles.textInput}>
              <h4>Lieu</h4>
              <input
                name="city"
                id="city"
                placeholder="ex: Paris"
                onChange={(event) => setCity(event.target.value)}
              />
            </div>
          </div>
          <div className={styles.textInputSection}>
            <div className={styles.textInput}>
              <h4>Prix</h4>
              <div className={styles.checkboxSection}>
                <input
                  type="text"
                  id="price"
                  name="price"
                  placeholder="0,00 €"
                  onChange={(event) => {
                    const value = event.target.value;
                    setPrice(value);
                  }}
                />
                <div className={styles.checkboxInput}>
                  {acceptedExchange ? (
                    <label
                      htmlFor="exchange"
                      className={styles.checkboxDesignChecked}
                    ></label>
                  ) : (
                    <label
                      htmlFor="exchange"
                      className={styles.checkboxDesign}
                    ></label>
                  )}
                  <input
                    type="checkbox"
                    name="exchange"
                    id="exchange"
                    value="exchange"
                    onChange={() => setAcceptedExchange(!acceptedExchange)}
                  />
                  <span>Je suis intéressé(e) par les échanges</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.formButton}>
            <button type="submit" className={styles.formValidtaion}>
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Publish;
