import { Box, CircularProgress, Container, Grid, Pagination, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FilterComponent from '../../../components/common/barra_lateral';
import ItemCountBar from '../../../components/common/barra_superior';
import ProductCard from '../../../components/common/card_prod';
import Footer from '../../../components/common/footer';
import PrimarySearchAppBar from '../../../components/common/navBar';
import { getFiltersPrice, getSearchProducts } from '../../../server/api';

function Produto() {
  const location = useLocation();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [erro, setErros] = useState(null);
  const [length, setLength] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });

  console.log(page)



  const handlePriceChange = (newPriceRange) => {
    setPriceRange(newPriceRange);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const nameParam = searchParams.get('name');
    setName(nameParam);
  }, [location.search]);

  useEffect(() => {
    if (name) {
      getSearchProducts(name, page)
        .then((dados) => {
          console.log(dados)
          setFilteredProducts(dados.data);
          setTotalPages(dados.totalPages);
        })
        .catch((erro) => {
          console.error(erro);
        });
    }
  }, [name, page]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const minPrice = searchParams.get('minPrice') || '';
    const maxPrice = searchParams.get('maxPrice') || '';

    if (minPrice || maxPrice) {
      setPriceRange({ min: minPrice, max: maxPrice });

      getFiltersPrice(maxPrice, minPrice, page)
        .then((dados) => {
          setFilteredProducts(dados.data);
          setTotalPages(dados.totalPages);
        })
        .catch((erro) => {
          console.error(erro);
        });
    }
  }, [location.search, page]);

  const applyFilters = () => {
    const queryParams = new URLSearchParams();
    if (priceRange.min) queryParams.set('minPrice', priceRange.min);
    if (priceRange.max) queryParams.set('maxPrice', priceRange.max);

    navigate(`?${queryParams.toString()}`);
  };


  return (
    <div>
      <PrimarySearchAppBar />
      <Box sx={{ marginTop: { lg: '7%', sm: '15%', xs: '20%' }, }}>
        <ItemCountBar length={length} />
      </Box>
      <Container
        sx={{
          marginLeft: { lg: '3%', xl: '10.5%', md: '-6%', sm: '27%', xs: '7.5%' },
          marginTop: '2%',
          display: 'flex',
          width: { lg: '95%', md: '105%', xs: '30%', sm: '50%', xl: "90%" },
        }}
      >
        <Box
          sx={{
            flex: 1,
            marginLeft: { lg: '-13%', md: '4%', xl: '-29%', xs: '-50%' },
            marginRight: { lg: '7%', sm: '2%', md: '5%', xs: '-60%' },
          }}
        >
          <FilterComponent onPriceChange={handlePriceChange} applyFilters={applyFilters} />


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
            <Pagination
              count={totalPages}
              onChange={(e, value) => setPage(value)}
              variant="outlined"
              color="primary"
              showFirstButton
              showLastButton
            />
          </Box>
        </Box>
      </Container>
      <Footer />
    </div>
  );
}

export default Produto;
