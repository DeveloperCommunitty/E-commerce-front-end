import React, { useEffect, useState } from 'react';
import { Grid, Container, Box, CircularProgress, Typography } from '@mui/material';
import PrimarySearchAppBar from '../../../components/common/navBar';
import Footer from '../../../components/common/footer';
import ProductCard from '../../../components/common/card_prod';
import PaginationRounded from '../../../components/common/pagination';
import FilterComponent from '../../../components/common/barra_lateral';
import ItemCountBar from '../../../components/common/barra_superior';
import { GetProducts } from '../../../server/api';

function Produto() {
  const [products, setProducts] = useState([]); 
  const [erro, setErros] = useState(null); 
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true); // Começa o carregamento
    const response = GetProducts();
    response
      .then((data) => {
        setProducts(data.data.data); 
      })
      .catch((erro) => {
        setErros(erro); // Armazena erro, se houver
      })
      .finally(() => {
        setLoading(false); // Finaliza o carregamento
      });
  }, []);

  return (
    <div>
      <PrimarySearchAppBar />

      <Box sx={{ marginTop: { lg: '7%', sm: '10%', xs: '20%' } }}>
        <ItemCountBar />
      </Box>

      <Container
        sx={{
          marginLeft: { lg: '10.3%', xl: '20.5%', md: '-4%', sm: '30%', xs: '28%' },
          marginTop: '2%',
          display: 'flex',
          width: { lg: '90%', md: '103%', xs: '72%', sm: '70%' },
        }}
      >
        <Box
          sx={{
            flex: 1,
            marginLeft: { lg: '-13%', md: '4%', xl: '-29%', xs: '-50%' },
            marginRight: { lg: '7%', sm: '2%', md: '5%', xs: '-5%' },
          }}
        >
          <FilterComponent />
        </Box>

        <Box sx={{ flex: 3 }}>
          {/* Exibição de loading ou erro */}
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
              <CircularProgress />
            </Box>
          ) : erro ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
              <Typography variant="h6" color="error">
                {erro}
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={2}>
              {products.map((product) => (
                <Grid xs={18} sm={6} md={4} lg={4} key={product.id}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          )}

          <Box
            sx={{
              position: 'relative',
              marginTop: { lg: '5%', xs: '15%', sm: '8%' },
              marginBottom: { lg: '5%', xs: '15%', sm: '8%' },
              display: 'flex',
              justifyContent: 'center',
              marginLeft: '50%',
            }}
          >
            <PaginationRounded />
          </Box>
        </Box>
      </Container>

      <Footer />
    </div>
  );
}

export default Produto;
