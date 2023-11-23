import React from 'react'
import LoadingAnimation from "../../components/General/LoadingAnimation";
import style from "../../styles/student/CurrentStatusPage.module.css";
import { useState, useEffect } from "react";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Tag } from "primereact/tag";
import Modal from "../../components/General/Modal";
function Phase1() {
    const [customers, setCustomers] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null); // Add this line


    useEffect(()=>{
      setCustomers([{
        id: 1000,
        name: 'Andreea Constantin',
        company: 'Benton, John B Jr',
        date: '2015-09-13',
        status: 'unqualifiable',
        verified: true,
        activity: 17,
        balance: 70663
    },
    {
      id: 2000,
      name: 'Elena Caravan',
      company: 'Benton, John B Jr',
      date: '2015-09-13',
      status: 'qualified',
      verified: true,
      activity: 17,
      balance: 70663
  },
  {
    id: 88,
    name: 'Valeriu Carasel',
    company: 'Benton, John B Jr',
    date: '2015-09-13',
    status: 'qualified',
    verified: true,
    activity: 17,
    balance: 70663
  },])
    },[])
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
  
    const [selectedCustomer, setSelectedCustomer] = useState(null);
   
    const statuses = [
      "unqualified",
      "qualified",
      "new",
      "negotiation",
      "renewal",
    ];
  
    const getSeverity = (status) => {
      switch (status) {
        case "unqualified":
          return "danger";
  
        case "qualified":
          return "success";
  
        case "new":
          return "info";
  
        case "negotiation":
          return "warning";
  
        case "renewal":
          return null;
      }
    };
  
    const statusBodyTemplate = (rowData) => {
      return (
        <Tag value={rowData.status} severity={getSeverity(rowData.status)} />
      );
    };
  
    const statusFilterTemplate = (options) => {
      return (
        <Dropdown
          value={options.value}
          options={statuses}
          onChange={(e) => options.filterCallback(e.value, options.index)}
          itemTemplate={statusItemTemplate}
          placeholder="Select One"
          showClear
        />
      );
    };
  
    const statusItemTemplate = (option) => {
      return <Tag value={option} severity={getSeverity(option)} />;
    };
  
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
          <i  />
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
      setSelectedRow(event.data);
      setShowModal(true);
    };
  
    const onHide = () => {
      setShowModal(false);
    };
  
  return (
    <div>
       <h2 className={style.h2}>
          Don't give up, a teacher is going to accept your request soon
        </h2>
      <div className={style.tableContain}>
        <DataTable
          value={customers}
          paginator
          rows={5}
        onRowSelect={onRowSelect}
          header={header}
          filters={filters}
          onFilter={(e) => setFilters(e.filters)}
          selection={selectedCustomer}
          onSelectionChange={(e) =>{ 
            setSelectedCustomer(e.value)
          }}
          selectionMode="single"
          dataKey="id"
          stateStorage="session"
          stateKey="dt-state-demo-local"
          emptyMessage="No customers found."
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
            field="status"
            header="Status"
            body={statusBodyTemplate}
            sortable
            filter
            filterElement={statusFilterTemplate}
            filterMenuStyle={{ width: "14rem" }}
            style={{ width: "25%" }}
          ></Column>
        </DataTable>

        <Modal
        visible={showModal}
        onHide={onHide}
        header={selectedRow ? selectedRow.name : ""}
        content={<p>ceva text evdem cand facem legatura cu backend ul</p>} 
      />      </div>
    </div>
  )
}

export default Phase1
