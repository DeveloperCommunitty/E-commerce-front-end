import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});


export async function PostProduto(produto) {
  const response = await axiosClient.post('/produtos', produto)

  return response
}

export async function GetProducts(){
  const response = await axiosClient.get('/produtos')
  
  return response
}

export async function GetProduct(id) {
  const response = await axiosClient.get(`/produtos/${id}`)

  return response
}

export async function GetProdutosForYou() {
  const response = await axiosClient.get("/produtos?page=1&pageSize=4")
  return response
}

export async function GetCart(id) {
  const response = await axiosClient.get(`/carrinhos/${id}`)
  return response
}

export async function PostCart(cart) {
  const response = await axiosClient.post("/carrinhos", cart)
  return response
}

export async function PatchCart(id) {
  const response = await axiosClient.patch(`/carrinhos/${id}`)
  return response
}
