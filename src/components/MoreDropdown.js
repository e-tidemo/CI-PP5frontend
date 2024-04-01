import React from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import Row from 'react-bootstrap/Row';
import Col from "react-bootstrap/Col";
import styles from "../styles/MoreDropDown.module.css";

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const ThreeDots = React.forwardRef(({ onClick }, ref) => (
  <i
    className="fas fa-ellipsis-v"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  />
));

export const MoreDropdown = ({ handleEdit, handleDelete }) => {
  return (
    <Dropdown className="ml-auto" drop="left">
      <Dropdown.Toggle as={ThreeDots} />

      <Dropdown.Menu
        className="text-center"
        popperConfig={{ strategy: "fixed" }}
      >
        <Row className={styles.Row}>
          <Col>
            <Dropdown.Item
              className={styles.DropdownItem}
              onClick={handleEdit}
              aria-label="edit"
            >
              <i className={`fas fa-edit ${styles.DropdownItem}`} />
            </Dropdown.Item>
          </Col>
          <Col>
            <Dropdown.Item
              className={styles.DropdownItem}
              onClick={handleDelete}
              aria-label="delete"
            >
              <i className={`fas fa-trash-alt ${styles.DropdownItem}`} />
            </Dropdown.Item>
          </Col>
        </Row>
      </Dropdown.Menu>
    </Dropdown>
  );
};