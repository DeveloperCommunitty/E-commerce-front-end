import { GetEnd } from "../../../../server/api"

export async function Perfil (){
    
    const response = GetEnd(user.id)
    response.then((data) =>  
        {
            setFormData_end(data)
        }
    )
}