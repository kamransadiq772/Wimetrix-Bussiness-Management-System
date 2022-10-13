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
import { TextField, Autocomplete, MenuItem, Select, Menu, Button } from '@mui/material';
import './user.css'

import axios from 'axios'
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { styles } from './userStyle'
import Error from '../error/Error';

const User = () => {

  const config = {
    headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}` }
  };

  const [loading, setloading] = useState(false);

  const [errorOpen, seterrorOpen] = useState(false);
  const [errorColor, seterrorColor] = useState("");
  const [errorTitle, seterrorTitle] = useState("");
  const [errorText, seterrorText] = useState("");
  const [deleteError, setdeleteError] = useState(false);

  const [open, setopen] = useState(false)
  const [tdata, settdata] = useState([]);
  const [lines, setlines] = useState([]);
  const [sections, setsections] = useState([]);
  const [modules, setmodules] = useState([]);
  const [data, setdata] = useState({ UserID: 0, UserName: "", Password: "", UserType: 0, LineID: 0, SectionID: 0, UserImageUrl: "", UserThumbnailUrl: "", ModuleID: 0 });
  const [fieldErrors, setfieldErrors] = useState({ UserName: false, Password: false, UserType: false, LineID: false, SectionID: false, ModuleID: false });
  const setInitialData = () => {
    setdata({ UserID: 0, UserName: "", Password: "", UserType: 0, LineID: 0, SectionID: 0, UserImageUrl: "", UserThumbnailUrl: "", ModuleID: 0 })
  }

  const showError = (color, title, text, isdeleteError) => {
    seterrorColor(color); seterrorTitle(title); seterrorText(text); setdeleteError(isdeleteError); seterrorOpen(true)
  }

  const errorOkHandler = (item) => {
    // seterrorOpen(false)
    // setloading(true)
    // axios.delete(`/api/user/${item.UserID}`, config)
    //   .then(response => {
    //     if (response.status === 200) {
    //       showError('#785EE0', 'Deleted Successfully', `Record is Deleted with statusCode(${response.status}).You can see the changes in Table of Content.`)
    //       cancelClick()
    //       return gettdata()
    //     }
    //     setloading(false)
    //   }).catch(err => {
    //     console.log(err.response);
    //     setloading(false)
    //     showError('red',"Request Failed",`${err}`)
    //   })
  }
  const handleNewClick = () => {
    setopen(true)
    // cancelClick()
  }
  const gettdata = async () => {
    setloading(true)
    axios.get('/api/user', config).then(response => {
      settdata(response.data)
      setloading(false)
    }).catch(err => {
      console.log(err)
      setloading(false)
    })
  }
  const getLines = () => {
    axios.get('/api/line', config).then(response => setlines(response.data)).catch(err => console.log(err))
  }
  const getsections = () => {
    axios.get('/api/section', config).then(response => setsections(response.data)).catch(err => console.log(err))
  }
  const getModules = () => {
    axios.get('/api/module', config).then(response => setmodules(response.data)).catch(err => console.log(err))
  }
  const upbtnClick = (item) => {

    const config = {
      headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}` }
    };

    setdata({ ...item, ModuleID: 0 })
    setopen(!open)
    document.getElementById('form').reset()
    document.getElementById('createbtn').style.display = "none"
    document.getElementById('clearbtn').style.display = "none"
    document.getElementById('updatebtn').style.display = "block"
    document.getElementById('cancelbtn').style.display = "block"
  }
  const updateTheRecord = (e) => {
    e.preventDefault()
    if (data.UserID === 0 || !data.UserName || !data.Password || !data.UserType || data.LineID === 0 || data.SectionID === 0 || data.ModuleID === 0){
      handleError()
      return showError('#785EE0', 'Missing Fields', `All Fields Are required`)
    } 


    setloading(true)
    axios.put('/api/user', { UserID: data.UserID, UserName: data.UserName, Password: data.Password, UserType: data.UserType, UserImageUrl: data.UserImageUrl, UserThumbnailUrl: data.UserThumbnailUrl, LineID: data.LineID, SectionID: data.SectionID, ModuleID: data.ModuleID }, config)
      .then(response => {
        if (response.status === 200) {
          document.getElementById('form').reset()
          cancelClick()
          showError('#785EE0', 'Updated Successfully', `Record is Updated with statusCode(${response.status}).You can see the changes in Table of Content.`)
          return gettdata()
        }
        setloading(false)
      }).catch(err => {
        console.log(err);
        setloading(false)
        showError('red', 'Error Occured', `${err}`)
      })

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
    // showError('red', 'Confirm Delete', "Do You Want to Delete. The record will be deleted permanently and cannot be backUp afterward.Do you want to Delete??",)
    if (window.confirm("Continue to delete? The record will be deleted permanently")) {
      setloading(true)
      axios.delete(`/api/user/${item.UserID}`, config)
        .then(response => {
          if (response.status === 200) {
            showError('#785EE0', 'Deleted Successfully', `Record is Deleted with statusCode(${response.status}).You can see the changes in Table of Content.`)
            cancelClick()
            return gettdata()
          }
          setloading(false)
        }).catch(err => {
          console.log(err.response);
          setloading(false)
          showError('red', "Request Failed", `${err}`)
        })
    }
  }
  const handleError = () => {
    Object.keys(data).forEach(key=>{
      if(!data[key] || data[key] === 0){
        setfieldErrors(ps=>({...ps,[key]:true}))
      }else{
        setfieldErrors(ps=>({...ps,[key]:false}))
      }
    })
  }
  const subclick = (e) => {
    e.preventDefault()
    if (!data.UserName || !data.Password || !data.UserType || data.LineID === 0 || data.SectionID === 0 || data.ModuleID === 0){ 
      handleError()
      return showError('#785EE0', 'Missing Fields', `Some required Fields are missing, You have to entre these fields to continue`);      
    }
    setloading(true)
    axios.post('/api/user', { UserName: data.UserName, Password: data.Password, UserType: data.UserType, UserImageUrl: data.UserImageUrl, UserThumbnailUrl: data.UserThumbnailUrl, LineID: data.LineID, SectionID: data.SectionID, ModuleID: data.ModuleID }, config)
      .then(response => {
        if (response.status === 200) {
          document.getElementById('form').reset()
          setInitialData()
          setopen(false)
          gettdata()
          return showError('#785EE0', 'SuccessFully Registered', "User has been successfully registered and could be Updated and Deleted afterward from the table icon.")
        }
        setloading(false)
      }).catch(err => {
        console.log(err.response);
        setloading(false)
        showError('red', 'Error Occured', `${err}`)
      })
  }
  useEffect(() => {
    gettdata()
    getLines()
    getModules()
    getsections()
  }, []);

  if (JSON.parse(localStorage.getItem('user')).UserType !== "Administrator") {
    return (<h1>Only Administrator can Access these rights</h1>)
  }

  return (
    <div style={{ width: '100%' }}>
      {/* Upper  */}
      <div style={styles.upper}>
        <div style={styles.upperHeading} >View User</div>
        <div style={styles.newBtnContainer}>
          <button onClick={handleNewClick} style={styles.newBtn} ><span style={styles.newBtnSpan} ><PlaylistAddIcon sx={styles.newBtnIcon} /></span> ADD USER</button>
        </div>
      </div>
      {/* Table */}
      <div style={styles.tableContainer} >
        <Paper sx={styles.tablePaper}>
          <TableContainer sx={styles.tablePaperInnerTableContainer}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead >
                <TableRow >
                  <TableCell sx={styles.tableHeaderCell}>UserName</TableCell>
                  <TableCell sx={styles.tableHeaderCell}>UserType</TableCell>
                  <TableCell sx={styles.tableHeaderCell}>Update</TableCell>
                  <TableCell sx={styles.tableHeaderCell}>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  tdata.map((item, index) => (
                    <TableRow key={index} sx={{ bgcolor: `${index % 2 === 0 ? "white" : "rgba(120, 94, 224, 0.1)"}`, }}>
                      <TableCell>{item.UserName}</TableCell>
                      <TableCell>{item.UserType}</TableCell>
                      <TableCell><EditIcon onClick={() => upbtnClick(item)} /></TableCell>
                      <TableCell><DeleteIcon color='error' onClick={() => delbtnClick(item)} /></TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
      {/* Modal */}
      <div id="modal" className='modalContainer' style={{ display: `${open ? "flex" : "none"}` }}>
        <div style={styles.modalInner} >

          <div style={styles.modalHeader} >
            <div style={styles.modalHeadingContainer} >
              <p style={styles.modalHeadingPara} >Add User</p>
            </div>
            <div style={styles.modalCrossContainer}>
              <span><CancelIcon onClick={cancelClick} sx={styles.modalCrossIcon} /></span>
            </div>
          </div>

          <form id="form" style={styles.modalForm}>
            <TextField error={fieldErrors.UserName} required value={data.UserName} sx={styles.modalFormInput} label="UserName" onChange={e => setdata(ps => ({ ...ps, UserName: e.target.value }))} />
            <TextField error={fieldErrors.Password} required value={data.Password} id="" sx={styles.modalFormInput} label="Password" onChange={e => setdata(ps => ({ ...ps, Password: e.target.value }))} />
            <TextField value={data.UserImageUrl} id="" sx={styles.modalFormInput} label="UserImageUrl" onChange={e => setdata(ps => ({ ...ps, UserImageUrl: e.target.value }))} />
            <TextField value={data.UserThumbnailUrl} id="" sx={styles.modalFormInput} label="UserThumbnailUrl" onChange={e => setdata(ps => ({ ...ps, UserThumbnailUrl: e.target.value }))} />
            <Select error={fieldErrors.UserType} required sx={styles.modalFormInput}
              label="UserType"
              value={data.UserType}
              onChange={e => setdata(ps => ({ ...ps, UserType: e.target.value }))}
            >
              <MenuItem value={0}>UserType*</MenuItem>
              <MenuItem value="Administrator" >Administrator</MenuItem>
              <MenuItem value="Supervisor" >Supervisor</MenuItem>
              <MenuItem value="Worker" >Worker</MenuItem>
            </Select>
            <Select error={fieldErrors.LineID} required sx={styles.modalFormInput}
              label="Section"
              value={data.LineID}
              onChange={e => setdata(ps => ({ ...ps, LineID: e.target.value }))}
            >
              <MenuItem value={0} >Select Line Code*</MenuItem>
              {
                lines.map((item, index) => <MenuItem value={item.LineID} key={index} >{item.LineCode}</MenuItem>)
              }
            </Select>
            <Select error={fieldErrors.SectionID} required sx={styles.modalFormInput}
              label="Section"
              value={data.SectionID}
              onChange={e => setdata(ps => ({ ...ps, SectionID: e.target.value }))}
            >
              <MenuItem value={0} >Select Section Code*</MenuItem>
              {
                sections.map((item, index) => <MenuItem value={item.SectionID} key={index} >{item.SectionCode}</MenuItem>)
              }
            </Select>
            <Select error={fieldErrors.ModuleID} required sx={styles.modalFormInput}
              label="Modules"
              value={data.ModuleID}
              onChange={e => setdata(ps => ({ ...ps, ModuleID: e.target.value }))}
            >
              <MenuItem value={0} >Select Module Code*</MenuItem>
              {
                modules.map((item, index) => <MenuItem value={item.ModuleID} key={index} >{item.ModuleCode}</MenuItem>)
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
      {/* Loading */}
      <div id="loading" className='loadingContainer' style={{ display: `${loading ? "flex" : "none"}` }} >
        <CircularProgress color='primary' />
      </div>
      {/* Error */}
      <Error errorOpen={errorOpen} setErrorOpen={seterrorOpen} errorColor={errorColor} errorText={errorText} errorTitle={errorTitle} errorOkHandler={errorOkHandler} deleteError={deleteError} />
    </div >
  )
}

export default User