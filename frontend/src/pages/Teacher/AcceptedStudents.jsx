import React, { useEffect } from "react";
import { useState } from "react";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import style from "../../styles/teacher/AcceptedStudents.module.css";
import { Link } from "react-router-dom";
import Modal from "../../components/General/Modal";
import Button from "../../components/General/Button";
function AcceptedStudents() {
  const [customers, setCustomers] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null); 

  useEffect(() => {
    setCustomers([
      {
        id: 1000,
        name: "Andreea Constantin",
        mail:"andreea@gmail.com",
        titlu_disertatie: "hahahah",
        stare_cerere:"accepted"
      },
      {
        id: 2000,
        name: "Elena Caravan",
        mail:"elena@gmail.com",
        titlu_disertatie: "hahahah2",
        stare_cerere:"final"
      },
      {
        id: 88,
        name: "Valeriu Carasel",
        mail:"valeriu@gmail.com",
        titlu_disertatie: "hahahah3",
        stare_cerere:"accepted"
      },
    ]);
  }, []);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    "country.name": {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    representative: { value: null, matchMode: FilterMatchMode.IN },
    status: {
      operator: FilterOperator.OR,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
  });


  const onGlobalFilterChange = (event) => {
    const value = event.target.value;
    let _filters = { ...filters };
    _filters["global"].value = value;
    setFilters(_filters);
  };

  const renderHeader = () => {
    const value = filters["global"] ? filters["global"].value : "";

    return (
      <span>
        <i />
        <InputText
          type="search"
          value={value || ""}
          onChange={(e) => onGlobalFilterChange(e)}
          placeholder="Global Search"
        />
      </span>
    );
  };

  const header = renderHeader();
  const [showModal, setShowModal] = useState(false);

  const onRowSelect = (event) => {
    if(event.data.stare_cerere == "accepted"){
      setSelectedRow(event.data);
      setShowModal(true);
    }
  };

  const onHide = () => {
    setShowModal(false);
  };


  return (
    <div className={style.mainContainer}>
      <h1>Accepted Students</h1>
      <Link className={style.backButton} to={"/teacher/students-requests"}>
        <div >&lt;</div>
      </Link>
      <div className={style.tableContain}>
        <DataTable
          value={customers}
          paginator
          rows={5}
          header={header}
          filters={filters}
          onRowSelect={onRowSelect}
          onFilter={(e) => setFilters(e.filters)}
          selection={selectedCustomer}
          onSelectionChange={(e) => {
            setSelectedCustomer(e.value);
          }}
          selectionMode="single"
          dataKey="id"
          stateStorage="session"
          stateKey="dt-state-demo-local"
          emptyMessage="No students found."
          tableStyle={{ minWidth: "50rem" }}
        >
          <Column
            field="name"
            header="Name"
            sortable
            filter
            filterPlaceholder="Search"
            style={{ width: "25%" }}
          ></Column>
          <Column
            field="mail"
            header="Mail"
            sortable
            style={{ width: "25%" }}
          ></Column>
          <Column
            field="titlu_disertatie"
            header="Titlu Disertatie"
            sortable
            style={{ width: "25%" }}
          ></Column>
        </DataTable>

        
      </div>{" "}
      <Modal
            visible={showModal}
            onHide={onHide}
            header={selectedRow ? selectedRow.name  : ""}
            content={<div className={style.modalContainer}>
              <div>
                <Button content={"Download file"} className={style.btnDownload}></Button>

              </div>
              <div>
                Upload the file signed
                <br />
                <input type="file" name="file"/>
              </div>
              
            </div>}/>
    </div>
  );
}

export default AcceptedStudents;
