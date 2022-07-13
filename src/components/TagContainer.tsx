import { FC } from "react";
import { useQuery } from "react-query";
import TagDisplay from "./TagDisplay";

const TagContainer: FC = () => {
  const { isLoading, error, data } = useQuery(
    "supplier",
    async () => {
      const _res = await fetch(
        process.env.NODE_ENV === "development"
          ? `http://localhost:3000/api/supplier`
          : `/api/supplier`
      );
      const res = await _res.json();

      return JSON.parse(res.body);
    },
    // Unnecessary due to static data source
    { refetchOnWindowFocus: false }
  );

  if (isLoading) return <p>"Loading App..."</p>;

  if (error instanceof Error && error.message) {
    return <p>An error has occurred: {error.message}</p>;
  }

  return <div>{data && <TagDisplay supplier={data} />}</div>;
};

export default TagContainer;
