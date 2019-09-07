import numeral from 'numeral';

import 'numeral/locales';

export const formatPrice = value => {
  numeral.locale('pt-br');
  return numeral(value).format('$ 0,0.00');
};
