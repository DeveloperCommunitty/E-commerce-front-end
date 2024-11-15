import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationRounded({ onPageChange }) {
  const [page, setPage] = React.useState(1);

  const handlePageChange = (event, value) => {
    setPage(value);
    onPageChange(value);
  };

  return (

    <Stack spacing={2} sx={{ marginLeft: { lg: '-88%', xl: '-88%', xs: '-280%', sm: '-120%' } }}>
      <Pagination count={10} variant="outlined" shape="rounded" page={page} onChange={handlePageChange} />
    </Stack>
  );
}