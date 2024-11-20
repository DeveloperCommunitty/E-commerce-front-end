import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Slider, Typography } from "@mui/material";
import React, { useState } from "react";

export default function FilterComponent({ onPriceChange, applyFilters }) {
  const [price, setPrice] = useState([10, 20000]);
  const [expanded, setExpanded] = useState(false);
  const [mainExpanded, setMainExpanded] = useState(true);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };


  const handlePriceChange = (event, newValue) => {
    setPrice(newValue);
    onPriceChange({ min: newValue[0], max: newValue[1] });
  };

  const handleMainChange = (event, isExpanded) => {
    setMainExpanded(isExpanded);
  };

  return (
    <Box sx={{
      width: { md: '130%', lg: '110%', xs: '86%', sm: '133%' },
      marginLeft: { lg: "32%", xl: "45%", md: "1%", sm: "-28%" }
    }}>
      {/* Accordion principal: Categorias Personalizadas */}
      <Accordion expanded={mainExpanded} onChange={handleMainChange} sx={{ width: '100%' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
          aria-controls="main-content"
          id="main-header"
          sx={{ backgroundColor: 'black' }}
        >
          <Typography sx={{ fontWeight: "bold", color: '#D9D9D9' }}>Categorias Personalizadas</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {/* Categorias Internas */}
          {["Apple", "Samsung", "Xiaomi", "Motorola", "Realme", "Asus"].map((category, index) => (
            <Accordion
              key={category}
              expanded={expanded === `panel${index + 1}`}
              onChange={handleChange(`panel${index + 1}`)}
              sx={{ width: '109.5%', marginLeft: '-4.7%' }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`panel${index + 1}a-content`} id={`panel${index + 1}a-header`}>
                <Typography sx={{ fontWeight: expanded === `panel${index + 1}` ? "bold" : "normal" }}>
                  {category}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>Detalhes da {category}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </AccordionDetails>
      </Accordion>

      {/* Slider de Preço */}
      <Box sx={{ my: 3, backgroundColor: '#D9D9D94A', width: '100%' }}>
        <Slider
          value={price}
          onChange={handlePriceChange}
          min={10}
          max={20000}
          valueLabelDisplay="auto"
          sx={{ color: 'black', width: '90%', marginLeft: '5%' }}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography sx={{ color: 'black', fontWeight: 'bold', marginLeft: '5%' }}>
            R${price[0].toLocaleString()},00
          </Typography>
          <Typography sx={{ color: 'black', fontWeight: 'bold', marginRight: '5%' }}>
            R${price[1].toLocaleString()},00
          </Typography>
        </Box>
      </Box>

      {/* Avaliação com Estrelas */}
      <Box
        sx={{
          border: '1px solid #ccc',
          width: '101%',
          padding: '16px',
          marginLeft: '0%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button
          variant="contained"
          sx={{ backgroundColor: '#000000' }}
          fullWidth
          onClick={applyFilters}>
          Aplicar filtros
        </Button>
      </Box>
    </Box>
  );
}
