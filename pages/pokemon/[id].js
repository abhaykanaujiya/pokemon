import React from "react";
import Link from "next/link";
import Head from "next/head";
import axios from "axios";
import styles from "../../styles/Details.module.css";

export const getStaticPaths = async () => {
  const resp = await axios.get(
    `https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json`
  );
  const pokemon = await resp.data;
  return {
    paths: pokemon?.map((pokemon) => ({
      params: { id: pokemon.id.toString() },
    })),
    fallback: false,
  };
};
export const getStaticProps = async ({ params }) => {
  const resp = await axios.get(
    `https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${params.id}.json`
  );
  return {
    props: {
      pokemon: await resp.data,
    },
  };
};
export default function Details({ pokemon }) {
  return (
    <div>
      <Head>
        <title>{pokemon?.name}</title>
      </Head>
      <div className={styles.backToHomeLink}>
        <Link href="/">
          <a>Back to Home</a>
        </Link>
      </div>
      <div className={styles.layout}>
        <div>
          <img
            className={styles.picture}
            src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon?.image}`}
            alt={pokemon?.name}
          />
        </div>
        <div>
          <div className={styles.name}>{pokemon?.name}</div>
          <div className={styles.type}>{pokemon?.type.join(",")}</div>
          <table>
            <thead className={styles.header}>
              <tr>
                <th>Name</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {pokemon?.stats?.map(({ name, value }) => (
                <tr key={name}>
                  <td className={styles.attribute}>{name}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
