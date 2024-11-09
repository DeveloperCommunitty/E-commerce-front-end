import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Grid,
  InputAdornment,
  IconButton,
  Typography,
  Box,
  MenuItem
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { PatchUser, PostPf, PostEnd, GetEnd, GetUser, GetPf } from '../../../server/api';
import CircularIndeterminate from '../circularIndeterminate';
import { AuthContext } from '../../../context/authContext.jsx'
import { useDispatch } from 'react-redux';
import { useContext } from 'react';
// import { Perfil_contro } from './hooks/perfil';

export default function UserProfileForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { user } = useContext(AuthContext);

  const [formData_user, setFormData_user] = useState([]);
  const [formData_end, setFormData_end] = useState([]);
  const [formData_perfil, setFormData_perfil] = useState([]);

  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  React.useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {

        const response_perfil = GetPf(user.id)
        setFormData_perfil((await response_perfil).data)

        


      } catch (error) {
        setErrorMessage(error.message);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user.id]);
  
  console.log(user.id)

  if (loading) {
    return <CircularIndeterminate />;
  }

  if (error) {
    return <p>{errorMessage}</p>;
  }

  const handleCancel = () => {
    navigate('/home');
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData_user({ ...formData_user, [name]: value });
  };

  const handleInputChangePerfil = (event) => {
    const { name, value } = event.target;
    setFormData_perfil({ ...formData_perfil, [name]: value });
  };

  const handleInputChangeEndereco = (event) => {
    const { name, value } = event.target;
    setFormData_end({ ...formData_end, [name]: value });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await PatchUser(formData_user);
      await PostPf(formData_perfil);
      await PostEnd(formData_end);

      setSuccessMessage('Dados atualizados com sucesso!');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Erro ao atualizar dados.');
      setSuccessMessage('');
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '20px', borderRadius: '10px' }}>
      <form onSubmit={handleSubmit}>
        <Box sx={{ padding: '20px', backgroundColor: '#0f1624', borderRadius: '10px', marginBottom: '20px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <img src="https://img.freepik.com/fotos-premium/um-modelo-com-um-modelo-de-rosto-de-mulher-e-uma-sombra-nas-costas_1221953-13101.jpg" alt="User" style={{ width: '70%', borderRadius: '10px', marginBottom: '10px' }} />
              <Button variant="contained" component="label" sx={{ marginTop: '10px', backgroundColor: 'white', color: 'black' }}>
                Escolher Foto
                <input type="file" hidden onChange={(e) => setFormData_user({ ...formData_user, avatar: e.target.files[0] })} />
              </Button>
            </Grid>

            <Grid item xs={12} sm={9} container>
              <Grid item xs={12} sm={8}>
                <Typography variant="h6" sx={{ marginBottom: '10px' }}>Informações de Login</Typography>
                <TextField fullWidth label="Nome" name="nome" value={formData_user.name} onChange={handleInputChange} margin="dense" InputProps={{ style: { backgroundColor: 'white', color: 'black' } }} InputLabelProps={{ style: { color: '#000000' } }} />
                <TextField fullWidth label="Email" name="email" value={formData_user.email} onChange={handleInputChange} margin="dense" InputProps={{ style: { backgroundColor: 'white', color: 'black' } }} InputLabelProps={{ style: { color: '#000000' } }} />

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Senha" name="password" type={showPassword ? 'text' : 'password'} margin="dense" InputProps={{
                      style: { backgroundColor: 'white', color: 'black' },
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleClickShowPassword}>
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }} InputLabelProps={{ style: { color: '#000000' } }} onChange={handleInputChange} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Confirme a senha" name="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} margin="dense" InputProps={{
                      style: { backgroundColor: 'white', color: 'black' },
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleClickShowConfirmPassword}>
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }} InputLabelProps={{ style: { color: '#000000' } }} onChange={handleInputChange} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ padding: '20px', backgroundColor: '#4B5563', borderRadius: '10px', marginBottom: '20px', color: 'white' }}>
          <Typography variant="h6" sx={{ marginBottom: '10px' }}>Suas Informações Pessoais</Typography>

          {formData_perfil.map((perfis, index) => (
            <Grid container spacing={2} key={index}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Primeiro Nome"
                  name="firstName"
                  value={perfis.firstName}
                  onChange={(e) => handleInputChangePerfil(e, index)}
                  margin="dense"
                  InputProps={{ style: { backgroundColor: 'white', color: 'black' } }}
                  InputLabelProps={{ style: { color: '#000000' } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Sobrenome"
                  name="lastName"
                  value={perfis.lastName}
                  onChange={(e) => handleInputChangePerfil(e, index)}
                  margin="dense"
                  InputProps={{ style: { backgroundColor: 'white', color: 'black' } }}
                  InputLabelProps={{ style: { color: '#000000' } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="CPF"
                  name="cpf"
                  value={perfis.cpf}
                  onChange={(e) => handleInputChangePerfil(e, index)}
                  margin="dense"
                  InputProps={{ style: { backgroundColor: 'white', color: 'black' } }}
                  InputLabelProps={{ style: { color: '#000000' } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Data de Nascimento"
                  name="birthDate"
                  type="date"
                  value={perfis.birthDate}
                  onChange={(e) => handleInputChangePerfil(e, index)}
                  margin="dense"
                  InputProps={{ style: { backgroundColor: 'white', color: 'black' } }}
                  InputLabelProps={{ style: { color: '#000000' } }}
                />
              </Grid>
            </Grid>
          ))}
        </Box>
        <Box sx={{ padding: '20px', backgroundColor: '#4B5563', borderRadius: '10px', marginBottom: '20px', color: 'white' }}>
          <Typography variant="h6" sx={{ marginBottom: '10px' }}>Endereço</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Rua" name="street" value={formData_end.street} onChange={handleInputChangeEndereco} margin="dense" InputProps={{ style: { backgroundColor: 'white', color: 'black' } }} InputLabelProps={{ style: { color: '#000000' } }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Número" name="number" value={formData_end.number} onChange={handleInputChangeEndereco} margin="dense" InputProps={{ style: { backgroundColor: 'white', color: 'black' } }} InputLabelProps={{ style: { color: '#000000' } }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Cidade" name="city" value={formData_end.city} onChange={handleInputChangeEndereco} margin="dense" InputProps={{ style: { backgroundColor: 'white', color: 'black' } }} InputLabelProps={{ style: { color: '#000000' } }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Estado" name="state" value={formData_end.state} onChange={handleInputChangeEndereco} margin="dense" InputProps={{ style: { backgroundColor: 'white', color: 'black' } }} InputLabelProps={{ style: { color: '#000000' } }} />
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="contained" color="primary" onClick={handleCancel}>Cancelar</Button>
          <Button variant="contained" color="secondary" type="submit">Salvar</Button>
        </Box>

        {successMessage && <Typography sx={{ color: 'green', marginTop: '20px' }}>{successMessage}</Typography>}
        {errorMessage && <Typography sx={{ color: 'red', marginTop: '20px' }}>{errorMessage}</Typography>}
      </form>
    </Box>
  );
}

