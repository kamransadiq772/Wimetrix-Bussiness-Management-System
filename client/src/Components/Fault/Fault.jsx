import React, { useState, useEffect } from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import StickyHeadTable from '../Table/Table';
import Modal from '../Modal/Modal';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import CancelIcon from '@mui/icons-material/Cancel';
import CircularProgress from '@mui/material/CircularProgress'
import { styles } from '../User/userStyle'
import '../User/user.css'
import Error from '../error/Error';

import { TextField, Autocomplete, MenuItem, Select, Menu, Button } from '@mui/material';
import axios from 'axios'


const Fault = () => {
  const [loading, setloading] = useState(false);

  const config = {
    headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}` }
  };

  const [errorOpen, seterrorOpen] = useState(false);
  const [errorColor, seterrorColor] = useState("");
  const [errorTitle, seterrorTitle] = useState("");
  const [errorText, seterrorText] = useState("");
  const [deleteError, setdeleteError] = useState(false);

  const [open, setopen] = useState(false)
  const [sections, setsections] = useState([]);
  const [tdata, settdata] = useState([]);

  const [data, setdata] = useState({ FaultID: 0, FaultCode: "", FaultDescription: "", SectionID: 0 });
  const [fieldErrors, setfieldErrors] = useState({ FaultCode: false, FaultDescription: false, SectionID: false });


  const handleError = () => {
    Object.keys(data).forEach(key => {
      if (!data[key] || data[key] === 0) {
        setfieldErrors(ps => ({ ...ps, [key]: true }))
      } else {
        setfieldErrors(ps => ({ ...ps, [key]: false }))
      }
    })
  }
  const showError = (color, title, text, isdeleteError) => {
    seterrorColor(color); seterrorTitle(title); seterrorText(text); setdeleteError(isdeleteError); seterrorOpen(true)
  }

  const setInitialData = () => {
    setdata({ FaultID: 0, FaultCode: "", FaultDescription: "", SectionID: 0 })
  }

  const handleNewClick = () => {
    setopen(!open)
  }
  const getSections = () => {
    axios.get('/api/section', config).then(response => setsections(response.data)).catch(err => console.log(err))
  }
  const gettdata = () => {
    setloading(true)
    axios.get('/api/fault', config).then(response => { settdata(response.data); setloading(false) }).catch(err => { console.log(err); setloading(false) })
  }
  const upbtnClick = (item) => {
    setdata(item)
    setopen(!open)
    document.getElementById('form').reset()
    document.getElementById('createbtn').style.display = "none"
    document.getElementById('clearbtn').style.display = "none"
    document.getElementById('updatebtn').style.display = "block"
    document.getElementById('cancelbtn').style.display = "block"
  }
  const updateTheRecord = (e) => {
    e.preventDefault()
    if (data.FaultID === 0 || !data.FaultCode || !data.FaultDescription || data.SectionID === 0) {
      handleError()
      return showError('#785EE0', 'Missing Fields', `Some required Fields are missing, You have to entre these fields to continue`);
    }
    setloading(true)
    axios.put('/api/fault', { FaultID: data.FaultID, FaultCode: data.FaultCode, FaultDescription: data.FaultDescription, SectionID: data.SectionID }, config)
      .then(response => {
        if (response.status === 200) {
          document.getElementById('form').reset()
          setdata({ FaultID: 0, FaultCode: "", FaultDescription: "", SectionID: 0 })
          setopen(false)
          gettdata()
          showError('#785EE0', 'Updated Successfully', `Record is Updated with statusCode(${response.status}).You can see the changes in Table of Content.`)
          return gettdata()
        }
        setloading(false)
      }).catch(err => { console.log(err); setloading(false);showError('red', 'Error Occured', `${err}`) })
  }
  const clearClick = () => {
    document.getElementById('form').reset()
    setdata({ FaultID: 0, FaultCode: "", FaultDescription: "", SectionID: 0 })
  }
  const cancelClick = () => {
    document.getElementById('form').reset()
    document.getElementById('createbtn').style.display = "block"
    document.getElementById('clearbtn').style.display = "block"
    document.getElementById('updatebtn').style.display = "none"
    document.getElementById('cancelbtn').style.display = "none"
    setopen(false)
    setdata({ FaultID: 0, FaultCode: "", FaultDescription: "", SectionID: 0 })
  }
  const delbtnClick = (item) => {
    if (window.confirm("Continue to delete? The record will be deleted permanently")) {
      setloading(true)
      axios.delete(`/api/fault/${item.FaultID}`, config)
        .then(response => {
          if (response.status === 200) {
            showError('#785EE0', 'Deleted Successfully', `Record is Deleted with statusCode(${response.status}).You can see the changes in Table of Content.`)
            return gettdata()
          }
          setloading(false)
        }).catch(err => { console.log(err.response); setloading(false);showError('red', "Request Failed", `${err}`) })
    }
  }
  const subclick = (e) => {
    e.preventDefault()
    if (!data.FaultCode || !data.FaultDescription || data.SectionID == 0) {
      handleError()
      return showError('#785EE0', 'Missing Fields', `Some required Fields are missing, You have to entre these fields to continue`);
    }
    setloading(true)
    axios.post('/api/fault', { FaultCode: data.FaultCode, FaultDescription: data.FaultDescription, SectionID: data.SectionID }, config)
      .then(response => {
        if (response.status === 200) {
          document.getElementById('form').reset()
          setdata({ FaultID: 0, FaultCode: "", FaultDescription: "", SectionID: 0 })
          setopen(false)
          gettdata()
          return showError('#785EE0', 'SuccessFully Inserted', "Fault has been successfully inserted and could be Updated and Deleted afterward from the table icon.")
        }
        setloading(false)
      }).catch(err => { console.log(err.response); setloading(false); showError('red', 'Error Occured', `${err}`); })
  }
  useEffect(() => {
    gettdata()
    getSections()
  }, []);


  return (
    <div style={{ width: '100%' }}>
      <div style={styles.upper}>
        <div style={styles.upperHeading} >View Fault</div>
        <div style={styles.newBtnContainer}>
          <button onClick={handleNewClick} style={{ display: `${JSON.parse(localStorage.getItem('user')).UserType === 'Worker' ? "none" : "flex"}`, cursor: 'pointer', height: '60%', alignItems: 'center', padding: '0px 20px', borderRadius: '50px', border: '0px', backgroundColor: '#785EE0', color: 'white', fontWeight: 'bold', fontSize: "11px" }} ><span style={styles.newBtnSpan} ><AddCircleOutlineIcon sx={styles.newBtnIcon} /></span> ADD FAULT</button>
        </div>
      </div>

      <div style={styles.tableContainer}>
        <Paper sx={styles.tablePaper}>
          <TableContainer sx={styles.tablePaperInnerTableContainer}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead >
                <TableRow >
                  <TableCell sx={styles.tableHeaderCell}>FaultCode</TableCell>
                  <TableCell sx={styles.tableHeaderCell}>FaultDesc</TableCell>
                  <TableCell sx={{ backgroundColor: '#785EE0', color: 'white', display: `${JSON.parse(localStorage.getItem('user')).UserType === 'Worker' ? "none" : ""}` }}>Update</TableCell>
                  <TableCell sx={{ backgroundColor: '#785EE0', color: 'white', display: `${JSON.parse(localStorage.getItem('user')).UserType === 'Worker' ? "none" : ""}` }}>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  tdata.map((item, index) => (
                    <TableRow key={index} sx={{ bgcolor: `${index % 2 === 0 ? "white" : "rgba(120, 94, 224, 0.1)"}` }}>
                      <TableCell>{item.FaultCode}</TableCell>
                      <TableCell>{item.FaultDescription}</TableCell>
                      <TableCell sx={{ display: `${JSON.parse(localStorage.getItem('user')).UserType === 'Worker' ? "none" : ""}` }} ><EditIcon onClick={() => upbtnClick(item)} /></TableCell>
                      <TableCell sx={{ display: `${JSON.parse(localStorage.getItem('user')).UserType === 'Worker' ? "none" : ""}` }}><DeleteIcon color='error' onClick={() => delbtnClick(item)} /></TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>

      <div id="modal" className='modalContainer' style={{ display: `${open ? "flex" : "none"}` }}>
        <div style={styles.modalInner} >

          <div style={styles.modalHeader} >
            <div style={styles.modalHeadingContainer} >
              <p style={styles.modalHeadingPara} >Add Fault</p>
            </div>
            <div style={styles.modalCrossContainer}>
              <span><CancelIcon onClick={cancelClick} sx={styles.modalCrossIcon} /></span>
            </div>
          </div>


          <form id="form" style={styles.modalForm}>
            <TextField error={fieldErrors.FaultCode} required value={data.FaultCode} id='FaultCode' sx={styles.modalFormInput} label="FaultCode" onChange={e => setdata(ps => ({ ...ps, FaultCode: e.target.value }))} />
            <TextField error={fieldErrors.FaultDescription} required value={data.FaultDescription} id="FaultDescription" sx={styles.modalFormInput} label="FaultDescription" onChange={e => setdata(ps => ({ ...ps, FaultDescription: e.target.value }))} />
            <Select error={fieldErrors.SectionID} sx={styles.modalFormInput}
              labelId="demo-simple-select-label"
              id="SectionID"
              label="Age"
              value={data.SectionID}
              onChange={e => setdata(ps => ({ ...ps, SectionID: e.target.value }))}
            >
              <MenuItem value={0} >Select SectionCode*</MenuItem>
              {
                sections.map((item, index) => <MenuItem value={item.SectionID} key={index} >{item.SectionCode}</MenuItem>)
              }
            </Select>
          </form>



          <div style={styles.modalButtonContainer}>
            <Button id='createbtn' onClick={subclick} type="" sx={styles.modalCreateButton}>Create</Button>
            <Button id='clearbtn' onClick={clearClick} sx={styles.modalClearButton}>Clear</Button>
            <Button id='updatebtn' onClick={updateTheRecord} sx={styles.modalUpdateButton}>Update</Button>
            <Button id='cancelbtn' onClick={cancelClick} sx={styles.modalCancelButton}>Cancel</Button>
          </div>

        </div>
      </div>

      <div id="loading" className='loadingContainer' style={{ display: `${loading ? "flex" : "none"}` }} >
        <CircularProgress color='primary' />
      </div>

      {/* Error */}
      <Error errorOpen={errorOpen} setErrorOpen={seterrorOpen} errorColor={errorColor} errorText={errorText} errorTitle={errorTitle} deleteError={deleteError} />

    </div>
  )
}

export default Fault