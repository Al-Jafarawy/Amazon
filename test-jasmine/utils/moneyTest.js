import { formatCurrency } from '../../scripts/utils/money.js';

describe('Formating Money suite', () => {
  it('Convert cents into dollars', () => {
    expect(formatCurrency(3465)).toEqual('34.65');
  });

  it('Works with 0 ', () => {
    expect(formatCurrency(0)).toEqual('0.00');
  });

  it('Round Case to up num ', () => {
    expect(formatCurrency(1231.6)).toEqual('12.32');
  });

  it('Round case to down num', () => {
    expect(formatCurrency(3232.4)).toEqual('32.32');
  });

  it('Test rounding if it 0 ', () => {
    expect(formatCurrency(2454.0)).toEqual('24.54');
  });
});
