import axios from "axios";

const getItems = async (query) => {
  let items = await axios.get("http://localhost:3001/item", query);
  return items;
};

const getDetailItem = async (id) => {
  let item = await axios.get("http://localhost:3001/item-detail/" + id);
  return item;
};

const createItem = async (data) => {
  let newItem = await axios.post("http://localhost:3001/item", data);
  return newItem;
};

const updateItem = async (data) => {
  let changeItem = await axios.put("http://localhost:3001/item", data);
  return changeItem;
};

const deleteItem = async (id) => {
  let removeItem = await axios.delete("http://localhost:3001/item/" + id);
  return removeItem;
};

// const getMenusWithPromise = new Promise((resolve,reject)=>{
//     let menus = axios.get("http://localhost:3000/allmenus")
//     return menus
// })

export { getItems, createItem, updateItem, deleteItem, getDetailItem };
