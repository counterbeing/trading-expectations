const runTrade = (
  bank: number,
  plRatio: number,
  accuracy: number,
  risk: number,
) => {
  const tradeIsWinning = Math.random() < accuracy;
  if (tradeIsWinning) {
    const winnings = bank * risk * plRatio;
    return winnings + bank;
  } else {
    const losings = bank * risk;
    return bank - losings;
  }
};

const calculate = (
  bank: number,
  plRatio: number,
  accuracy: number,
  risk: number,
  commission: number,
  iterations: number,
) => {
  let currentBank = bank;
  const bankHistory = [bank];

  for (let i = 0; i < iterations; i++) {
    if (currentBank <= 0) {
      bankHistory.push(currentBank);
      continue;
    }
    currentBank =
      runTrade(currentBank, plRatio, accuracy, risk) - commission * 2;

    bankHistory.push(currentBank);
  }
  return bankHistory;
};

export default calculate;
