import styles from "@/styles/Home.module.css";
import Image from "next/image";
import Pagination from "@/components/Pagination/Pagination";
import { calculateSkip, getPaginationControls } from "@/helpers";
import React, { useState } from "react";
import { useRouter } from "next/router";

type HomeProps = {};

export default function Page(props: HomeProps) {
  const router = useRouter();
  const [productdata, setProductdata] = useState<any>([]);
  const [pagination, setPagination] = useState<{
    pageStart: number;
    pageEnd: number;
  }>(undefined);
  const [page, setPage] = useState<any>();
  const [total, setTotal] = useState<number>(0);

  React.useEffect(() => {
    let path;
    let page: number;
    if (typeof window !== "undefined") {
      path = new URLSearchParams(window?.location.search);
      page = +(path.get("page") ?? 1);
    } else {
      page = 1;
    }

    setPage(page);

    const response = fetch(
      `https://dummyjson.com/products?limit=10&skip=${calculateSkip(10, page)}`,
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const paginationControls = getPaginationControls(10, page, data.total);
        setTotal(data.total);
        setPagination(paginationControls);
        setProductdata(data.products);
      });
  }, [router.asPath]);

  return (
    <>
      <main>
        <section style={{ display: "flex", flexFlow: "column wrap" }}>
          <div>
            <h1>Shop Products</h1>
          </div>
          <div className={styles.wrapper_Container}>
            <pre>🎯🎯🎯 Insert Typeahead here</pre>
          </div>
          <div style={{ margin: "5rem 0" }} className={styles.productList}>
            {productdata &&
              productdata.length > 0 &&
              productdata.map((data: any) => (
                <a
                  href={`/products/${data.id}`}
                  className={styles.CardComponent}
                  key={data.id}
                >
                  <div className={styles.cardImage}>
                    <Image
                      src={data.thumbnail}
                      alt={data.description}
                      loading="eager"
                      fill
                    />
                  </div>

                  <h5>{data.title}</h5>
                  <p>{data.description}</p>
                </a>
              ))}
          </div>
          {pagination && (
            <Pagination
              page={page}
              recordTotal={total}
              recordStart={pagination.pageStart}
              recordEnd={pagination.pageEnd}
            />
          )}
        </section>
      </main>
    </>
  );
}
