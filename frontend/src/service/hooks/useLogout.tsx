/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const {dispatch}: any = useAuthContext()
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('user')

    dispatch({type: "LOGOUT"})
    navigate('/login')
  }
  return {logout}
}