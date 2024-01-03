import React, { useEffect } from 'react'
import { useState } from 'react';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Modal from "../../components/General/Modal";
import style from "../../styles/student/TeacherMarket.module.css"
import Button from '../../components/General/Button';
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  faChevronRight,
  faChevronLeft
} from "@fortawesome/free-solid-svg-icons";
import { UserContext } from '../../context/UserContext';
import { useContext } from 'react';

function TeachersMarket() {
  const [teachers, setTeachers] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null); 
  const [page,setPage] = useState(1)
  const [totalRec, setTotalRec]=useState(1)
  const [idRequest, setIdRequest] = useState(null)
  const [titleRequest, setTitleRequest] = useState("")
  const { globalUser, setGlobalUser } = useContext(UserContext);


const loadData =async () =>{
    const teacher_query = "teachers_query?"
          await 
          axios.get(`http://localhost:9000/users/getAllTeachers/${teacher_query}?&take=8&skip=${page}`).then(async(response)=>{
          let teachers= response.data.requests.rows
          if(response.data.requests.count%8!=0){
            setTotalRec(Math.round(response.data.requests.count/8)+1)
          }
          else{
            setTotalRec(Math.round(response.data.requests.count/8))
          }
          
          for(let i=0;i<teachers.length;i++){
            let sessions = await axios.get(`http://localhost:9000/sessions/getAllSessions/${teachers[i].idUser}`)
            let data_actuala = new Date();
            let ok = false;
            for (let j = 0; j < sessions.data.length; j++) {
              let data_inceput = new Date(
                sessions.data[j].data_inceput
              );
              let data_final = new Date(sessions.data[j].data_final);
              if (
                data_inceput <= data_actuala &&
                data_final >= data_actuala
              ) {
                ok = true;
                break;
              }
            }
            if (ok === true) {
              teachers[i].isAvailable = "available"
            } else {
              teachers[i].isAvailable = "unavailable"
            }

          }
          setTeachers(teachers)
        }).catch(err=>{
          console.log(err)
        })     
}

    useEffect(()=>{
      loadData()  
    },[page])

    const isAvailable = (rowData) => {
      console.log(rowData.isAvailable)
      if(rowData.isAvailable==="available"){
        return false
      }
      return true
    }
  
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
      if(event.data.isAvailable==="available"){
        setSelectedRow(event.data);
        setIdRequest(event.data.idUser)
        setShowModal(true);    
      }
    };
  
    const onHide = () => {
      setShowModal(false);
    };

    const sendRequest =async () =>{
      if(titleRequest!==""){
        console.log("intru aici")

        const newReq = {
          studentId: globalUser.idUser,
          teacherId: idRequest,
          status:"pending",
          tematica:titleRequest,
          pdf:null, feedback:null, 
        }
        try{
        const sentRequest = await axios.post("http://localhost:9000/requests/addRequest", newReq);
          if(sentRequest.hasOwnProperty("message")){
            toast.error("You have to complete the textarea", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
          }
          else{
            toast.success('🦄 Your request has been sent', {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              });
            }
            setTitleRequest("")
        }catch(err){
          toast.error(err, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          console.log(err)
        }
      
      }else{
        toast.error("You have to complete the textarea", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } 
    }
  return (
    <div className={style.mainContainer}>
      <h1>Search for a teacher</h1>
      <div className={style.tableContain}>
        <DataTable value={teachers}  filterDisplay="row" responsiveLayout="scroll" dataKey="idUser"
     rows={10} totalRecords={totalRec} 
     onRowClick={onRowSelect}
     rowClassName = {(rowData)=>isAvailable(rowData)?"activeRow":"inactiveRow"}

        > 
          <Column
            field="nume"
            header="Name"
            sortable
            style={{ width: "25%" }}
          ></Column>
          <Column
            field="mail"
            header="Mail"
            sortable
            style={{ width: "25%" }}
          ></Column>
          <Column
            field="nr_maxim_studenti"
            header="Disponible"
            sortable
            style={{ width: "25%" }}
          ></Column>
           <Column
            field="isAvailable"
            header="Avaliability"
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
             <textarea className={style.inputRequest} type="text" onChange={(e)=>{setTitleRequest(e.target.value)}} value={titleRequest} placeholder='Write the subject for your disertation...'/>
              <Button content={"Send request"} className={style.btnSendRequest} onClick={sendRequest}></Button>
            </div>}/>  
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
    </div>
    
  )
}

export default TeachersMarket
