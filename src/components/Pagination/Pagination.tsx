import styles from "./Pagination.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

type PaginationProps = {
  page: number;
  recordTotal: number;
  recordStart: number;
  recordEnd: number;
};

export default function Pagination({
  page,
  recordTotal,
  recordStart,
  recordEnd,
}: PaginationProps) {
  const { query, pathname, basePath, asPath } = useRouter();
  const path = asPath.split("?")[0];

  const getNextPageUrl = () => {
    const newQueryParams = { ...query, page: (page + 1).toString() };
    const params = new URLSearchParams(newQueryParams);

    return `${path}?${params.toString()}`;
  };

  const getPreviousPageUrl = () => {
    const newQueryParams = { ...query, page: (page - 1).toString() };
    const params = new URLSearchParams(newQueryParams);

    return `${path}?${params.toString()}`;
  };

  return (
    <div className={styles.pagination}>
      <div className={styles.nav}>
        {page > 1 && (
          <div className={styles.prev}>
            <Link href={getPreviousPageUrl()}>&laquo; Previous Page</Link>
          </div>
        )}
        {recordTotal > recordEnd && (
          <div>
            <Link href={getNextPageUrl()}>Next Page &raquo;</Link>
          </div>
        )}
      </div>
      <div className={styles.info}>
        Showing {recordStart}-{recordEnd} of {recordTotal}
      </div>
    </div>
  );
}
