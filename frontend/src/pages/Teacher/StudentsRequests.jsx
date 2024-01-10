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
import { toast, ToastContainer } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft
} from "@fortawesome/free-solid-svg-icons";
import "react-toastify/dist/ReactToastify.css";

function StudentsRequests() {
  const [customers, setCustomers] = useState(null);
  const [declined, setDiclined] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null); 
  const [page,setPage] = useState(1)
  const [totalRec, setTotalRec]=useState(1)
  const { globalUser, setGlobalUser } = useContext(UserContext);
  const [feedback, setFeedback] = useState("")

  const loadData = async()=>{
    const students_query = "student_query?status=pending"
    await 
    axios.get(`http://localhost:9000/users/getAllStudentsRequest/${globalUser.idUser}/${students_query}&take=8&skip=${page}`).then((response)=>{
    let students= response.data.requests.rows
    console.log("STUDENTS", students)
    let req =[] 
    for(let i= 0;i<students.length;i++){
      let stud = {...students[i].studentRequests}
      let {status, tematica, id_request, studentId}=students[i]
      req.push({
        id_request, status, tematica, studentId,...stud
      })
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
    }
    setCustomers(req)
    if(response.data.requests.count<=8){
      setTotalRec(1)
    }
    else{
        setTotalRec(Math.round(response.data.requests.count/8))
    }
    setCustomers(req)
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
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    const [studentSelectat, setStudentSelectat] = useState({})
    const [showModal, setShowModal] = useState(false);
    const [showModalRow, setShowModalRow] = useState(false);

    const onRowSelect = async (event) => {
        console.log(event.data)
      let student = await axios.get(`http://localhost:9000/users/getUserByID/${event.data.studentId}`)
      console.log("student : ",student)
      setStudentSelectat(student.data.user)
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
    const acceptStudentUpdate = async(status_request, idStud )=>{
      if(status_request==="accepted"){
        const updated_user = {id_profesor_asociat:globalUser.idUser}
        await axios.put(`http://localhost:9000/users/updateUser/${idStud}`,updated_user).then(()=>{
          console.log("yayayyyyy")
        }).catch(err=>console.log(err))
      }
    }

    const updateNoDisponibile = async() =>{
      const updated_user = {nr_maxim_studenti:globalUser.nr_maxim_studenti-1}
      await axios.put(`http://localhost:9000/users/updateUser/${globalUser.idUser}`,updated_user).then((result)=>{
        setGlobalUser({...globalUser, nr_maxim_studenti:globalUser.nr_maxim_studenti-1})
      }).catch(err=>console.log(err))
      

    }

    const updateRequestStatus = async (status_request,id)=>{
      let new_req = {status:status_request}

      if(status_request==="rejected"){
        if(feedback===""){
          toast.error("You have to write your feedback before rejecting the request", {
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
          new_req = {...new_req, feedback:feedback}
        }
        return
      }
      await axios.put(`http://localhost:9000/requests/updateRequest/${id}`,new_req).then((resp)=>{
        console.log("response update: ", resp)
       acceptStudentUpdate(status_request, resp.data.studentId)
      }).catch(err=>{
        console.log("eroare la update de request + eroare:", err)
      })
      onHideModalRow()
      setCustomers(customers.filter((x)=>x.id_request!==id))
    }
  
  return (
    <div className={style.mainContainer}>
      <h2 className={style.h2}>
        Students Requests
      </h2>
      <div>
        <h4>No. available: {globalUser.nr_maxim_studenti} </h4>
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
              onRowClick={onRowSelect}
              selection={selectedCustomer}
              onSelectionChange={(e) =>{ 
                setSelectedCustomer(e.value)
              }}
              selectionMode="single"
              dataKey="id_request"
              stateStorage="session"
              stateKey="dt-state-demo-local"
              emptyMessage="Nu s-a gasit nicio cerere."
              tableStyle={{ minWidth: "50rem" }}
            >

              <Column
                field="tematica"
                header="Titlu Disertatie"
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
            visible={showModalRow}
            onHide={onHideModalRow}
            header={selectedRow ? selectedRow.tematica +" - request" : ""}
            content={<div>
            <div className={style.introStudent}>
              {studentSelectat.nume} - {studentSelectat.mail}
            </div>
              {
                declined === false ? <div className={style.contentModal}>
                  <Button content={"Accept it"} className={style.btnAccept} onClick={()=>{
                    updateRequestStatus("accepted", selectedRow.id_request)
                    updateNoDisponibile()
                    onHideModalRow()
                  }}></Button>
                  <Button content={"Decline it"} className={style.btnDecline} onClick={()=>{setDiclined(true)}}></Button>
                </div>:<div className={style.contentModal}>
                <input type='text' onChange={(e)=>setFeedback(e.target.value)} className={style.feedbackInput} placeholder='Write  your feedback...'></input>
                <br />
                <Button content={"Send it"}onClick={()=>{
                  updateRequestStatus("rejected", selectedRow.id_request, selectedRow.index)
                  }} className={style.sendItButton}></Button>
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

export default StudentsRequests