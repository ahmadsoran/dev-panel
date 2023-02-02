import { PlatformPagesProps } from "@/@types/Pages";
import GetPlatformsData from "@/util/requests/GET/platforms";
import Header from "./_header";

export default async function page(props: PlatformPagesProps) {
  const { searchParams } = props;

  const platforms = await GetPlatformsData({
    page: searchParams?.page,
    row: searchParams?.row,
    sort: searchParams?.sort,
    search: searchParams?.search,
  });

  return (
    <div>
      <Header />
      {platforms?.platforms?.map((data) => (
        <p>{data._id}</p>
      ))}
    </div>
  );
}
