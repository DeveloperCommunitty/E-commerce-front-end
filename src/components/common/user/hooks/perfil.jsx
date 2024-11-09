import { GetPf } from "../../../../server/api"



export async function Perfil_contro (id){
    
    const response_perfil = GetPf(id)
    response.then((data) =>  
        {
            setFormData_perfil(data)
        }
    )
}