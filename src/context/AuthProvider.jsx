import { useState, useEffect , createContext } from "react"
import clienteAxios from "../config/axios"


const AuthContext = createContext() // habilita funciones de context API

const AuthProvider = ({children}) => {

    const [cargando,setCargando] = useState(true)
    const [auth,setAuth] = useState({})

    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem("token")
            if(!token) {
            setCargando(false)
            return
           }

            const config = {
                headers: { // esto se envia antes de la peticion y es la autorizacion del bearer token
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const { data } =  await clienteAxios("/veterinarios/perfil",
                config) //cuando se envia la peticion post con la info, va a la url, luego a los datos y 
                // luego a la configuracion que ahi esta el header autenticado
                setAuth(data)
            } catch (error) {
                console.log(error.response.data.msg)
                setAuth({})
            }
            setCargando(false)
        }
        autenticarUsuario()
    },[])


    const cerrarSesion = () => {
        localStorage.removeItem("token")
        setAuth({})
    }

    const actualizarPerfil = async datos => {
        const token = localStorage.getItem("token")
        if(!token) {
         setCargando(false)
         return
        }

        const config = {
            headers: { // esto se envia antes de la peticion y es la autorizacion del bearer token
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const url = `/veterinarios/perfil/${datos._id}`
            await clienteAxios.put(url,datos,config)

            return { 
                msg: "Almacenado Correctamente"
            }
        } catch (error) {
            return { 
                msg: error.response.data.msg,
                error: true
            }
        }

    }

    const guardarPassword = async (datos) => {
        const token = localStorage.getItem("token")
            if(!token) {
            setCargando(false)
            return
           }

            const config = {
                headers: { // esto se envia antes de la peticion y es la autorizacion del bearer token
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const url = "/veterinarios/actualizar-password"
                await clienteAxios.put(url,datos,config)
    
                return { 
                    msg: "Almacenado Correctamente"
                }
            } catch (error) {
                return { 
                    msg: error.response.data.msg,
                    error: true
                }
            }
    }


    //aqui definimos states disponibles globalmente
    return ( 
        <AuthContext.Provider
            value={{
                auth, // aqui haemos un objeto con todo lo disponible cuando mandamos a llamar a useAuth en el login.
                setAuth,
                cargando,
                cerrarSesion,
                actualizarPerfil,
                guardarPassword
            }}
        >
            {/* aqui retornamos el context, aqui nacen los datos , el provider retorna el cotnexto basicamente  */}
            {children}
        </AuthContext.Provider>
    )
}

export { 
    AuthProvider 
}

export default AuthContext 

