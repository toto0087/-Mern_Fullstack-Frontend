import { useState } from "react" 
import { Link, useNavigate } from "react-router-dom"
import useAuth from "../hooks/UseAuth"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/axios"

const Login = () => {

  
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [alerta,setAlerta] = useState({})
  
  const {setAuth} = useAuth()

  const navigate = useNavigate()

  const handleSumbit = async (e) => {
    e.preventDefault()

    if( [email,password].includes("") ) {
      setAlerta({ msg: "hay campos vacios", error: true})
      return;
    }

     if(password.length < 6) {
      setAlerta({ msg: "La contraseña es muy corta, agrega minimo 8 caracteres", error: true})
      return;
     }

     try {
      const {data} = await clienteAxios.post("/veterinarios/login",{email,password})
      localStorage.setItem("token", data.token)
      setAuth(data)
      navigate("/admin")
    } catch (error) {
      setAlerta({
        msg : error.response.data.msg, //guardamos token de inicio en localS
        error: true
      })
     }
    

}
      
  const {msg} = alerta

  return (
    <>    
        <div> 
          <h1 className="text-indigo-600 font-black text-6xl">Inicia Sesion y Administra tus
          <span className="text-zinc-900"> Pacientes</span>
          </h1> 
        </div>


        <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">

           {
            msg && <Alerta  //si esta el mensaje le damos alerta, sino setAlerta vacio
                alerta={alerta} 
              />
            }


          <form action="" onSubmit={handleSumbit}>

            <div className="my-5">
              <label htmlFor="" className="uppercase text-gray-600 font-bold text-xl block" >Email</label>
              <input type="email" placeholder="Email de Registro" className="border w-full p-3 bg-gray-50 rounded-xl" 
              value={email} 
              onChange={e => setEmail(e.target.value)}
              />
            </div>

            <div className="my-5">
              <label htmlFor="" className="uppercase text-gray-600 font-bold text-xl block" >Password</label>
              <input type="password" placeholder="Tu Password" className="border w-full p-3 bg-gray-50 rounded-xl" 
              value={password} 
              onChange={e => setPassword(e.target.value)}
              />
            </div>

            <input type="submit" value="Iniciar Secion" className=" bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto " />

          </form>

              <nav className=" lg:flex mt-10 lg:flex-col lg:items-start ">
                <Link 
                  className=" block text-center my-5 text-gray-500 "
                  to="/registrar">¿No tienes una cuenta? 
                </Link>
                <Link 
                  className=" block text-center my-5 text-gray-500 "
                  to="/olvide-password">Olvide mi contraseña
                </Link>
              </nav>
        </div>
    </>
  )
}

export default Login