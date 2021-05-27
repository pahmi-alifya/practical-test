import { createItem } from "api/Item";
import React, { useState } from "react";
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
} from "reactstrap";

const AddModal = (props) => {
  const { isOpen, className, isClose } = props;
  const [modal, setModal] = useState(isOpen);
  const [value, setValue] = useState(null);
  const toggle = () => setModal(!modal) & isClose(!modal);

  const handleChangeInput = (event) => {
    let name = event.target.name;
    setValue({ ...value, [name]: event.target.value });
  };

  const handleFinish = async () => {
    await createItem(value);
    window.location.reload();
    setModal(!modal);
    isClose(!modal);
  };

  return (
    <div>
      <Modal
        isOpen={modal}
        toggle={toggle}
        className={className}
        unmountOnClose={true}
      >
        <ModalHeader toggle={toggle}>Tambah Barang</ModalHeader>
        <Form className="mt-n4">
          <ModalBody>
            <FormGroup>
              <Label for="name">Nama Barang</Label>
              <Input
                type="text"
                name="name"
                id="name"
                bsSize="sm"
                onChange={handleChangeInput}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="purchase_price">Harga Beli</Label>
              <Input
                type="number"
                name="purchase_price"
                id="purchase_price"
                bsSize="sm"
                onChange={handleChangeInput}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="selling_price">Harga Jual</Label>
              <Input
                type="number"
                name="selling_price"
                id="selling_price"
                bsSize="sm"
                onChange={handleChangeInput}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="stock">Stok</Label>
              <Input
                type="number"
                name="stock"
                id="stock"
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
                <strong>Peringatan:</strong>
                <br /> 1. Jenis file harus JPG atau PNG <br /> 2. Ukuran file
                maks 100kb
              </FormText>
            </FormGroup>
          </ModalBody>
          <ModalFooter className="mt-n5">
            <Button color="primary" onClick={handleFinish}>
              <i className="fa fa-plus-circle" /> Tambah Data
            </Button>{" "}
            <Button color="secondary" onClick={toggle}>
              <i className="fa fa-times-circle" /> Batal
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  );
};

export default AddModal;
