/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  Form,
  FormGroup,
  FormText,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import moment from "moment";
import Select from "react-select";
import ReactDatetime from "react-datetime";

import { createEmployee } from "api/Employee";
import { getCities, getProvinces } from "api/Province";
import { BankAccounts, Positions } from "constant/data";

const AddModal = (props) => {
  const { isOpen, className, isClose } = props;
  const [modal, setModal] = useState(isOpen);
  const [value, setValue] = useState(null);
  const [province, setProvince] = useState(null);
  const [city, setCity] = useState(null);
  const toggle = () => setModal(!modal) & isClose(!modal);

  useEffect(() => {
    getProvinces()
      .then((data) => {
        setKeyProvince(data.data.provinsi);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChangeInput = (event) => {
    let name = event.target.name;
    setValue({ ...value, [name]: event.target.value });
  };

  const handleChangeProvince = async (option) => {
    const id = option.value;
    setValue({ ...value, province: option.label });
    await getCities(id)
      .then((data) => {
        setKeyCity(data.data.kota_kabupaten);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChangeCity = (option) => {
    setValue({ ...value, city: option.label });
  };

  const handleChangeOption = (data, key) => {
    setValue({ ...value, [key]: data.value });
  };

  const handleFinish = async () => {
    await createEmployee(value);
    window.location.reload();
    setModal(!modal);
    isClose(!modal);
  };

  const handleChangeDate = (date) => {
    const dob = moment(date).format("YYYY-MM-DD");
    setValue({ ...value, dob: dob });
  };

  const setKeyProvince = (data) => {
    const items = [];
    data.map((item) => {
      items.push({ value: item.id, label: item.nama });
    });
    setProvince(items);
  };

  const setKeyCity = (data) => {
    const items = [];
    data.map((item) => {
      items.push({ value: item.id, label: item.nama });
    });
    setCity(items);
  };

  return (
    <div>
      <Modal
        isOpen={modal}
        toggle={toggle}
        className={className}
        unmountOnClose={true}
      >
        <ModalHeader toggle={toggle}>Add Employee</ModalHeader>
        <Form className="mt-n4">
          <ModalBody>
            <FormGroup>
              <Label for="first_name">First Name</Label>
              <Input
                type="text"
                name="first_name"
                id="first_name"
                bsSize="sm"
                onChange={handleChangeInput}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="last_name">Last Name</Label>
              <Input
                type="text"
                name="last_name"
                id="last_name"
                bsSize="sm"
                onChange={handleChangeInput}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="dob">DOB</Label>
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-calendar-grid-58" />
                  </InputGroupText>
                </InputGroupAddon>
                <ReactDatetime
                  name="dob"
                  id="dob"
                  onChange={handleChangeDate}
                  inputProps={{
                    placeholder: "Date of Birthday",
                  }}
                  timeFormat={false}
                />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <Label for="phone_number">Phone Number</Label>
              <Input
                type="number"
                name="phone_number"
                id="phone_number"
                bsSize="sm"
                onChange={handleChangeInput}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="province">Province</Label>
              <Select
                name="province"
                id="province"
                options={province}
                onChange={handleChangeProvince}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="city">City</Label>
              <Select
                name="city"
                id="city"
                options={city}
                onChange={handleChangeCity}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="current_position">Current Position</Label>
              <Select
                name="current_position"
                id="current_position"
                options={Positions}
                onChange={(data) =>
                  handleChangeOption(data, "current_position")
                }
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="bank_account">Bank Account</Label>
              <Select
                name="bank_account"
                id="bank_account"
                options={BankAccounts}
                onChange={(data) => handleChangeOption(data, "bank_account")}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="bank_account_number">Bank Account Number</Label>
              <Input
                type="number"
                name="bank_account_number"
                id="bank_account_number"
                bsSize="sm"
                onChange={handleChangeInput}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="address">Address</Label>
              <Input
                type="textarea"
                name="address"
                id="address"
                bsSize="sm"
                onChange={handleChangeInput}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="ktp_number">KTP Number</Label>
              <Input
                type="number"
                name="ktp_number"
                id="ktp_number"
                bsSize="sm"
                onChange={handleChangeInput}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="file">File</Label>
              <Input
                type="file"
                name="file"
                id="file"
                onChange={handleChangeInput}
                required
              />
              <FormText color="red">
                <strong>Warning:</strong>
                <br /> 1. File type must be JPG or PNG <br /> 2. File Size maks
                1mb
              </FormText>
            </FormGroup>
          </ModalBody>
          <ModalFooter className="mt-n5">
            <Button color="primary" onClick={handleFinish}>
              <i className="fa fa-plus-circle" /> Add Data
            </Button>{" "}
            <Button color="secondary" onClick={toggle}>
              <i className="fa fa-times-circle" /> Cancel
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  );
};

export default AddModal;
