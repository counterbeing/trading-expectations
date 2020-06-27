type Result = {
  bank: number;
};

const runTrade = (
  bank: number,
  plRatio: number,
  accuracy: number,
  risk: number,
) => {
  const tradeIsWinning = Math.random() < accuracy;
  if (tradeIsWinning) {
    const winnings = bank * risk * plRatio;
    // console.log(`WIN  pl: ${plRatio}, b: ${bank}, r: ${risk}, w: ${winnings}`);
    return winnings + bank;
  } else {
    const losings = bank * risk;
    // console.log(`LOSS pl: ${plRatio}, b: ${bank}, r: ${risk} l: ${losings}`);
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
): number[] => {
  let currentBank = bank;
  const bankHistory = [bank];

  for (let i = 0; i < iterations; i++) {
    if (currentBank <= 0) {
      bankHistory.push(0);
      continue;
    }
    currentBank =
      runTrade(currentBank, plRatio, accuracy, risk) - commission * 2;

    bankHistory.push(currentBank);
  }
  return bankHistory;
};

export default calculate;
