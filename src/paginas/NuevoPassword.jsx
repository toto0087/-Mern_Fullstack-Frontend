import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/axios"

const NuevoPassword = () => {

    const [password,setPassword] = useState("")
    const [alerta,setAlerta] = useState({})
    const [tokenValido,setTokenValido] = useState(false)
    const [passwordModificado,setPasswordModificado] = useState(false)

    const params = useParams()

    const {token} = params 

    useEffect(() => {

        const comprobarToken = async () => {
            try {
                await clienteAxios(`/veterinarios/olvide-password/${token}`)
                setAlerta({msg: "Coloca tu nuevo password"})
                setTokenValido(true)
            } catch (error) {
                setAlerta({msg: "Hubo un error con el enlace", error:true})
                setTokenValido(false)
            }    //REcomendable usar el useEffect para funciones que interactuen con APIS
        }
        comprobarToken()
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault()

        if(password.length < 6) {
            setAlerta({
                msg: "El password debe ser minimo de 6 caracteres",
                error: true 
            })
            return;
        }

        try {
            const url = `/veterinarios/olvide-password/${token}`
            const {data} = await clienteAxios.post(url,{password})

            console.log(data)

            setAlerta({
                msg: data.msg
            })

            setPasswordModificado(true)

        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                errore: true
            })
        }


    }


    const {msg} = alerta;

  return (
    <>
        <div> 
            <h1 className="text-indigo-600 font-black text-6xl">Reestablece tu password y no pierdas acceso a tus
            <span className="text-zinc-900"> Pacientes</span>
            </h1> 
        </div>

        <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white"> 

        {
            msg 
            &&
            <Alerta 
                alerta={alerta}
            />
        }

            {tokenValido && ( 
                <>
                    <form action="" onSubmit={handleSubmit}>
                        <div className="my-5">
                            <label htmlFor="" className="uppercase text-gray-600 font-bold text-xl block" >Password</label>
                            <input 
                                type="password" 
                                placeholder="Tu Password" 
                                className="border w-full p-3 bg-gray-50 rounded-xl" 
                                autoComplete="on"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>


                        <input type="submit" 
                                value="Subir nueva Password" 
                                className=" bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto " />

                    </form> 

                </>
            )}

                {passwordModificado 
                    && 
                    <Link 
                    className=" block text-center my-5 text-gray-500 "
                    to="/">Inicia Secion</Link>
                    }

        </div>

    </>
  )
}

export default NuevoPassword