export const convertPLNToUSD = (PLN) => {
  // Sprawdzanie, czy wartość jest stringiem
  if (typeof PLN === 'string') {
      return NaN;
  }
  if (PLN === undefined) {
    return NaN;
}

  // Sprawdzanie, czy wartość jest liczbą ujemną
  if (PLN < 0) {
      return '$0.00';
  }

  // Sprawdzanie, czy wartość jest różna od liczby i stringa
  if (typeof PLN !== 'number' && typeof PLN !== 'string') {
      return 'Error';
  }

  const PLNtoUSD = PLN / 3.5;
  
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  });

  return formatter.format(PLNtoUSD).replace(/\u00a0/g, ' ');
}
