import styles from "./[id].module.css";
import { Product } from "@/types";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

type ProductDetailProps = {
  product?: Product;
};
export default function ProductpageComponent({ product }: ProductDetailProps) {
  const [localProductData, setLocalProductData] = React.useState(product);

  useEffect(() => {
    setLocalProductData(product);
  }, [product]);

  const router = useRouter();
  if (!localProductData)
    return (
      <div>Oops! It looks like we had some trouble rendering this data.</div>
    );

  return (
    <div>
      <a onClick={() => (window.location.href = "/")}>
        <span>Go Back</span>
      </a>
      <section className={styles.card}>
        <div className={styles.image}>
          <Image
            src={localProductData?.thumbnail}
            alt={localProductData?.description}
            fill
          />
        </div>
        <div className={styles.detail}>
          <h1>{localProductData?.title}</h1>
          <p>{localProductData?.description}</p>
          <h5>${localProductData?.price.toFixed(2)}</h5>
        </div>
      </section>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  if (!+context.params?.id) return { props: {} };

  const response = await fetch(
    `https://dummyjson.com/products/${context.params?.id}`,
  );

  return await response.json().then((product) => {
    return { props: { product: product } };
  });
};
