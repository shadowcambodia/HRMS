import { useReducer, useEffect,useContext } from 'react'
import alertContext from '../alert/alertContext'
import StaffContext from './StaffContext';
import StaffReducer from './StaffReducer';
import React from 'react'
import {
   LOAD_STAFF,
   LOAD_STAFF_BY_ID,
   ADD_STAFF,
   UPDATE_STAFF,
   DELETE_STAFF,
   SET_CURRENT_STAFF,
   CLEAR_CURRENT_STAFF,
   SET_LOADING,
   CLEAR_LOADING,
   DO_COMBO_BOX
} from '../type'
import Axios from 'axios'

const StaffState = (props) => {
   const initialState = {
      loading: false,
      comboBox:[],
      singleStaff:{
         STF_ID: null,
         STF_FN: '',
         STF_LN: '',
         STF_GENDER: 0,
         STF_MARITAL_ST: 0,
         STF_DOB: '',
         STF_POB: '',
         STATUS_ID: '',
         image:null
        },
      staff: {},
      staffs: [],
      current:null
   };
   const [state, dispatch] = useReducer(StaffReducer, initialState);
   const {setAlert} = useContext(alertContext)
   //LOAD_STAFF
  

   const loadStaff = async () => {
      try {
         setLoading();
         const res = await Axios.get('/api/staff')
         clearLoading();
         if (!res.data.isSuccessed) {
            setAlert(res.data.message)
            return;
         }
         dispatch({ type: LOAD_STAFF, payload: res.data.result });
        
      } catch (error) {
         setAlert(error.message)
      }

   }
   const loadStaffByID = async (ID) => {
      try {
         setLoading();
         const res = await Axios.get('/api/staff/'+ID)
         clearLoading();
         if (!res.data.isSuccessed) {
            setAlert(res.data.message)
            return;
         }
         if ( res.data.result.length ==0) {
            setAlert('There is no match employee')
            return;
         }
         dispatch({ type: LOAD_STAFF_BY_ID, payload: res.data.result[0] });
        
      } catch (error) {
         setAlert(error.message)
      }
   }
   //ADD_staff
   const addStaff = async staff => {
      try {
         
         
         setLoading();
         const res = await Axios.post('/api/staff/add', staff)
         clearLoading()
         if (!res.data.isSuccessed) {
            setAlert(res.data.message)
            return;
         }
         staff.STF_ID = res.data.LAST_INSERT_ID;
         dispatch({ type: ADD_STAFF, payload: staff });
         setAlert('Transaction Successfully',true)
         return true;
      } catch (error) { 
         setAlert(error.message)
         
      }
   }
   //UPDATE
   const updateStaff = async staff => {
      try {
         setLoading();
         console.log('from state   ' +staff);
         const res = await Axios.put('/api/staff/update', staff)
         clearLoading()
         if (!res.data.isSuccessed) {
            setAlert(res.data.message)
            return;
         }
         dispatch({ type: UPDATE_STAFF, payload: staff });
         setAlert('Update Successfully',true)
      } catch (error) {
         setAlert(error.message)
         clearLoading()
      }
   }
   //DELETE
   const deleteStaff = async staff => {
      
      try {
         setLoading();
         const res = await Axios.delete('/api/staff/delete',{
            data:staff
         } )
         // const res = await Axios.delete('/api/staff/delete',staff )
        // window.alert(JSON.stringify(staff))
         clearLoading()
         if (!res.data.isSuccessed) {
            setAlert(res.data.message)
            return;
         }
         dispatch({ type: DELETE_STAFF, payload: staff });
         setAlert('Transaction Successfully',true)
      } catch (error) {
         setAlert(error.message)
         clearLoading()
      }
      
   }

   const doComboBox=async()=>{
      try {
         const res=await Axios.get('/api/statustype');
         dispatch({type:DO_COMBO_BOX,payload:res.data.result})
      } catch (error) {
         
      }
   }
   const setLoading = () => {
      dispatch({ type: SET_LOADING });
   }
   const clearLoading = () => {
      dispatch({ type: CLEAR_LOADING });
   }
   const setCurrent = staff => {
      dispatch({ type: SET_CURRENT_STAFF, payload: staff });
   }
   const clearCurrent = () => {
      dispatch({ type: CLEAR_CURRENT_STAFF });
   }
   return (
      <StaffContext.Provider value={{
         staffs: state.staffs,
         staff: state.staff,
         loading:state.loading,
         loadStaff,
         loadStaffByID,
         addStaff,
         updateStaff,
         deleteStaff,
         singleStaff:state.singleStaff,
         current:state.current,
         setCurrent,
         clearCurrent
      }}>
         {props.children}
      </StaffContext.Provider>
   )
}

export default StaffState

