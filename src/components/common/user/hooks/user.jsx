import { GetUser } from "../../../../server/api"


export async function User_contro(){
    
    const response = GetUser(user.id)
    response.then((data) =>  
        {
            setFormData_user(data)
        }
    )
}