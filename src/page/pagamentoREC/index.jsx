import CheckCircleIcon from '@mui/icons-material/Cancel'; // Usando ícone diferente para indicar erro
import { Box, Button, LinearProgress, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redirecionar para a home após o tempo

export const pagamentoRec = () => {
  const [secondsLeft, setSecondsLeft] = useState(5);  // Timer de 5 segundos
  const [progress, setProgress] = useState(0); // Barra de progresso
  const [isRedirecting, setIsRedirecting] = useState(false);  // Flag para controlar o botão de redirecionamento
  const navigate = useNavigate(); // Hook para redirecionamento

  // Função para redirecionar para a home
  const navigateToHome = () => {
    navigate('/home');
  };

  useEffect(() => {
    // Função para atualizar o timer
    const timerInterval = setInterval(() => {
      setSecondsLeft((prev) => {
        console.log("Seconds left: ", prev); // Para debug
        if (prev === 1) {
          clearInterval(timerInterval);
          setIsRedirecting(true); // Quando o timer chega a 0, habilita o botão de redirecionamento
          navigateToHome(); // Redireciona para a home
        }
        return prev - 1;
      });
    }, 1000);

    // Barra de progresso
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev === 100) {
          clearInterval(progressInterval);
        }
        return Math.min(prev + 20, 100); // Aumenta 20% a cada segundo
      });
    }, 1000);

    // Limpeza do intervalo quando o componente for desmontado
    return () => {
      clearInterval(timerInterval);
      clearInterval(progressInterval);
    };
  }, []); // A dependência vazia garante que o useEffect rode apenas uma vez

  return (
    <main>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '5rem',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        className="icone-checklist"
      >
        <CheckCircleIcon
          sx={{
            color: 'red',  // Cor vermelha para indicar erro
            fontSize: '350px',
          }}
        />
        <div className="text-main">
          <div style={{ fontFamily: 'Arial', fontWeight: 500, textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom>
              PAGAMENTO RECUSADO
            </Typography>
            <Typography variant="body1" gutterBottom>
              Voltando para a Home em {secondsLeft}...
            </Typography>
            <Box sx={{ mt: 7, width: 500, }}>
              <LinearProgress sx={{ background: '#8f96a3', '& .MuiLinearProgress-bar': { backgroundColor: '#000000', }, }} variant="determinate" value={progress} />
            </Box>
          </div>
        </div>
      </div>



      {/* Botão de voltar à home, visível caso o timer precise de interação */}
      {isRedirecting && (
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={navigateToHome}
          >
            Voltar para a Home
          </Button>
        </div>
      )}
    </main>
  );
};
