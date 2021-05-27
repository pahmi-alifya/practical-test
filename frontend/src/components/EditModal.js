import { updateItem } from "api/Item";
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

const EditModal = (props) => {
  const { isOpen, className, isClose, data } = props;
  const [modal, setModal] = useState(isOpen);
  const [value, setValue] = useState(data);
  const toggle = () => setModal(!modal) & isClose(!modal);

  const handleChangeInput = (event) => {
    let name = event.target.name;
    setValue({ ...value, [name]: event.target.value });
  };

  const handleFinish = async () => {
    await updateItem(value);
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
        <ModalHeader toggle={toggle}>Edit Barang</ModalHeader>
        <Form className="mt-n4">
          <ModalBody>
            <FormGroup>
              <Input
                type="text"
                name="id"
                defaultValue={data._id}
                style={{ display: "none" }}
              />
              <Label for="name">Nama Barang</Label>
              <Input
                type="text"
                name="name"
                bsSize="sm"
                onChange={handleChangeInput}
                defaultValue={data.name}
              />
            </FormGroup>
            <FormGroup>
              <Label for="purchase_price">Harga Beli</Label>
              <Input
                type="number"
                name="purchase_price"
                bsSize="sm"
                onChange={handleChangeInput}
                defaultValue={data.purchase_price}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="selling_price">Harga Jual</Label>
              <Input
                type="number"
                name="selling_price"
                bsSize="sm"
                onChange={handleChangeInput}
                defaultValue={data.selling_price}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="stock">Stok</Label>
              <Input
                type="number"
                name="stock"
                bsSize="sm"
                onChange={handleChangeInput}
                defaultValue={data.stock}
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
              <i className="fa fa-pencil-alt" /> Ubah Data
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

export default EditModal;
