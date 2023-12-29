import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import Modal from "../../components/General/Modal";
import style from "../../styles/teacher/StudentsRequests.module.css"
import Button from '../../components/General/Button';
import { Link } from 'react-router-dom';
import axios from "axios";
import { UserContext } from '../../context/UserContext';

function StudentsRequests() {
  const [customers, setCustomers] = useState(null);
  const [declined, setDiclined] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null); 
  const [page,setPage] = useState(1)
  const [totalRec, setTotalRec]=useState(1)
  const { globalUser, setGlobalUser } = useContext(UserContext);

  const loadData = async()=>{
    const students_query = "student_query?status=pending"
    await 
    axios.get(`http://localhost:9000/users/getAllStudentsRequest/${globalUser.idUser}/${students_query}&take=8&skip=${page}`).then((response)=>{
    let students= response.data.requests.rows
    let req =[] 
    for(let i= 0;i<students.length;i++){
      let stud = {...students[i].studentRequests}
      let {status, tematica, id_request}=students[i]
      req.push({
        id_request, status, tematica, ...stud
      })
      console.log(req)
    }
    setCustomers(req)
    if(response.data.requests.count<=8){
      setTotalRec(1)
    }
    else{
      if(response.data.requests.count%8!=0){
        setTotalRec(Math.round(response.data.requests.count/8)+1)
      }
      else{
        setTotalRec(Math.round(response.data.requests.count/8))
      }
    }
    setCustomers(req)
  }).catch(err=>{
    console.log(err)
  })     
  }
  const no_of_students = 9; 
    useEffect(()=>{
     loadData()
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
      setShowModalRow(false);
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
              rows={5}
              onRowSelect={onRowSelect}
              selection={selectedCustomer}
              onSelectionChange={(e) =>{ 
                setSelectedCustomer(e.value)
              }}
              selectionMode="single"
              dataKey="id_request"
              stateStorage="session"
              stateKey="dt-state-demo-local"
              emptyMessage="No students found."
              tableStyle={{ minWidth: "50rem" }}
            >
              <Column
                field="nume"
                header="Name"
                sortable
                style={{ width: "25%" }}
              ></Column>

              <Column
                field="tematica"
                header="Titlu Disertatie"
                sortable
                style={{ width: "25%" }}
              ></Column>
            </DataTable>

            <Modal
            visible={showModalRow}
            onHide={onHideModalRow}
            header={selectedRow ? selectedRow.nume +" - request" : ""}
            content={<div>
              {
                declined === false ? <div className={style.contentModal}>
                  <Button content={"Accept it"} className={style.btnAccept} onClick={onHideModalRow}></Button>
                  <Button content={"Decline it"} className={style.btnDecline} onClick={()=>{setDiclined(true)}}></Button>
                </div>:<div className={style.contentModal}>
                <input type='text' className={style.feedbackInput} placeholder='Write  your feedback...'></input>
                <br />
                <Button content={"Send it"}onClick={onHideModalRow} className={style.sendItButton}></Button>
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
                <Button content={"Yes"} className={style.btnLogoutYes} onClick={onHide}></Button>
              </Link>
              <Button content={"No"} className={style.btnLogoutNo} onClick={onHide}></Button>
              </div>
            </div>}/>  
    </div>
  )
}

export default StudentsRequests
