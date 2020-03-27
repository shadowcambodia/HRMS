import React, { useState, useContext, useEffect } from 'react'

import Alert from '../layout/Alert'
import Spinner from '../layout/Spinner'
import StatusTypeContext from './../../context/statusType/StatusTypeContext'
import StatusTypeState from './../../context/statusType/StatusTypeState'
import StaffContext from './../../context/staff/StaffContext'
import {STATUS_TYPE,GENDER_TYPE,MARITAL_TYPE} from '../../helper/Constant'
import Axios from 'axios'
const StaffModifiedModal = ({type, staffID }) => {
   const {loadStatus,allStatus} = useContext(StatusTypeContext)
   const  cbStatus=allStatus.filter(c=>c.CATEGORY==STATUS_TYPE)
   const cbGender=allStatus.filter(c=>c.CATEGORY==GENDER_TYPE)
   const cbMarital=allStatus.filter(c=>c.CATEGORY==MARITAL_TYPE)

   const { singleStaff,staffs,loadStaffByID,addStaff,updateStaff,loading } = useContext(StaffContext)
   
   const [Staff, setStaff] = useState(
   {
            STF_ID: null,
            STF_FN: '',
            STF_LN: '',
            STF_GENDER: 0,
            STF_MARITAL_ST: 0,
            STF_DOB: '',
            STF_POB: '',
            STATUS_ID: '',
            image:null
       
      } 
   )
const assignState =()=>{
   if (singleStaff !=={}) {
      setStaff(singleStaff)
   }
}
   
   const [file,setFile]=useState(null)
   useEffect(  () => {
      loadStatus(STATUS_TYPE)
      type!=='add' && setStaff(singleStaff)
   }, [singleStaff])
   

   const {
      STF_ID,
      STF_FN,
      STF_LN,
      STF_GENDER,
      STF_MARITAL_ST,
      STF_DOB,
      STF_POB,
      STATUS_ID
   }=Staff

   const fileSeclectedhandler=e=>{
      setFile(e.target.files[0])
   }
   const uploadFile=()=>{

   }
   const onChange = e => {
      setStaff({ ...Staff, [e.target.name]: e.target.value });
   }

   const createStaff = () => {
      addStaff(Staff)
   }
   
   const onSubmite = e => {
      e.preventDefault();
      type === 'add' ? createStaff() : updateStaff(Staff)

   }
   return (
      <form onSubmit={onSubmite} style={{backgroundColor:'white',height:'100%'}}>
         {loading ? <Spinner /> : <Alert />}
         
         
         <div className='float-right' style={{ width: '150px', height: '150px', backgroundColor: 'red' }}>
         {/* <label id="getFileLabel" for="getFile" className='m-auto text-align-center'>
             <i className="m-auto fas fa-upload" style={{fontSize:'2em'}}></i>
         </label> */}
        
         <input type="file" onChange={fileSeclectedhandler} id="getFile" />
         </div>
         
         <input type="file" id="file_upload" className="d-none"/>
         {/* FIRST NAME */}
         <div className="form-group row">
            <label htmlFor="firstName" className="col-sm-2 col-form-label">First Name</label>
            <div className="col-sm-10">
               <input autoFocus type="text" onChange={onChange} className="form-control" autoComplete='off'
                name="STF_FN" value={STF_FN} placeholder="First Name" />
            </div>
         </div>
         {/* LAST NAME */}
         <div className="form-group row">
            <label htmlFor="" className="col-sm-2 col-form-label">Last Name</label>
            <div className="col-sm-10">
               <input type="text" onChange={onChange} className="form-control" autoComplete='off' 
               name="STF_LN" value={STF_LN} placeholder="Last Name" />
            </div>
         </div>
         {/* GENDER */}
         <div className="form-group row">
            <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Gender</label>
            <div className="col-sm-10">
               <select onChange={onChange} className="form-control" autoComplete='off' 
               name="STF_GENDER" value={STF_GENDER} placeholder="Gender" >
                  <option onChange={onchange} value={0}>---Select---</option>
                  {
                     cbGender.map(s=>(<option onChange={onchange} value={s.ST_ID}>{s.ST_DESC}</option>))
                   } 
               </select>
            </div>
         </div>
         {/* MARITAL STATUS */}
         <div className="form-group row">
            <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Marital Status</label>
            <div className="col-sm-10">
               <select onChange={onChange} className="form-control" autoComplete='off' 
               name="STF_MARITAL_ST" value={STF_MARITAL_ST} placeholder="Marital Status" >
                  <option onChange={onchange} value={0}>---Select---</option>
                  {
                    cbMarital.map(s=>(<option onChange={onchange} name="STF_MARITAL_ST" value={s.ST_ID}>{s.ST_DESC}</option>))
                  }
               </select>
            </div>
         </div>
         {/* DOB */}
         <div className="form-group row">
            <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Date Of Birth</label>
            <div className="col-sm-10">
               <input type="text" onChange={onChange} className="form-control" autoComplete='off' 
               name="STF_DOB" value={STF_DOB} placeholder="Date Of Birth" />
            </div>
         </div>
         {/* POB */}
         <div className="form-group row">
            <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Place Of Birth</label>
            <div className="col-sm-10">
               <input type="text" onChange={onChange} className="form-control" autoComplete='off' 
               name="STF_POB" value={STF_POB} placeholder="Place Of Birth" />
            </div>
         </div>
         {/* STATUS */}
         <div className="form-group row">
            <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Status</label>
            <div className="col-sm-10">
               {/* <input type="text" onChange={onChange} className="form-control" autoComplete='off' 
               name="STATUS_ID" value={STATUS_ID} placeholder="Status" /> */}
               <select name="STATUS_ID" className="form-control" onChange={onChange} value={STATUS_ID} >
               <option onChange={onchange} value={0}>---Select---</option>
                   {
                    cbStatus.map(s=>(<option onChange={onchange} name="STATUS_ID" value={s.ST_ID}>{s.ST_DESC}</option>))
                  } 
                 
               </select>
            </div>
         </div>
         <div className="d-flex justify-content-center">
         <button type="submit"  id='submit'className="btn btn-primary">Save</button>
         </div>
      </form>
   )
}

export default StaffModifiedModal
