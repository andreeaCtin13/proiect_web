import React, { useEffect } from 'react'
import { useState } from 'react';
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import Modal from "../../components/General/Modal";
import style from "../../styles/teacher/StudentsRequests.module.css"
import Button from '../../components/General/Button';
import { Link } from 'react-router-dom';
function StudentsRequests() {
  const [customers, setCustomers] = useState(null);
  const [declined, setDiclined] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null); 
  const no_of_students = 9; 
    useEffect(()=>{
      setCustomers([{
        id: 1000,
        name: 'Andreea Constantin',
        titlu_disertatie:"hahahah",
    },
    {
      id: 2000,
      name: 'Elena Caravan',
      titlu_disertatie:"hahahah2",
  },
  {
    id: 88,
    name: 'Valeriu Carasel',
    titlu_disertatie:"hahahah3",
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
    const [showModalRow, setShowModalRow] = useState(false);

    const onRowSelect = (event) => {
      setSelectedRow(event.data);
      setShowModalRow(true);
    };

    const showModalFunction = ()=>{
      setShowModal(true);
    }

  
    const onHide = () => {
      setShowModal(false);
    };
    const onHideModalRow = () => {
      setShowModal(false);
      setDiclined(false)
    };
  
  return (
    <div className={style.mainContainer}>
      <h2 className={style.h2}>
        Students Requests
      </h2>
      <div>
        <h4>No. available: {no_of_students} </h4>
      </div>
      <div className={style.buttonZone}>
        <Link className={style.link} to={"/teacher/sessions"}>
          <Button content={"Your sessions"} className={`${style.btnAction} ${style.btn}`}></Button>
        </Link>
        <Link className={style.link} to={"/teacher/accepted-students"}>
          <Button content={"Your students"} className={`${style.btnAction} ${style.btn}`}></Button>
        </Link>
        <Button className={style.btnLogout} onClick={showModalFunction} content='Logout'></Button>
      </div>
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
                field="titlu_disertatie"
                header="Titlu Disertatie"
                sortable
                style={{ width: "25%" }}
              ></Column>
            </DataTable>

            <Modal
            visible={showModalRow}
            onHide={onHideModalRow}
            header={selectedRow ? selectedRow.name +" - request" : ""}
            content={<div>
              {
                declined === false ? <div className={style.contentModal}>
                  <Button content={"Accept it"} className={style.btnAccept}></Button>
                  <Button content={"Decline it"} className={style.btnDecline} onClick={()=>{setDiclined(true)}}></Button>
                </div>:<div className={style.contentModal}>
                <input type='text' className={style.feedbackInput} placeholder='Write  your feedback...'></input>
                <br />
                <Button content={"Send it"} className={style.sendItButton}></Button>
                </div>
              }
            </div>}/>      
          </div>
          <Modal
            visible={showModal}
            onHide={onHide}
            header={"Logout"}
            content={<div className={style.modalContent}>
              <div>Are you sure you want to logout?</div>
              <div className={style.btnZone}>
              <Link to ="/" className={style.link}>
                <Button content={"Yes"} className={style.btnLogoutYes}></Button>
              </Link>
              <Button content={"No"} className={style.btnLogoutNo} onClick={onHide}></Button>
              </div>
            </div>}/>  
    </div>
  )
}

export default StudentsRequests