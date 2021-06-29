/* eslint-disable jsx-a11y/alt-text */
import AddModal from "components/AddModal";
import EditModal from "components/EditModal";
import React, { Component } from "react";
import {
  Card,
  CardHeader,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Row,
  Button,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

import { deleteEmployee, getEmployee, getEmployees } from "api/Employee";

export default class Items extends Component {
  state = {
    addModal: false,
    editModal: false,
    deleteModal: false,
    view: null,
    id: null,
    result: [],
    page: 0,
    limit: 10,
  };

  componentDidMount() {
    getEmployees()
      .then((data) => {
        this.setState({
          ...this.state,
          result: data.data.employees,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidUpdate(prevState) {
    const { page, limit } = this.state;
    if (prevState.page !== page) {
      getEmployees({ page, limit });
    }
  }

  onClickDetail = (id) => {
    getEmployee(id)
      .then((data) => {
        this.setState({
          ...this.state,
          editModal: true,
          view: data.data.employee,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  onClickDelete = async (id) => {
    await deleteEmployee(id)
      .then(() => {
        this.setState({
          ...this.state,
          deleteModal: false,
        });
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  onClickScan = async (url) => {
    console.log(url);
  };

  onClickNext = () => {
    this.setState({
      page: Number(this.state.page) + Number(this.state.limit),
    });
  };

  onClickPrev = () => {
    if (this.state.page > 1) {
      this.setState({
        page: Number(this.state.page) - Number(this.state.limit),
      });
    }
  };

  renderDeleteForm() {
    const { deleteModal, id } = this.state;
    return (
      <Modal
        isOpen={deleteModal}
        toggle={() => this.setState({ deleteModal: false, id: null })}
        unmountOnClose={true}
      >
        <>
          <ModalHeader
            toggle={() => this.setState({ deleteModal: false, id: null })}
          >
            Add Employee
          </ModalHeader>
          <ModalBody>
            <h3 className="text-red text-center">
              <strong>Danger!</strong>
            </h3>
            <h4 className="text-red text-center">
              This action will delete your data, Are you sure?
            </h4>
          </ModalBody>
          <ModalFooter className="mt-n3">
            <Button color="primary" onClick={() => this.onClickDelete(id)}>
              <i className="fa fa-trash-alt" /> Delete Data
            </Button>
            <Button
              color="secondary"
              onClick={() => this.setState({ deleteModal: false, id: null })}
            >
              <i className="fa fa-times-circle" /> Cancel
            </Button>
          </ModalFooter>
        </>
      </Modal>
    );
  }

  render() {
    const { addModal, editModal, result, view, deleteModal, page } = this.state;
    return (
      <Container className="mt-5">
        <h2 className="text-center">Practical Test PT Juke Solusi Teknologi</h2>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row>
                  <Col sm="6">
                    <h3 className="mb-0">Employee List</h3>
                  </Col>
                  <Col sm="6" className="text-right">
                    <Button
                      className="btn-sm"
                      color="primary"
                      onClick={() => this.setState({ addModal: true })}
                    >
                      <i className="fas fa-plus-circle" /> Add Employee
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              {addModal && (
                <AddModal
                  isOpen={addModal}
                  isClose={(val) => this.setState({ addModal: val })}
                />
              )}
              {editModal && view && (
                <EditModal
                  isOpen={editModal}
                  isClose={(val) => this.setState({ editModal: val })}
                  data={view}
                />
              )}
              {deleteModal && this.renderDeleteForm()}
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">Name</th>
                    <th scope="col">Phone</th>
                    <th scope="col">DOB</th>
                    <th scope="col">address</th>
                    <th scope="col">Current Position</th>
                    <th scope="col">KTP File</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {result.map((value, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        {value.first_name} {value.last_name}
                      </td>
                      <td>{value.phone_number}</td>
                      <td>{value.dob}</td>
                      <td>{value.address}</td>
                      <td>{value.current_position}</td>
                      <td>
                        <Button
                          className="block btn-sm"
                          color="info"
                          onClick={() => this.onClickScan(value.image_url)}
                        >
                          <i className="fas fa-file-alt" /> KTP File
                        </Button>
                      </td>
                      <td>
                        <Button
                          className="block btn-sm"
                          color="primary"
                          onClick={() => this.onClickDetail(value.id)}
                        >
                          <i className="fas fa-pencil-alt" /> Edit
                        </Button>
                        <Button
                          className="block btn-sm"
                          color="danger"
                          onClick={() =>
                            this.setState({ deleteModal: true, id: value.id })
                          }
                        >
                          <i className="fas fa-trash-alt" /> Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className={page === 1 ? "disabled" : ""}>
                      <PaginationLink onClick={this.onClickPrev} tabIndex="-1">
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink onClick={this.onClickNext}>
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    );
  }
}
