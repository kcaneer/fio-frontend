import React, { useEffect, useState } from "react";
import axios from "axios";
import { UncontrolledCollapse, Button, CardBody, Card } from "reactstrap";
import exportFromJSON from "export-from-json";

export default function Sales() {
  const [isLoading, setLoading] = useState(true);
  const [details, setDetails] = useState();
  const [customer, setCustomer] = useState("");
  const [item, setItem] = useState("");
  
  useEffect(() => {
    axios
      .get("https://cryptic-mesa-56439.herokuapp.com/api/details")
      .then((response) => {
        setDetails(response.data.recordset);
        setLoading(false);
      });
  }, []);

  let filteredSales = details;

  if (customer.length > 0) {
    filteredSales = details.filter((details) => {
      return details.customer_name
        .toLowerCase()
        .includes(customer.toLowerCase());
    });
  }
  if (item.length > 0) {
    filteredSales = details.filter((details) => {
      return details.items_ordered.toLowerCase().includes(item.toLowerCase());
    });
  }

console.log(filteredSales)

  const data = details;
  const fileName = "download";
  const exportType = "xls";

  // exportFromJSON({ data, fileName, exportType });

  if (isLoading) {
    return (
      <div>
        Loading...
      </div>
    );
  }
  return (
    <div className="row text-center d-block pb-2 ml-5 mr-5 rounded">
      <div className="row mb-5 mt-5 justify-content-center">
        <form className="form-inline col-4 my-lg-0">
          <input
            className="form-control mr-sm-2"
            type="text"
            placeholder="Search By Customer"
            aria-label="Search"
            onChange={(e) => setCustomer(e.target.value)}
          />
          <button className="btn btn-outline-secondary my-auto" type="submit">
            Search
          </button>
        </form>
        <div className="col col-4"></div>
        <form className="form-inline col-4 my-lg-0">
          <input
            className="form-control mr-sm-2"
            type="text"
            placeholder="Search By Item"
            aria-label="Search"
            onChange={(e) => setItem(e.target.value)}
          />
          <button className="btn btn-outline-secondary my-auto" type="submit">
            Search
          </button>
        </form>
      </div>
      <Button color="warning" id="sales" style={{ marginBottom: "1rem" }}>
        Sales
      </Button>
      <button
        type="button"
        className="btn btn-warning float-right"
        onClick={() => exportFromJSON({ data, fileName, exportType })}
      >
        Download to XLS
      </button>
      <UncontrolledCollapse toggler="#sales" defaultOpen={true}>
        <Card className="bg bg-secondary col col-12">
          <CardBody>
            <div className="row text-white mx-auto pb-2">
              <div className="col col-2 mr-5">
                <strong>Customer</strong>
              </div>
              <div className="col col-2 mr-4">
                <strong>Items Ordered</strong>
              </div>
              <div className="col col-2 mr-5">
                <strong>Quantity</strong>
              </div>
              <div className="col col-2 mr-5">
                <strong>Extended Amount</strong>
              </div>
              <div className="col col-2">
                <strong>Order Date</strong>
              </div>
            </div>
            <ul className="list-group col col-12 mx-auto text-white">
              {filteredSales.map((obj, ind) => {
                return (
                  <div className="row mb-2 bg bg-dark mt-1 rounded">
                    <div className="col col-2 mx-auto my-auto">
                      {obj.customer_name}
                    </div>
                    <div className="col col-2 mx-auto my-auto">
                      {obj.items_ordered}
                    </div>
                    <div className="col col-2 mx-auto my-auto">
                      {obj.quantity}
                    </div>
                    <div className="col col-2 mx-auto my-auto">
                      {obj.extended_amount}
                    </div>
                    <div className="col col-2 mx-auto">
                      {Date(obj.order_date).split("GMT", 1)}
                    </div>
                  </div>
                );
              })}
            </ul>
          </CardBody>
        </Card>
      </UncontrolledCollapse>
    </div>
  );
}
