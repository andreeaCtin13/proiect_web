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
  const [page,setPage] = useState(1)
  const [totalRec, setTotalRec]=useState(8)
  const [lazyParams, setLazyParams] = useState({
    first: 1,
    rows: 10,
    page: 1,
});
const [loading, setLoading] = useState(false);
console.log(lazyParams)
const loadData =async () =>{
  setLoading(true);
    const teacher_query = "teachers_query?"
        const skip_value = 1
          await 
          axios.get(`http://localhost:9000/users/getAllTeachers/${teacher_query}?&take=8&skip=${page}`).then((response)=>{
          console.log(response)
          let teachers= response.data.requests.rows
          setTotalRec(response.data.count)
          setCustomers(teachers)
        }).catch(err=>{
          console.log(err)
        })     
        setLoading(false)
}

    useEffect(()=>{
      loadData()  
    },[page])
   
  
    const onPageChange = (e) => {
      console.log("ajung aici")
      setLazyParams({
        first: e.first,
        rows: e.rows,
        page: e.page,
      });
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
        <DataTable value={customers} lazy filterDisplay="row" responsiveLayout="scroll" dataKey="idUser"
        paginator={true}  rows={10} totalRecords={totalRec} onPage={onPageChange}
        loading={loading}
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
