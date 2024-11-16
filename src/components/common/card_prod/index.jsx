import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box, Rating, Divider } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { addItemToCart } from '../../../redux/cart/slice';
import { useDispatch } from 'react-redux';
import { AuthContext } from '../../../context/authContext';

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const { user } = React.useContext(AuthContext);
  const rating = 4.5;

  const handleAddToCart = (id) => {
    dispatch(addItemToCart({ userId: user.id, productId: id, quantity: 1 }));
  };

  return (
    <Card
      sx={{
        width: { xs: 180, sm: 300, md: 300, xl:335,lg:280},
        height: { xs: 400, sm: 450, md: 450,xl:500,lg:430 },
        backgroundColor: '#000',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Box
        sx={{
          flexGrow: 0.3,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}
      >
        <CardMedia
          component="img"
          image={product.imagemUrl}
          alt="Smartphone"
          style={{
            aspectRatio: 4 / 3,
            objectFit: 'contain',
            maxHeight: '100%',
          }}
        />
      </Box>

      <Box sx={{ backgroundColor: '#4B5563', padding: '8px', textAlign: 'center' }}>
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontWeight: 'bold',
            color: '#000',
            fontSize: { xs: '1rem', sm: '1.2rem', lg: '1.3rem' }, // Fontes responsivas
          }}
        >
          {product.name}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px' }}>
          <Typography variant="body1" component="div" sx={{ fontWeight: 'bold', color: '#000' }}>
            {parseFloat(product.price).toFixed(2).replace('.', ',')}
          </Typography>
          <Rating
            name="rating"
            value={rating}
            precision={0.5}
            readOnly
            sx={{ color: '#FFD700', fontSize: { xs: '1rem', sm: '1.3rem', lg: '1.5rem' } }} // Responsivo
          />
        </Box>
      </Box>

      <Divider sx={{ backgroundColor: '#ccc' }} />

      <CardContent sx={{ flexGrow: 1.7 }}>
        <Typography variant="body2" color="inherit" component="p">
          {product.description}
        </Typography>
      </CardContent>

      <Box display="flex" justifyContent="center" mb={2}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#fff',
            color: '#000',
            fontWeight: 'bold',
            width: '50%',
            '&:hover': {
              backgroundColor: '#4B5563',
              color: '#fff',
            },
          }}
          startIcon={<ShoppingCartIcon />}
          onClick={() => handleAddToCart(product.id)}
        >
          COMPRA
        </Button>
      </Box>
    </Card>
  );
}

export default ProductCard;
