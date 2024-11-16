import React, { useEffect, useState } from 'react';
import { Grid, Container, Box, CircularProgress, Typography } from '@mui/material';
import PrimarySearchAppBar from '../../../components/common/navBar';
import Footer from '../../../components/common/footer';
import ProductCard from '../../../components/common/card_prod';
import PaginationRounded from '../../../components/common/pagination';
import FilterComponent from '../../../components/common/barra_lateral';
import ItemCountBar from '../../../components/common/barra_superior';
import { GetProdutos } from '../../../server/api';

function Produto() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [erro, setErros] = useState(null);
  const [length, setLength] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState([10, 20000]);
  const pageSize = 9;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePriceChange = (newPriceRange) => {
    setPriceRange(newPriceRange);
  };

  useEffect(() => {
    setLoading(true);
    const response = GetProdutos(currentPage, pageSize);
    response
      .then((data) => {
        const productsData = data.data.data;
        setLength(productsData.length);
        setProducts(productsData);
        setFilteredProducts(productsData.filter(product => 
          product.price >= priceRange[0] && product.price <= priceRange[1]
        ));
      })
      .catch((erro) => {
        setErros(erro);
      })
      .finally(() => {
        setLoading(false);
      });
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [currentPage, priceRange]);

  return (
    <div>
      <PrimarySearchAppBar />
      <Box sx={{ marginTop: { lg: '7%', sm: '15%', xs: '20%' }, }}>
        <ItemCountBar length={length} />
      </Box>
      <Container
        sx={{
          marginLeft: { lg: '3%', xl: '10.5%', md: '-6%', sm: '41%', xs: '28%' },
          marginTop: '2%',
          display: 'flex',
          width: { lg: '95%', md: '105%', xs: '72%', sm: '70%', xl: "90%" },
        }}
      >
        <Box
          sx={{
            flex: 1,
            marginLeft: { lg: '-13%', md: '4%', xl: '-29%', xs: '-50%' },
            marginRight: { lg: '7%', sm: '2%', md: '5%', xs: '-5%' },
          }}
        >
          <FilterComponent onPriceChange={handlePriceChange} />
        </Box>
        <Box sx={{ flex: 3 }}>
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
            <Grid container spacing={{ lg: 0, xl: 2, }}>
              {filteredProducts.map((product) => (
                <Grid item xs={12} sm={7} md={5} lg={3} xl={1} key={product.id} sx={{ padding: '25px', marginX: { xl: "130px", lg: "35px", md: "24px", sm: "0px" } }}>
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
            <PaginationRounded onPageChange={handlePageChange} />
          </Box>
        </Box>
      </Container>
      <Footer />
    </div>
  );
}

export default Produto;
