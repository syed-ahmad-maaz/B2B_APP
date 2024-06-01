import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GetRegionList } from "../../../services/Regions";
import { DeleteRegionService } from "../../../services/Regions";
import { Table } from "react-bootstrap";
import { Scrollbars } from "react-custom-scrollbars-2";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import "./ViewRegion.css";
import Swal from "sweetalert2";
import { Pagination } from "react-bootstrap";

const ViewAllRegions = () => {
  const [regions, setregionstate] = useState([]);

  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [regionsPerPage] = useState(5);

  const ListOfRegions = () => {
    GetRegionList().then((items) => {
      setregionstate(items);
    });
  };

  useEffect(() => {
    if (!localStorage.getItem("admintoken")) {
      navigate("/adminlogin");
    }
    ListOfRegions();
  }, []);

  const deleteRegion = (item) => {
    Swal.fire({
      title: item.region + " wants to eliminate?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        DeleteRegionService(item._id);
        Swal.fire(
          "Successfully Deleted!",
          `${item.region} ${","} ${item.capital}  record has been deleted.`,
          "success"
        ).then(function () {
          window.location.href = "/viewallregions";
        });
      }
    });

    ListOfRegions();
  };

  const LoadRegions = (item) => {
    localStorage.setItem("ID", item._id);
    localStorage.setItem("Region", item.region);
    localStorage.setItem("Capital", item.capital);
  };
  // 1349
  // 900
  const indexOfLastRegion = currentPage * regionsPerPage;
  const indexOfFirstRegion = indexOfLastRegion - regionsPerPage;
  const currentRegions = regions.slice(indexOfFirstRegion, indexOfLastRegion);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    // <Scrollbars style={{ height: 520 }}>
    <div>
      <b className="biscuit">View Region Here</b>
      <br></br>

      <Table striped variant="light" className="table text-center">
        <tr>
          <td>
            <b>Admin </b>
          </td>
          <td>
            <b>Region</b>
          </td>
          <td>
            <b>Capital</b>
          </td>
          <td>
            <b>Operations</b>
          </td>
        </tr>
        {Array.isArray(regions) ? (
          currentRegions.map((item, i) => (
            <tr key={i}>
              <td>{item.AdminId.name}</td>
              <td>{item.region}</td>
              <td>{item.capital}</td>

              <td>
                <Link to={"/updateregion/" + item._id}>
                  <Button
                    sx={{ color: "success.main" }}
                    onClick={() => LoadRegions(item)}
                  >
                    <EditIcon />
                  </Button>
                </Link>

                <Button
                  sx={{ color: "error.main" }}
                  onClick={() => deleteRegion(item)}
                >
                  <DeleteIcon />
                </Button>
              </td>
            </tr>
          ))
        ) : (
          <></>
        )}
      </Table>
      <br></br>

      <div className="d-flex justify-content-center mt-3">
        <Pagination>
          {Array.from({
            length: Math.ceil(regions.length / regionsPerPage),
          }).map((_, index) => (
            <Pagination.Item 
              key={index}
              active={index + 1 === currentPage}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
    </div>
    // </Scrollbars>
  );
};

export default ViewAllRegions;
