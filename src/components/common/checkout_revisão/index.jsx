import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Box, Button, IconButton, Paper, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PostCart, PostCreateSession } from '../../../../src/server/api'; // Adicionando PostCart
import { decrementQuantity, incrementQuantity } from '../../../redux/cart/slice';
import { GetProduct } from '../../../server/api';

export default function OrderReview({ arrayProduct, productsStore }) {
  const [totalPrice, setTotalPrice] = useState(0);
  const [dataProducts, setDataProducts] = useState([]);
  const [noProducts, setNoProducts] = useState(false);
  const dispatch = useDispatch();



  React.useEffect(() => {
    const fetchData = async () => {
      let productsResponse = [];
      if (arrayProduct.length > 0) {
        try {
          for (let item of arrayProduct) {
            const response = await GetProduct(item.productId);
            productsResponse.push(response.data);
          }
          setDataProducts(productsResponse);
          setNoProducts(false);
        } catch (erro) {
          console.error(erro);
        }
      } else if (arrayProduct.length === 0) {
        setNoProducts(true);
        return;
      }
    };
    fetchData();
  }, [arrayProduct]);

  const calculateTotalPrice = () => {
    let total = 0;
    dataProducts.forEach((product) => {
      const productInStore = productsStore.find(item => item.productId === product.id);
      if (productInStore) {
        total += product.price * productInStore.quantity;
      }
    });
    setTotalPrice(total);
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [productsStore, dataProducts]);

  const handleIncrement = (productId) => {
    dispatch(incrementQuantity({ productId }));
  };

  const handleDecrement = (productId) => {
    dispatch(decrementQuantity({ productId }));
  };

  const cart = useSelector((state) => state.cart);

  const handleCheckout = async () => {
    try {
      // Verifica se o carrinho existe, caso contrário, cria um novo carrinho
      if (!cart || !cart.userId || !cart.products || cart.products.length === 0) {
        alert('Carrinho vazio ou informações incompletas.');
        return;
      }

      let cartId = cart.id;

      // Se o carrinho não tiver id, cria o carrinho
      if (!cartId) {
        // Criação do carrinho
        const cartData = {
          userId: cart.userId,
          products: cart.products,
        };

        // Chama a função para criar o carrinho
        const cartResponse = await PostCart(cartData);
        cartId = cartResponse.data.id; // O id do carrinho é retornado após a criação
      }

      const paymentSessionData = {
        userId: cart.userId,
        cartId: cartId, // Agora passamos o cartId, seja do carrinho existente ou criado
        products: cart.products,
      };



      const sessionResponse = await PostCreateSession(paymentSessionData);

      if (sessionResponse && sessionResponse.url) {
        window.location.href = sessionResponse.url; // Redireciona para a URL de pagamento
      } else {
        throw new Error('URL da sessão de pagamento não encontrada.');
      }
    } catch (error) {
      console.error('Erro no processo de checkout:', error.response?.data || error.message);
      alert('Não foi possível realizar o checkout. Tente novamente.');
    }
  };


  return (
    <Box
      sx={{
        width: { xs: '133%', md: '495%', lg: '159%', xl: '150%', sm: '300%' },
        marginLeft: { lg: '21%', xl: '42%', md: '-140%' },
        marginTop: { lg: '-5%', xl: '-5%', sm: '-5%', xs: '-5%', md: '-20%' },
        display: 'flex',
        position: 'relative',
        padding: { xs: 1, md: 2 },
        '& > :not(style)': {
          backgroundColor: '#475569',
          padding: { xs: 2, md: 4 },
          width: '500%',
        },
      }}
    >
      <Paper elevation={3}>
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{
            color: 'white',
            fontWeight: 'bold',
            marginBottom: { xs: '1rem', md: '1.5rem' },
            fontSize: { sm: '2rem', md: '1rem', lg: '2rem' },
          }}
        >
          Revisão do Pedido
        </Typography>

        {noProducts ? (
          <p
            style={{
              textAlign: 'center',
              fontSize: '1.5rem', // Diminui o tamanho da fonte
              color: 'white', // Define a cor como branca
              marginTop: '2rem', // Adiciona um espaçamento superior
            }}
          >
            Adicione produtos ao carrinho!
          </p>
        ) : (
          <Box sx={{ marginLeft: { sm: '17%', lg: '1%', md: '0%' }, marginTop: { sm: '10%' } }}>
            {dataProducts.map((product) => (
              <Box
                key={product.id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: { xs: 1, md: 5, sm: 5 },
                }}
              >
                <img
                  src={product.imagemUrl}
                  alt="Produto"
                  style={{
                    width: '35%',
                    height: '75%',
                    marginRight: 16,
                  }}
                />
                <Box sx={{ flexGrow: 1, marginBottom: '10%' }}>
                  <Typography
                    variant="body1"
                    sx={{
                      color: 'white',
                      fontSize: { sm: '2rem', md: '1rem', lg: '1.3rem' },
                    }}
                  >
                    Produto: {product.description}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: 'white',
                      fontSize: { sm: '2rem', md: '1rem', lg: '1.3rem' },
                    }}
                  >
                    Preço: R${parseFloat(product.price).toFixed(2).replace('.', ',')}
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      marginTop: 1,
                      fontSize: { sm: '3rem', md: '1rem', lg: '1.3rem' },
                      marginBottom: '3%',
                    }}
                  >
                    <IconButton
                      onClick={() => handleDecrement(product.id)}
                      sx={{
                        color: 'white',
                        fontSize: { sm: '2rem', md: '1rem', lg: '1.3rem' },
                      }}
                    >
                      <RemoveIcon fontSize="inherit" />
                    </IconButton>

                    <TextField
                      value={productsStore.find(item => item.productId === product.id)?.quantity}
                      inputProps={{
                        min: 1,
                        style: {
                          textAlign: 'center',
                          color: 'white',
                          fontSize: { sm: '2rem', md: '3rem', lg: '1.5rem' },
                        },
                      }}
                      sx={{
                        width: { sm: 60, md: 80 },
                        '& .MuiInputBase-input': { padding: '8px' },
                        '& .MuiOutlinedInput-root': { backgroundColor: '#334155' },
                      }}
                    />

                    <IconButton
                      onClick={() => handleIncrement(product.id)}
                      sx={{
                        color: 'white',
                        fontSize: { sm: '2rem', md: '1rem', lg: '1.5rem' },
                      }}
                    >
                      <AddIcon fontSize="inherit" />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            ))}



            <Typography
              variant="h6"
              align="center"
              sx={{
                color: 'white',
                marginTop: { xs: 1, md: 2, sm: 5 },
                marginLeft: { sm: '-20%', lg: '-5%', md: '4%' },
                fontSize: { sm: '2rem', md: '1.5rem', lg: '1.5rem' },
              }}
            >
              TOTAL
            </Typography>
            <Typography
              variant="h4"
              align="center"
              sx={{
                fontWeight: 'bold',
                backgroundColor: 'white',
                color: '#475569',
                textAlign: 'center',
                padding: '0.5rem 0',
                marginTop: '0.5rem',
                width: { sm: '50%', lg: '70%' },
                fontSize: { sm: '2rem', md: '1rem', lg: '1.5rem' },
                marginLeft: { sm: '14%', lg: '12%', md: '25%' },
              }}
            >
              R$ {totalPrice.toFixed(2).replace('.', ',')}
            </Typography>

            <Button
              variant="contained"
              disableElevation
              onClick={handleCheckout} // Chama a função ao clicar
              sx={{
                backgroundColor: 'black',
                color: '#FFFFFF',
                marginTop: '2rem',
                width: { sm: '50%', lg: '70%', xs: '100%' }, fontSize: { sm: '1.5rem', md: '1rem', lg: '1.5rem', xs: '1.5rem' },
                marginLeft: { sm: '14%', lg: '12%', md: '25%' },
              }}
            >
              COMPRAR
            </Button>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                marginTop: '2rem',
                justifyContent: 'center',
                marginLeft: { sm: '-24%', lg: '-2%', md: '-2%' },
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: 'white',
                  fontSize: { sm: '1.5rem', md: '0.9rem', lg: '1.1rem', xs: '1rem' },
                }}
              >
                CONFIRME SEUS DADOS DE ENTREGA
              </Typography>
            </Box>
          </Box>
        )}
      </Paper>
    </Box>
  );
}
