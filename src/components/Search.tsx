import { getAirports } from "@/data";
import SearchForm from "./SearchForm";

const Search = async () => {
  const airports = await getAirports();

  return <SearchForm airports={airports} />;
};

export default Search;
