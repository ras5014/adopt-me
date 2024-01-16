import { useState } from "react";
import { useQuery } from "react-query";
import Results from "./Results";
import { useBreedList } from "../useBreedList";
import fetchSearch from "../fetchSearch";
const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const [requestParams, setRequestParams] = useState({
    location: "",
    animal: "",
    breed: "",
  });

  const [animal, setAnimal] = useState("");
  const [breeds] = useBreedList(animal); // It runs whenever animal changes

  // Use react-query instead of useEffect
  const results = useQuery(["search", requestParams], fetchSearch); // Here search is the key in the cache used by react-dom
  const pets = results?.data?.pets ?? [];
  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const obj = {
            animal: formData.get("animal") ?? "",
            breed: formData.get("breed") ?? "",
            location: formData.get("location") ?? "",
          };
          setRequestParams(obj);
        }}
      >
        <label htmlFor="location">Location</label>
        <input id="location" name="location" placeholder="Location" />
        <label htmlFor="animal">Animal</label>
        <select
          id="animal"
          value={animal}
          onChange={(e) => {
            setAnimal(e.target.value);
          }}
        >
          <option />
          {ANIMALS.map((animal) => {
            return <option key={animal}>{animal}</option>;
          })}
        </select>
        <label htmlFor="breed">Breed</label>
        <select id="breed" disabled={breeds.length === 0} name="breed">
          <option />
          {breeds.map((breed) => {
            return <option key={breed}>{breed}</option>;
          })}
        </select>
        <button>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
