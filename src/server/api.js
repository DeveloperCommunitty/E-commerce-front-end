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

export async function getSearchProducts(name, page) {
  const response = await axiosClient.get(`/produtos/search/produto?name=${name}&page=${page}`);
  return response.data;
}

export async function getFiltersPrice(maxPrice, minPrice, page) {
  const response = await axiosClient.get(
    `/produtos/filter/price?minPrice=${minPrice}&maxPrice=${maxPrice}&page=${page}`
  );

  return response.data;
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
  const token = localStorage.getItem('@Auth:token');
  const response = await axiosClient.get(`/usuarios/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return response;
}

export async function PatchUser(data, id) {
  const response = await axiosClient.patch(`/usuarios/${id}`, data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    }
  );
  return response.data;
}

export async function PostEnd(data) {
  const token = localStorage.getItem('@Auth:token');

  const response = await axiosClient.post("/enderecos", data,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }
  );
  return response;

}

export async function GetEnd(id) {
  const token = localStorage.getItem('@Auth:token');
  const response = await axiosClient.get(`/enderecos/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return response.data;

}

export async function PatchEnd(data, id) {
  const response = await axiosClient.patch(`/enderecos/${id}`, data);
  return response.data;

}

export async function PostPf(data) {
  const response = await axiosClient.post(`/perfis`, data);
  return response
}

export async function GetPf(id) {
  const token = localStorage.getItem('@Auth:token');
  const response = await axiosClient.get(`/perfis/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return response.data;

}

export async function PatchPf(data, id) {
  const response = await axiosClient.patch(`/perfis/${id}`, data,);
  return response.data;
}

export async function GetProducts() {
  const response = await axiosClient.get('/produtos')

  return response
}

//integrando pagamento com api
export async function PostCreateSession(data) {
  try {
    const response = await axiosClient.post('/create-session', data); // Rota conforme a API
    return response.data; // Retorna a resposta completa
  } catch (error) {
    console.error('Erro ao criar sessão de pagamento:', error);
    throw error; // Lança o erro para ser tratado no componente
  }
}