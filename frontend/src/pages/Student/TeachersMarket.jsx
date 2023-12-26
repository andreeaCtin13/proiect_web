import React, { useEffect } from 'react'
import { useState } from 'react';
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import Modal from "../../components/General/Modal";
import style from "../../styles/student/TeacherMarket.module.css"
import Button from '../../components/General/Button';
import axios from "axios";

function TeachersMarket() {
  const [customers, setCustomers] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null); 

    useEffect(()=>{
      const teacher_query = "teachers_query?"
      const skip_value = 1
      const getAll = async()=>{
        await axios.get(`http://localhost:9000/users/getAllTeachers/${teacher_query}?&take=10&skip=${skip_value}`).then((response)=>{
        console.log(response)
        let teachers= response.data.requests.rows
     
        setCustomers(teachers)
      }).catch(err=>{
        console.log(err)
      })}
      getAll()
    },[])
    const [filters, setFilters] = useState({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      nume: {
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
    <div className={style.mainContainer}>
      <h1>Search for a teacher</h1>
 <div className={style.tableContain}>
        <DataTable
          value={customers}
          paginator
          rows={8}
          onRowSelect={onRowSelect}
          header={header}
          filters={filters}
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
            field="nume"
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
            field="no_of_students"
            header="Disponible"
            sortable
            style={{ width: "25%" }}
          ></Column>
        </DataTable>

        
      </div>{" "}
      <Modal
            visible={showModal}
            onHide={onHide}
            header={selectedRow ? selectedRow.name : ""}
            content={<div className={style.modalContent}>
             <textarea className={style.inputRequest} type="text" placeholder='Write the subject for your disertation...'/>
              <Button content={"Send request"} className={style.btnSendRequest}></Button>
            </div>}/>  
    </div>
  )
}

export default TeachersMarket
