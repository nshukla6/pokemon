/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import Link from 'next/link';
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'


export const getStaticProps = async() => {
  const res = await fetch(`https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json`);
  const pokemons = await res.json();

  return {
    props: {
      pokemons
    }
  }
}

export default function Home({ pokemons }) {

  return (
    <div className={styles.container}>
      <Head>
        <title>Pokemon List</title>
      </Head>

    <div className={styles.grid}>
      {
        pokemons.map(pokemon => (
          <div className={styles.card} key={pokemon.id}>
            <Link href={`/pokemon/${pokemon.id}`}>
              <a>
                <img
                  src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
                  alt={pokemon.name}
                 />
                 <h3>{pokemon.name}</h3>
              </a>
            </Link>
          </div>
        ))
      }
    </div>
    </div>
  )
}
