import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // dla dodatkowych asercji jak 'toBeInTheDocument'
import ResultBox from './ResultBox';

describe('Component ResultBox', () => {
  // Ćwiczenie 1: Test sprawdzający, czy komponent renderuje się bez błędów
  it('should render without crashing', () => {
    render(<ResultBox from="PLN" to="USD" amount={100} />);
    const resultBox = screen.getByTestId('result-box');
    expect(resultBox).toBeInTheDocument();
  });

  // Ćwiczenie 2: Test sprawdzający poprawność konwersji z PLN na USD
  it('should render proper info about conversion when PLN -> USD', () => {
    render(<ResultBox from="PLN" to="USD" amount={100} />);
    const resultBox = screen.getByTestId('result-box');
    expect(resultBox).toHaveTextContent('PLN 100.00 = $28.57'); // wartość może się różnić w zależności od aktualnego kursu walutowego
  });

  // Ćwiczenie 3: Testy z różnymi wartościami 'amount'
  const testCases = [
    { amount: 50, expected: 'PLN 50.00 = $14.29' },
    { amount: 150, expected: 'PLN 150.00 = $42.86' },
    // ... więcej przypadków testowych
  ];

  testCases.forEach(({ amount, expected }) => {
    it(`should render proper conversion for amount: ${amount} PLN to USD`, () => {
      render(<ResultBox from="PLN" to="USD" amount={amount} />);
      const resultBox = screen.getByTestId('result-box');
      expect(resultBox).toHaveTextContent(expected); // wartości mogą się różnić w zależności od aktualnego kursu walutowego
    });
  });

  const testCasesUSDToPLN = [
    { amount: 50, expected: '$50.00 = PLN 175.00' }, // przykładowe wartości, rzeczywista wartość może być inna
    { amount: 150, expected: '$150.00 = PLN 525.00' }, // przykładowe wartości, rzeczywista wartość może być inna
    // ... więcej przypadków testowych
  ];

  testCasesUSDToPLN.forEach(({ amount, expected }) => {
    it(`should render proper conversion for amount: ${amount} USD to PLN`, () => {
      render(<ResultBox from="USD" to="PLN" amount={amount} />);
      const resultBox = screen.getByTestId('result-box');
      expect(resultBox).toHaveTextContent(expected); // wartości mogą się różnić w zależności od aktualnego kursu walutowego
    });
  });

  // Ćwiczenie 5: Testowanie, gdy wartości 'from' i 'to' są takie same
  it('should render equal values when "from" and "to" are the same', () => {
    const amount = 123;
    render(<ResultBox from="PLN" to="PLN" amount={amount} />);
    const resultBox = screen.getByTestId('result-box');
    expect(resultBox).toHaveTextContent(`PLN ${amount.toFixed(2)} = PLN ${amount.toFixed(2)}`);
  });

  it('renders "Wrong value..." when a negative amount is provided', () => {
    render(<ResultBox from="PLN" to="USD" amount={-100} />);
    const resultBox = screen.getByTestId('result-box');
    expect(resultBox).toHaveTextContent('Wrong value...');
  });
});
