import React, { useEffect } from "react";
import { useState } from "react";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import style from "../../styles/teacher/AcceptedStudents.module.css";
import { Link } from "react-router-dom";
import Modal from "../../components/General/Modal";
import Button from "../../components/General/Button";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";

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
  


  const [showModal, setShowModal] = useState(false);

  const onRowSelect = (event) => {
    if(event.data.stare_cerere === "accepted"){
      setSelectedRow(event.data);
      setShowModal(true);
    }
  };

  const onHide = () => {
    setShowModal(false);
  };


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
        </DataTable>

        
      </div>{" "}
      <Modal
            visible={showModal}
            onHide={onHide}
            header={selectedRow ? selectedRow.name  : ""}
            content={<div className={style.modalContainer}>
              <div>
                <Button content={"Download file"} className={style.btnDownload}></Button>

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
