import React, { useEffect } from "react";
import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import style from "../../styles/teacher/AcceptedStudents.module.css";
import { Link } from "react-router-dom";
import Modal from "../../components/General/Modal";
import Button from "../../components/General/Button";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft
} from "@fortawesome/free-solid-svg-icons";
function AcceptedStudents() {
  const [customers, setCustomers] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null); 
  const [page,setPage] = useState(1)
  const [totalRec, setTotalRec]=useState(1)
  const { globalUser, setGlobalUser } = useContext(UserContext);
  const loadData = async()=>{
    const students_query = "student_query?status=accepted"
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
      if(response.data.requests.count<=8){
        setTotalRec(1)
      }
      else{

        if(response.data.requests.count%8!=0){
          console.log(Math.round(response.data.requests.count/8)+1)

          setTotalRec(Math.round(response.data.requests.count/8)+1)
        }
        else{
          setTotalRec(Math.round(response.data.requests.count/8))
        }
      }
    }
    setCustomers(req)

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
        if(page!=totalRec/8){
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
    if(event.data.status==="accepted"){
      setSelectedRow(event.data);
      setShowModal(true);  
    }
  };

  const onHide = () => {
    setShowModal(false);
  };

  const downloadFile = async(e) =>{
    e.preventDefault()

    try{
      const response = await axios.get("http://localhost:9000/requests/getFilePath/1")
      
      const url = response.data.path;
      console.log(url)
      let url_nou = url.split(`\\`).join("/")

      const full_path = "../../../../backend/"+url_nou
      console.log(full_path)
      const a = document.createElement('a');
      a.href = full_path;
      a.download = 'downloaded-file';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading file:', error.message);
    }
  }

  return (
    <div className={style.mainContainer}>
      <h1>Accepted Students</h1>
      <Link className={style.backButton} to={"/teacher/students-requests"}>
        <div >&lt;</div>
      </Link>
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
            field="mail"
            header="Mail"
            sortable
            style={{ width: "25%" }}
          ></Column>
          <Column
            field="tematica"
            header="Titlu Disertatie"
            sortable
            style={{ width: "25%" }}
          ></Column>
            <Column
            field="status"
            header="Status"
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
            header={selectedRow ? selectedRow.name  : ""}
            content={<div className={style.modalContainer}>
              <div>
                <Button content={"Download file"} className={style.btnDownload} onClick={(e)=>downloadFile(e)}></Button>

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