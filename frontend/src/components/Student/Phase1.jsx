import React from 'react'
import style from "../../styles/student/CurrentStatusPage.module.css";
import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import Modal from "../../components/General/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';


function Phase1() {
    const [requests, setRequests] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null); 
    const [page, setPage] = useState(1)
    const [totalRec, setTotalRec]=useState(1)
    const { globalUser, setGlobalUser } = useContext(UserContext);
    const [teacherName, setTeacherName] = useState("")

    const loadData=async()=>{
      const teacher_query = "teacher_query?"
      
      const data = await axios.get(`http://localhost:9000/users/getAllTeachersRequests/${globalUser.idUser}/${teacher_query}&take=8&skip=${page}`)
      console.log("RECEIVED ", data)
      if(data.data.requests.count<=8){
        setTotalRec(1)
      }
      else{
        if(data.data.requests.count%8!=0){
          setTotalRec(Math.round(data.data.requests.count/8)+1)
        }
        else{
          setTotalRec(Math.round(data.data.requests.count/8))
        }
      }
      let req=[]

      for(let obj in data.data.requests.rows)
      {  
        let {id_request, status, feedback, tematica, teacherId } =data.data.requests.rows[obj]
        req.push({
          id_request, status,tematica, feedback, teacherId
        })
      }
      setRequests(req)
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
    const [selectedRequests, setSelectedRequests] = useState(null);

  
    const getSeverity = (status) => {
      switch (status) {
        case "rejected":
          return "danger";
  
        case "pending":
          return "warning";
  
        default:
          return null;

      }
    };
  
    const statusBodyTemplate = (rowData) => {
      return (
        <Tag value={rowData.status} severity={getSeverity(rowData.status)} />
      );
    };
  

    const statusItemTemplate = (option) => {
      return <Tag value={option} severity={getSeverity(option)} />;
    };
  

    const [showModal, setShowModal] = useState(false);


    

    const onRowSelect = async(event) => {
      setSelectedRow(event.data);
      console.log(event.data)
      const data = await axios.get(`http://localhost:9000/users/getUserByID/${event.data.teacherId}`)
      
      setTeacherName(data.data.user.nume)

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
         dataKey="id_request"
          value={requests}
          rows={8}
          onRowClick={onRowSelect}
          selection={selectedRequests}
          onSelectionChange={(e) =>{ 
            setSelectedRequests(e.value)
          }}
          selectionMode="single"
          stateStorage="session"
          stateKey="dt-state-demo-local"
          emptyMessage="No requests made."
          tableStyle={{ minWidth: "50rem" }}
        >
        <Column
            field="tematica"
            header="Tematica"
            sortable
            style={{ width: "25%" }}
          ></Column>
          <Column
            field="feedback"
            header="Feedback"
            sortable
            style={{ width: "25%" }}
          ></Column>


          <Column
            field="status"
            header="Status"
            body={statusBodyTemplate}
            sortable
            style={{ width: "25%" }}
          ></Column>
        </DataTable>
        <div className={style.paginationZone}>
        <button className={style.btnPagination} onClick={(e)=>onPageChange(e,"prev")}><FontAwesomeIcon icon={faChevronLeft} /></button>  
        <span>Page {page} from {totalRec}</span>
        <button className={style.btnPagination} onClick={(e)=>onPageChange(e,"next")}><FontAwesomeIcon icon={faChevronRight} /></button>
      </div>

        <Modal
        visible={showModal}
        onHide={onHide}
        header={`Professor ${teacherName}`}
        content=
        {
        
          selectedRow?selectedRow.status==="rejected"?<p>{selectedRow.feedback}</p>:<p>You did't receive any feedback yet.</p>:<p>eroare</p>
        } 
      />      </div>
    </div>
  )
}

export default Phase1