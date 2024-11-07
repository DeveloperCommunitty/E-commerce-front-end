import React, { useState } from "react";
import { Accordion, AccordionSummary, AccordionDetails, Slider, Typography, Box, Rating, } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function FilterComponent() {
  const [price, setPrice] = useState([100, 20000]);
  const [expanded, setExpanded] = useState(false);
  const [rating, setRating] = useState(0);
  const [mainExpanded, setMainExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handlePriceChange = (event, newValue) => {
    setPrice(newValue);
  };

  const handleMainChange = (event, isExpanded) => {
    setMainExpanded(isExpanded);
  };

  return (
    <Box sx={{ width: { md: '100%', lg: '110%', xs: '90%', sm: '103%' }, }}>

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
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
            sx={{ width: '109.5%', marginLeft: '-4.7%' }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography sx={{ fontWeight: expanded === "panel1" ? "bold" : "normal" }}>
                Apple
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Detalhes da Apple</Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
            sx={{ width: '109.5%', marginLeft: '-4.7%' }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography sx={{ fontWeight: expanded === "panel2" ? "bold" : "normal" }}>
                Samsung
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Detalhes da Samsung</Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === "panel3"}
            onChange={handleChange("panel3")}
            sx={{ width: '109.5%', marginLeft: '-4.7%' }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3a-content"
              id="panel3a-header"
            >
              <Typography sx={{ fontWeight: expanded === "panel3" ? "bold" : "normal" }}>
                Xiaomi
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Detalhes da Xiaomi</Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === "panel4"}
            onChange={handleChange("panel4")}
            sx={{ width: '109.5%', marginLeft: '-4.7%' }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel4a-content"
              id="panel4a-header"
            >
              <Typography sx={{ fontWeight: expanded === "panel4" ? "bold" : "normal" }}>
                Motorola
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Detalhes da Motorola</Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === "panel5"}
            onChange={handleChange("panel5")}
            sx={{ width: '109.5%', marginLeft: '-4.7%' }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel5a-content"
              id="panel5a-header"
            >
              <Typography sx={{ fontWeight: expanded === "panel5" ? "bold" : "normal" }}>
                Realme
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Detalhes da Realme</Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === "panel6"}
            onChange={handleChange("panel6")}
            sx={{ width: '109.5%', marginLeft: '-4.7%' }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel6a-content"
              id="panel6a-header"
            >
              <Typography sx={{ fontWeight: expanded === "panel6" ? "bold" : "normal" }}>
                Asus
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Detalhes da Asus</Typography>
            </AccordionDetails>
          </Accordion>
        </AccordionDetails>
      </Accordion>

      {/* Slider de Preço */}
      <Box sx={{ my: 3, backgroundColor: '#D9D9D94A', width: '100%', }}>
        <Slider
          value={price}
          onChange={handlePriceChange}
          min={100}
          max={20000}
          valueLabelDisplay="auto"
          sx={{ color: 'black', width: '90%', marginLeft: '5%' }}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography sx={{ color: 'black', fontWeight: 'bold', marginLeft: '5%' }}>R${price[0].toLocaleString()},00</Typography>
          <Typography sx={{ color: 'black', fontWeight: 'bold', marginRight: '5%' }}>R${price[1].toLocaleString()},00</Typography>
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
        <Rating
          name="rating"
          value={rating}
          onChange={(event, newValue) => setRating(newValue)}
          sx={{ fontSize: { lg: '3rem', xs: '2rem' } }}
        />
      </Box>
    </Box>
  );
}
