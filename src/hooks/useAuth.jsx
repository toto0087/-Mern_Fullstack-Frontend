import { useContext } from "react"; //de aqui podemos extraer datos de un contexto
import AuthContext from "../context/AuthProvider"; // aqui identificamos el context del que queremos extraer datos

const useAuth = () => {
    return useContext(AuthContext)
}

export default useAuth