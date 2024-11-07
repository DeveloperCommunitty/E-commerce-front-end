import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box, Rating, Divider } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function ProductCard({product}) {

  //const rating = 4.5;

  return (
    <Card sx={{
      maxWidth: 345, 
      backgroundColor: '#000', 
      color: '#fff', 
    }}>
      <CardMedia
        component="img"
        height="180"
        image={product.imagemUrl}
        alt="Smartphone"
      />

      <Box sx={{ backgroundColor: '#4B5563', padding: '2px', textAlign: 'center' }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#000', fontSize:{lg:'1.3rem',xl:'1.5rem',md:'1.5rem',xs:'1rem'}}}>
          {product.name}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '2px' }}>
          <Typography variant="body1" component="div" sx={{ fontWeight: 'bold', color: '#000' }}>
            {parseFloat(product.price).toFixed(2).replace('.', ',')}
          </Typography>
          {/* <Rating 
            name="rating" 
            value={rating} 
            precision={0.5} 
            readOnly
            sx={{ color: '#FFD700', fontSize:{lg:'1.5rem',xl:'1.5rem',md:'1.5rem',xs:'1rem'}}} 
          /> */}
        </Box>
      </Box>

      <Divider sx={{ backgroundColor: '#ccc' }} />

      <CardContent>
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
              color: '#fff'
            }
          }}
          startIcon={<ShoppingCartIcon />}
        >
          COMPRA
        </Button>
      </Box>
    </Card>
  );
}

export default ProductCard;
