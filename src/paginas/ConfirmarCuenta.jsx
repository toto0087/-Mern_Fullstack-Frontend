import { useEffect, useState } from "react";
import { useParams , Link} from "react-router-dom";
import clienteAxios from "../config/axios";
import Alerta from "../components/Alerta";


const ConfirmarCuenta = () => {
  
  const [cuentaConfirmada,setCuentaConfirmada] = useState(false)
  const [cargando,setCargando] = useState(true)
  const [alerta,setAlerta] = useState({})

  const params = useParams()

  const {id} = params


  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `/veterinarios/confirmar/${id}`

        const { data } = await clienteAxios(url) //Data es la respeusta de axios... 

        setCuentaConfirmada(true)
        setAlerta({
          msg: data.msg    
        })
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error:true

        })
      }

      setCargando(false)
    }
    confirmarCuenta()
  },[]) //array vacio como dependencia el use effect para que se ejecute una sola vez cuando el compoente este lsito

    return (
      <>
        <div> 
              <h1 className="text-indigo-600 font-black text-6xl">Create una Cuenta y Administra tus
                <span className="text-zinc-900"> Pacientes</span>
              </h1> 
        </div>

            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
              {
                !cargando  
                && 
                <Alerta 
                  alerta={alerta}
                />
              }

              {
                cuentaConfirmada  
                && 
                (
                <Link className=" block text-center my-5 text-gray-500 "
                to="/">
                  Iniciar Secion
                </Link>
                )
              }

            </div>
              
      </>
    )
  }
  
  export default ConfirmarCuenta;