import axios from "axios";

const getProvinces = async (query) => {
  let provinces = await axios.get(
    "https://dev.farizdotid.com/api/daerahindonesia/provinsi",
    { query }
  );
  return provinces;
};

const getCities = async (query) => {
  let cities = await axios.get(
    `https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${query}`
  );
  return cities;
};

export { getProvinces, getCities };
