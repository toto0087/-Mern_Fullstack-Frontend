import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import useAuth from '../hooks/UseAuth' // recordar que necesitamos el hook para tomar info del context
import Header from '../components/Header'
import Footer from '../components/Footer'

const RutaProtegida = () => {

    const {auth,cargando} = useAuth()
    if(cargando) return "cargando..."

  return (
    <>
        <Header />
            {auth?._id ? ( 
                <main className='container mx-auto mt-10'>
                    <Outlet /> 
                </main>
            ): <Navigate to="/" /> }  {/* si el usuario esta identificado muestra el outlet(contenido de componentes) , sino nos envia a inicio */}
        <Footer /> 
    </>
  )
}

export default RutaProtegida