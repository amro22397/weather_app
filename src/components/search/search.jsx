import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
// import { options } from "../../api";
import axios from 'axios'
// import { geoApiOptions, GEO_API_URL } from "../../api";

const Search = ({ onSearchChange }) => {

  console.log(process.env.VC_API_KEY)

  const [search, setSearch] = useState(null);

  const loadOptions = async (inputValue) => {
    // options.url = `${options.url}/?minPopulation=1000000&namePrefix=${inputValue}`
    // console.log(options.url);
    try {
      // 
      const response = await axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${inputValue}?key=${process.env.VC_API_KEY} `);
      console.log(response);

      return {
        options: [{
          value: `${response.data.latitude} ${response.data.longitude}`,
        label: `${response.data.resolvedAddress}`,
        }] 

        /* options: response.data.location.map((city) => {
          return {
            value: `${city.latitude} ${city.longitude}`,
            label: `${city.name}, ${city.countryCode}`, */
          } 
      } catch (error) {
      console.error(error);
    }
  };


  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    <AsyncPaginate
      placeholder="Search for city"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
};

export default Search;
