import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});



export async function PostProduto(produto) {
  const response = await axiosClient.post('/produtos', produto)

  return response
}

export async function GetProduct(id) {
  const response = await axiosClient.get(`/produtos/${id}`)

  return response
}

export async function GetProdutos(page, pageSize) {
  const response = await axiosClient.get(`/produtos?page=${page}&pageSize=${pageSize}`)
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

export async function PostUser(data) {
  try {
    const response = await axiosClient.post('/usuarios', data,);
    return response.data
  }
  catch (error) {
    console.error('Erro ao Criar dados:', error);
    throw error;
  }
}

export async function GetUser(id) {
  const response = await axiosClient.get(`/usuarios/${id}`);


  return response.data;
}

export async function PatchUser(data, id) {

  const response = await axiosClient.patch(`/usuarios/${id}`, data,);
  return response.data;
}

export async function PostEnd(data, id) {
  const response = await axiosClient.post(`/enderecos/${id}`, data,);
  return response.data

}

export async function GetEnd(id) {

  const response = await axiosClient.get(`/enderecos/${id}`,);
  return response.data;

}

export async function PatchEnd(data, id) {
  const response = await axiosClient.patch(`/enderecos/${id}`, data);
  return response.data;

}

export async function PostPf(data, id) {
  const response = await axiosClient.post(`/perfis/${id}`, data);
  return response.data

}

export async function GetPf(id) {

  const response = await axiosClient.get(`/perfis/${id}`);

  return response;

}

export async function PatchPf(data, id) {
  const response = await axiosClient.patch(`/perfis/${id}`, data,);
  return response.data;
}
