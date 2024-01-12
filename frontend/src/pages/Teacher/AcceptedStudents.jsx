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
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

function AcceptedStudents() {
  const [customers, setCustomers] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null); 
  const [page,setPage] = useState(1)
  const [totalRec, setTotalRec]=useState(1)
  const { globalUser, setGlobalUser } = useContext(UserContext);
  const [file, setFile] = useState();

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
      const response = await axios.get(`http://localhost:9000/requests/getFilePath/${selectedRow.id_request}`)
      console.log(response.data)
      let name = response.data.split("\\")
      console.log(name[2])
      window.open(`http://localhost:9000/${name[2]}`, '_blank');
    } catch (error) {
      console.error('Error downloading file:', error.message);
    }
  }

  const updateRequestStatus = async() =>{
    await axios.put(`http://localhost:9000/requests/updateRequest/${selectedRow.id_request}`,{status:"final"}).then((resp)=>{
      console.log("response update: ", resp)
    }).catch(err=>{
      console.log("eroare la update de request + eroare:", err)
    })
  }
  const updateFile = async() =>{
    const formData = new FormData();
    formData.append("file", file);
    await axios
      .post(`http://localhost:9000/requests/uploadFile/${selectedRow.id_request}`, formData)
      .then((res) => {
        console.log(res.status)
        toast.success("🦄 Your file has been uploaded", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        updateRequestStatus()
      })
      .catch((er) => {
        toast.error("Sorry, but there was an error, please try again", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        console.log(er)
      });
  }

  return (
    <div className={style.mainContainer}>
      <h1>Accepted Requests</h1>
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
                <input type="file" name="file"  onChange={(e) => setFile(e.target.files[0])}/>
                <button onClick={updateFile}>Send file</button>
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
  );
}

export default AcceptedStudents;