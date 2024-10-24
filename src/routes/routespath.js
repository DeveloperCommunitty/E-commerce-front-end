import { Home } from '../page/public/home';
import Checkout from '../page/public/checkout';
import { pagamentoSim } from '../page/pagamentoOk';
import Produto from '../page/public/produto';
import { pagamentoRec } from '../page/pagamentoREC';
import Login from '../page/public/login';
import Cadastro from '../page/public/cadastro';
import { Error } from '../page/public/ERROR';
import Usuario from '../page/public/Usuario';

export const PrivateRoutesPath = {
  '/home': Home,
  '/pagamento_ok': pagamentoSim,
  '/checkout': Checkout,
  '/produto': Produto,


  '/usuario': Usuario,
};

export const RoutesPath = {

  // '/': Home,
  // '/pagamento_ok': pagamentoSim,
  // '/checkout': Checkout,
  // '/produto': Produto,
  // '/pagamento_rec': pagamentoRec,
  '/': Login,
  '/cadastro': Cadastro,
  '/*': Error,
  // '/usuario':Usuario,
  '/pagamento_rec': pagamentoRec,
}
