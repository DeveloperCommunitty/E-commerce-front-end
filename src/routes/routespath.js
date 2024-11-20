import { Home } from '../page/public/home';
import Checkout from '../page/public/checkout';
import { pagamentoSim } from '../page/pagamentoOk';
import Produto from '../page/public/produto';
import { pagamentoRec } from '../page/pagamentoREC';
import Login from '../page/public/login';
import Cadastro from '../page/public/cadastro';
import { Error } from '../page/public/ERROR';
import Usuario from '../page/public/Usuario';
import Adc_Produto from '../page/public/adc_Produto';
import { Unauthorized } from '../page/unauthorized';

export const AdminRoutesPath = {
  '/admin/produtos': Adc_Produto,
}

export const PrivateRoutesPath = {
  '/home': Home,
  '/carrinho': Checkout,
  '/produtos/search/produto': Produto,
  '/usuario': Usuario,
};

export const RoutesPath = {
  '/': Login,
  '/unauthorized': Unauthorized,
  '/cadastro': Cadastro,
  '/pagamento_ok': pagamentoSim,
  '/pagamento_rec': pagamentoRec,
  '/*': Error,
}
