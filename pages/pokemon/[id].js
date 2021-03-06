import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import styles from "../../styles/Details.module.css";

export const getStaticPaths = async () => {
  const res = await fetch(
    `https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json`
  );
  const pokemons = await res.json();

  return {
    paths: pokemons.map((pokemon) => ({
      params: { id: pokemon.id.toString() },
    })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { id } }) => {
  const res = await fetch(
    `https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${id}.json`
  );
  const pokemon = await res.json();

  return {
    props: {
      pokemon,
    },
  };
};

const Detail = ({ pokemon }) => {
  if (!pokemon) return <Link href="/">Back To Home</Link>;

  return (
    <div>
      <Head>
        <title>{pokemon.name}</title>
      </Head>
      <div>
        <Link href="/">Back To Home</Link>
      </div>
      <div className={styles.layout}>
        <Image
          className={styles.picture}
          src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
          alt={pokemon.name.english}
          layout="responsive"
          width={1920}
          height={1680}
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
  );
};

export default Detail;
