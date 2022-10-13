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
import axios from 'axios'
import { config } from '../config'
import CancelIcon from '@mui/icons-material/Cancel';
import CircularProgress from '@mui/material/CircularProgress'
import { TextField, Autocomplete, MenuItem, Select, Menu, Button } from '@mui/material';
import { styles } from '../User/userStyle'
import '../User/user.css'
import Error from '../error/Error';



const Machine = () => {

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
  const [tdata, settdata] = useState([]);
  const [machineTypes, setmachineTypes] = useState([]);
  const [workers, setworkers] = useState([]);
  const [boxes, setboxes] = useState([]);
  const [lines, setlines] = useState([]);
  const [data, setdata] = useState({ MachineID: 0, MachineCode: "", MachineDescription: "", MachineImageUrl: "", MachineThumbnailUrl: "", MachineTypeID: 0, ActiveWorkerID: 0, LineID: 0, BoxID: 0, IsMachineDown: 0 });
  const [fieldErrors, setfieldErrors] = useState({ MachineCode: false, MachineDescription: false, MachineTypeID: false });


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
    setdata({ MachineID: 0, MachineCode: "", MachineDescription: "", MachineImageUrl: "", MachineThumbnailUrl: "", MachineTypeID: 0, ActiveWorkerID: 0, LineID: 0, BoxID: 0, IsMachineDown: 0 })
  }

  const handleNewClick = () => {
    cancelClick()
  }
  const gettdata = () => {
    setloading(true)
    axios.get('/api/machine', config).then(response => { settdata(response.data); setloading(false) }).catch(err => { console.log(err); setloading(false) })
  }
  const getMachineTypes = () => {
    axios.get('/api/machineType', config).then(response => setmachineTypes(response.data)).catch(err => console.log(err))
  }
  const getWorkers = () => {
    axios.get('/api/worker', config).then(response => setworkers(response.data)).catch(err => console.log(err))
  }
  const getLines = () => {
    axios.get('/api/line', config).then(response => setlines(response.data)).catch(err => console.log(err))
  }
  const getBoxes = () => {
    axios.get('/api/box', config).then(response => setboxes(response.data)).catch(err => console.log(err))
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
    if (data.MachineID === 0 || !data.MachineCode || !data.MachineDescription || data.MachineTypeID === 0) {
      handleError()
      return showError('#785EE0', 'Missing Fields', `Some required Fields are missing, You have to entre these fields to continue`);
    }
    setloading(true)
    axios.put('/api/machine', { MachineID: data.MachineID, MachineCode: data.MachineCode, MachineDescription: data.MachineDescription, MachineImageUrl: data.MachineImageUrl, MachineThumbnailUrl: data.MachineThumbnailUrl, MachineTypeID: data.MachineTypeID, ActiveWorkerID: data.ActiveWorkerID, LineID: data.LineID, BoxID: data.BoxID, IsMachineDown: data.IsMachineDown }, config)
      .then(response => {
        if (response.status === 200) {
          document.getElementById('form').reset()
          cancelClick()
          showError('#785EE0', 'Updated Successfully', `Record is Updated with statusCode(${response.status}).You can see the changes in Table of Content.`)
          return gettdata()
        }
        setloading(false)
      }).catch(err => { console.log(err); setloading(false); showError('red', 'Error Occured', `${err}`) })

  }
  const clearClick = () => {
    document.getElementById('form').reset()
    setInitialData()
  }
  const cancelClick = () => {
    document.getElementById('form').reset()
    document.getElementById('createbtn').style.display = "block"
    document.getElementById('clearbtn').style.display = "block"
    document.getElementById('updatebtn').style.display = "none"
    document.getElementById('cancelbtn').style.display = "none"
    setopen(!open)
    setInitialData()
  }
  const delbtnClick = (item) => {
    if (window.confirm("Continue to delete? The record will be deleted permanently")) {
      setloading(true)
      axios.delete(`/api/machine/${item.MachineID}`, config)
        .then(response => {
          if (response.status === 200) {
            showError('#785EE0', 'Deleted Successfully', `Record is Deleted with statusCode(${response.status}).You can see the changes in Table of Content.`)
            cancelClick()
            return gettdata()
          }
          setloading(false)
        }).catch(err => { console.log(err.response); setloading(false); showError('red', "Request Failed", `${err}`) })
    }
  }
  const subclick = (e) => {
    e.preventDefault()
    if (!data.MachineCode || !data.MachineDescription || data.MachineTypeID === 0) {
      handleError()
      return showError('#785EE0', 'Missing Fields', `Some required Fields are missing, You have to entre these fields to continue`);
    }
    setloading(true)
    axios.post('/api/machine', { MachineCode: data.MachineCode, MachineDescription: data.MachineDescription, MachineImageUrl: data.MachineImageUrl, MachineThumbnailUrl: data.MachineThumbnailUrl, MachineTypeID: data.MachineTypeID, ActiveWorkerID: data.ActiveWorkerID, LineID: data.LineID, BoxID: data.BoxID, IsMachineDown: data.IsMachineDown }, config)
      .then(response => {
        if (response.status === 200) {
          document.getElementById('form').reset()
          setInitialData()
          setopen(false)
          gettdata()
          return showError('#785EE0', 'SuccessFully Inserted', "Machine has been Inserted registered and could be Updated and Deleted afterward from the table icon.")
        }
        setloading(false)
      }).catch(err => { console.log(err.response); setloading(false); showError('red', 'Error Occured', `${err}`) })
  }
  useEffect(() => {
    getMachineTypes()
    getWorkers()
    getLines()
    getBoxes()
    gettdata()
  }, []);


  return (
    <div style={{ width: '100%' }}>

      <div style={styles.upper}>
        <div style={styles.upperHeading} >View Macines</div>
        <div style={styles.newBtnContainer}>
          <button onClick={handleNewClick} style={{ display: `${JSON.parse(localStorage.getItem('user')).UserType === 'Worker' ? "none" : "flex"}`, cursor: 'pointer', height: '60%', alignItems: 'center', padding: '0px 20px', borderRadius: '50px', border: '0px', backgroundColor: '#785EE0', color: 'white', fontWeight: 'bold', fontSize: "11px" }} ><span style={{ marginRight: '10px' }} ><AddCircleOutlineIcon sx={{ fontSize: '18px' }} /></span> ADD MACHINE</button>
        </div>
      </div>

      <div style={styles.tableContainer}>
        <Paper sx={styles.tablePaper}>
          <TableContainer sx={styles.tablePaperInnerTableContainer}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead >
                <TableRow >
                  <TableCell sx={styles.tableHeaderCell}>MachineCode</TableCell>
                  <TableCell sx={styles.tableHeaderCell}>MachineDescription</TableCell>
                  <TableCell sx={{ backgroundColor: '#785EE0', color: 'white', display: `${JSON.parse(localStorage.getItem('user')).UserType === 'Worker' ? "none" : ""}` }}>Update</TableCell>
                  <TableCell sx={{ backgroundColor: '#785EE0', color: 'white', display: `${JSON.parse(localStorage.getItem('user')).UserType === 'Worker' ? "none" : ""}` }}>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  tdata.map((item, index) => (
                    <TableRow key={index} sx={{ bgcolor: `${index % 2 === 0 ? "white" : "rgba(120, 94, 224, 0.1)"}`, borderBottom: '3px solid rgba(187, 187, 187, 0.5)' }}>
                      <TableCell>{item.MachineCode}</TableCell>
                      <TableCell>{item.MachineDescription}</TableCell>
                      <TableCell sx={{ display: `${JSON.parse(localStorage.getItem('user')).UserType === 'Worker' ? "none" : ""}` }}><EditIcon onClick={() => upbtnClick(item)} /></TableCell>
                      <TableCell sx={{ display: `${JSON.parse(localStorage.getItem('user')).UserType === 'Worker' ? "none" : ""}` }}><DeleteIcon color='error' onClick={() => delbtnClick(item)} /></TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </TableContainer>
          {/* <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            /> */}
        </Paper>
      </div>

      <div id="modal" className='modalContainer' style={{ display: `${open ? "flex" : "none"}` }}>
        <div style={styles.modalInner} >

          <div style={styles.modalHeader} >
            <div style={styles.modalHeadingContainer} >
              <p style={styles.modalHeadingPara} >Add Machine</p>
            </div>
            <div style={styles.modalCrossContainer}>
              <span><CancelIcon onClick={cancelClick} sx={styles.modalCrossIcon} /></span>
            </div>
          </div>


          <form id="form" style={styles.modalForm}>
            <TextField error={fieldErrors.MachineCode} required value={data.MachineCode} id='' sx={styles.modalFormInput} label="MachineCode" onChange={e => setdata(ps => ({ ...ps, MachineCode: e.target.value }))} />
            <TextField error={fieldErrors.MachineDescription} required value={data.MachineDescription} id="" sx={styles.modalFormInput} label="MachineDescription" onChange={e => setdata(ps => ({ ...ps, MachineDescription: e.target.value }))} />
            <TextField value={data.MachineImageUrl} id="" sx={styles.modalFormInput} label="MachineImageURL" onChange={e => setdata(ps => ({ ...ps, MachineImageUrl: e.target.value }))} />
            <TextField value={data.MachineThumbnailUrl} id="" sx={styles.modalFormInput} label="MachineThumbnailURL" onChange={e => setdata(ps => ({ ...ps, MachineThumbnailUrl: e.target.value }))} />
            {/* <TextField type="number" value={data.IsMachineDown} max={1} min={-1} id="" sx={{marginRight:'10px',marginBottom:'10px'}} label="IsMachineDown" onChange={e => setdata(ps=>({...ps,TodayProduction:e.target.value}))} /> */}
            <Select sx={styles.modalFormInput}
              label="ActiveWorker"
              value={data.ActiveWorkerID}
              onChange={e => setdata(ps => ({ ...ps, ActiveWorkerID: e.target.value }))}
            >
              <MenuItem value={0}>Select Active Worker</MenuItem>
              {
                workers.map((item, index) => <MenuItem value={item.WorkerID} key={index} >{item.WorkerCode}</MenuItem>)
              }
            </Select>
            <Select sx={styles.modalFormInput}
              label="Line"
              value={data.LineID}
              onChange={e => setdata(ps => ({ ...ps, LineID: e.target.value }))}
            >
              <MenuItem value={0} >Select Line Code</MenuItem>
              {
                lines.map((item, index) => <MenuItem value={item.LineID} key={index} >{item.LineCode}</MenuItem>)
              }
            </Select>
            <Select required error={fieldErrors.MachineTypeID} sx={styles.modalFormInput}
              label="MachineTypeID"
              value={data.MachineTypeID}
              onChange={e => setdata(ps => ({ ...ps, MachineTypeID: e.target.value }))}
            >
              <MenuItem value={0} >Select MachineType*</MenuItem>
              {
                machineTypes.map((item, index) => <MenuItem value={item.MachineTypeID} key={index} >{item.MachineTypeCode}</MenuItem>)
              }
            </Select>
            <Select sx={styles.modalFormInput}
              label="Box"
              value={data.BoxID}
              onChange={e => setdata(ps => ({ ...ps, BoxID: e.target.value }))}
            >
              <MenuItem value={0} >Select Box Code</MenuItem>
              {
                boxes.map((item, index) => <MenuItem value={item.BoxID} key={index} >{item.BoxCode}</MenuItem>)
              }
            </Select>
            <Select sx={styles.modalFormInput}
              label="IsMachineDown"
              value={data.IsMachineDown}
              onChange={e => setdata(ps => ({ ...ps, IsMachineDown: e.target.value }))}
            >
              <MenuItem value={0} >Not Machine Down</MenuItem>
              <MenuItem value={1} >Machine is Down</MenuItem>
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

export default Machine