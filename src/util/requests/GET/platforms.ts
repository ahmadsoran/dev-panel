import PlatformsType from "@/backend/@types/Platform";

type queris = {
  page: number | undefined;
  row: number | undefined;
  sort: boolean | undefined;
  search: string | undefined;
};
export default async function GetPlatformsData({ page, row, sort }: queris) {
  try {
    const res = await fetch(
      `http://localhost:3000/api/platforms/data?apikey=${
        process.env.API_KEY
      }&sort=${sort ?? ""}&row=${row ?? ""}&page=${page ?? ""}`
    );
    if (!res.ok) throw new Error("unable to fetch data");
    return (await res.json()) as {
      resault: number;
      platforms: PlatformsType[];
    };
  } catch (error) {
    if (error instanceof Error) throw error.message;
  }
}
