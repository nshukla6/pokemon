/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import styles from "../../styles/Details.module.css";

const Detail = () => {
  const [pokemon, setPokemon] = useState(null);

  const router = useRouter();
  const {
    query: { id },
  } = router;
  useEffect(() => {
    const getPokemon = async () => {
      const res = await fetch(
        `https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${id}.json`
      );
      const pokemon = await res.json();
      setPokemon(pokemon);
    };
    if (id) {
      getPokemon();
    }
  }, [id]);

  if (!pokemon) return <Link href="/">Back To Home</Link>;

  return <div>
    <Head>
        <title>{pokemon.name}</title>
    </Head>
    <div>
        <Link href="/">
            Back To Home
        </Link>
    </div>
    <div className={styles.layout}>
        <img
            className={styles.picture}
            src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
            alt={pokemon.name.english}
         />

    </div>
    <div>
        <div className={styles.name}>{pokemon.name}</div>
        <div className={styles.type}>{pokemon.type.join(", ")}</div>
        <table>
            <thead className={styles.header}>
              <tr>
                <th>Name</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {pokemon.stats.map(({ name, value }) => (
                <tr key={name}>
                  <td className={styles.attribute}>{name}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
    </div>
  </div>
};

export default Detail;
