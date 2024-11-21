import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { GetProdutosForYou } from '../../../server/api';
import CircularIndeterminate from '../circularIndeterminate';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../../redux/cart/slice.js';
import { AuthContext } from '../../../context/authContext.jsx'

export default function ProductForYou() {
  const [products, setProducts] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(false)
  const [messageError, setMessageError] = React.useState('')
  const dispatch = useDispatch();
  const { user } = React.useContext(AuthContext);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));



  React.useEffect(() => {
    setLoading(true)
    const response = GetProdutosForYou()
    response.then(
      (dados) => {
        setProducts(dados.data.data)
      }
    ).catch((erro) => {
      setMessageError(erro)
      setError(true)
    }).finally(() => {
      setLoading(false)
    })
  }, [])

  if (loading) {
    return (
      <CircularIndeterminate />
    );
  }

  if (error) {
    return (
      <p>{messageError}</p>
    );
  }

  const handleAddToCart = (product) => {
    dispatch(addItemToCart({ userId: user.id, productId: product.id, quantity: 1 }));
  };

  return (
    <Box sx={{ padding: '40px' }}>
      <h2 style={{ color: '#4B5563', paddingBottom: '20px' }}>Produtos Que Combinam Com Você</h2>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px',
        }}>
        {products.map((product) => (
          <Card
            key={product.id}
            sx={{
              width: isMobile ? '100%' : 'calc(25% - 20px)',
              minWidth: '250px',
              border: '1px solid #e0e0e0',
              height: '400px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>

            <Box
              sx={{
                width: '100%',
                height: '200px',
              }}
            >
              <Box
                component={'img'}
                src={product.imagemUrl}
                alt={product.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain'
                }}
              />
            </Box>



            <CardContent>
              <Typography
                variant="body2"
                sx={{ fontWeight: 'bold', fontSize: '12pt' }}>
                {product.name}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
                <Typography sx={{ color: 'black', fontWeight: 'bold', fontSize: '1.5rem' }}>
                  R${parseFloat(product.price).toFixed(2).replace('.', ',')}
                </Typography>
                <Typography
                  sx={{
                    color: 'gray',
                    textDecoration: 'line-through',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                  }}>
                  {product.oldPrice}
                </Typography>
              </Box>
            </CardContent>

            <CardActions
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '-16px',
                marginBottom: '10px',
              }}>
              <Button
                size="large"
                sx={{
                  backgroundColor: 'black',
                  color: 'white',
                  width: '70%',
                  padding: '16px',
                  borderRadius: '0px',
                  '&:hover': {
                    backgroundColor: 'white',
                    color: 'black',
                  },
                }}>
                <span style={{ fontSize: '12px' }} onClick={() => handleAddToCart(product)}>Adicionar ao Carrinho</span>
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
