import axios from "axios";

const getEmployees = async (query) => {
  let employees = await axios.get("http://localhost:3001/employee", query);
  return employees;
};

const getEmployee = async (id) => {
  let employee = await axios.get("http://localhost:3001/employee/" + id);
  return employee;
};

const createEmployee = async (data) => {
  let newEmployee = await axios.post("http://localhost:3001/employee", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return newEmployee;
};

const updateEmployee = async (data) => {
  let id = data.id;
  let changeEmployee = await axios.put(
    "http://localhost:3001/employee/" + id,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return changeEmployee;
};

const deleteEmployee = async (id) => {
  let removeEmployee = await axios.delete(
    "http://localhost:3001/employee/" + id
  );
  return removeEmployee;
};

// const getMenusWithPromise = new Promise((resolve,reject)=>{
//     let menus = axios.get("http://localhost:3000/allmenus")
//     return menus
// })

export {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
};
