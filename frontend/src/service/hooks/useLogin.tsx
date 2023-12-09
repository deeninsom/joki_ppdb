/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"
import { useAuthContext } from "./useAuthContext"
import axiosInstance from "../_api"
import { useNavigate } from "react-router-dom"

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsloading] = useState(false)
  const { dispatch }: any = useAuthContext()
  const navigate = useNavigate()

  const login = async (username: any, password: any) => {
    setIsloading(true)
    setError(null)

    axiosInstance.post('/auth/login', {
      username: username,
      password: password
  })
      .then((response) => {
        localStorage.setItem('user', JSON.stringify(response))
        dispatch({ type: 'LOGIN', payload: response })
        setIsloading(false)
        navigate('/admin-panel')
      })
      .catch((error) => {
        setIsloading(false)
          setError(error.response.data.message);
      });
  } 
  return { login, error, isLoading }
}