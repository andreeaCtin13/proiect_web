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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft
} from "@fortawesome/free-solid-svg-icons";

function TeachersMarket() {
  const [customers, setCustomers] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null); 
  const [page,setPage] = useState(1)
  const [totalRec, setTotalRec]=useState(8)

const loadData =async () =>{
    const teacher_query = "teachers_query?"
          await 
          axios.get(`http://localhost:9000/users/getAllTeachers/${teacher_query}?&take=8&skip=${page}`).then((response)=>{
          let teachers= response.data.requests.rows
          setTotalRec(Math.round(response.data.requests.count/8))
          setCustomers(teachers)
        }).catch(err=>{
          console.log(err)
        })     
}

    useEffect(()=>{
      loadData()  
    },[page])
   
  
    const onPageChange = (e,type_event) => {
      if(type_event==="next"){
        if(page!=totalRec){
          setPage(page+1)
        }
      }
      else{
        if(page!=1){
          setPage(page-1)
        }
      }
    };
    
    const [showModal, setShowModal] = useState(false);

    const onRowSelect = (event) => {
      setSelectedRow(event.data);
      setShowModal(true);
    };
  
    const onHide = () => {
      setShowModal(false);
    };
  console.log(customers)
  return (
    <div className={style.mainContainer}>
      <h1>Search for a teacher</h1>
      <div className={style.tableContain}>
        <DataTable value={customers}  filterDisplay="row" responsiveLayout="scroll" dataKey="idUser"
     rows={10} totalRecords={totalRec} 
     onRowClick={onRowSelect}
     
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
      <div className={style.paginationZone}>
        <button className={style.btnPagination} onClick={(e)=>onPageChange(e,"prev")}><FontAwesomeIcon icon={faChevronLeft} /></button>  
        <span>Page {page} from {totalRec}</span>
        <button className={style.btnPagination} onClick={(e)=>onPageChange(e,"next")}><FontAwesomeIcon icon={faChevronRight} /></button>
      </div>
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
