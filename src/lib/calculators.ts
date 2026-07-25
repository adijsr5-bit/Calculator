// ValuePilot Mathematical Engines

export interface AmortizationYear {
  year: number;
  principalPaid: number;
  interestPaid: number;
  totalInterestPaid: number;
  remainingBalance: number;
}

// 1. MORTGAGE CALCULATOR
export interface MortgageInput {
  housePrice: number;
  downPaymentPercent: number;
  interestRate: number; // e.g. 6.5%
  loanTermYears: number; // e.g. 30
  propertyTaxAnnual: number;
  homeInsuranceAnnual: number;
  hoaMonthly: number;
}

export interface MortgageResult {
  downPaymentAmount: number;
  loanAmount: number;
  monthlyPrincipalAndInterest: number;
  monthlyPropertyTax: number;
  monthlyInsurance: number;
  monthlyHOA: number;
  monthlyPMI: number;
  totalMonthlyPayment: number;
  totalInterestPaid: number;
  totalCostOfHome: number;
  amortizationSchedule: AmortizationYear[];
}

export function calculateMortgage(input: MortgageInput): MortgageResult {
  const downPaymentAmount = (input.housePrice * input.downPaymentPercent) / 100;
  const loanAmount = Math.max(0, input.housePrice - downPaymentAmount);
  const monthlyRate = input.interestRate / 100 / 12;
  const totalMonths = input.loanTermYears * 12;

  let monthlyPrincipalAndInterest = 0;
  if (monthlyRate > 0 && totalMonths > 0) {
    monthlyPrincipalAndInterest =
      (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1);
  } else if (totalMonths > 0) {
    monthlyPrincipalAndInterest = loanAmount / totalMonths;
  }

  const monthlyPropertyTax = input.propertyTaxAnnual / 12;
  const monthlyInsurance = input.homeInsuranceAnnual / 12;
  const monthlyHOA = input.hoaMonthly;
  const monthlyPMI = input.downPaymentPercent < 20 ? (loanAmount * 0.0075) / 12 : 0; // 0.75% annual PMI if < 20% down

  const totalMonthlyPayment =
    monthlyPrincipalAndInterest + monthlyPropertyTax + monthlyInsurance + monthlyHOA + monthlyPMI;

  let balance = loanAmount;
  let totalInterest = 0;
  const schedule: AmortizationYear[] = [];

  for (let year = 1; year <= input.loanTermYears; year++) {
    let yearPrincipal = 0;
    let yearInterest = 0;

    for (let m = 1; m <= 12; m++) {
      if (balance <= 0) break;
      const interestForMonth = balance * monthlyRate;
      const principalForMonth = Math.min(balance, monthlyPrincipalAndInterest - interestForMonth);
      yearInterest += interestForMonth;
      yearPrincipal += principalForMonth;
      balance = Math.max(0, balance - principalForMonth);
    }

    totalInterest += yearInterest;
    schedule.push({
      year,
      principalPaid: Math.round(yearPrincipal),
      interestPaid: Math.round(yearInterest),
      totalInterestPaid: Math.round(totalInterest),
      remainingBalance: Math.round(balance),
    });
  }

  const totalCostOfHome = downPaymentAmount + loanAmount + totalInterest;

  return {
    downPaymentAmount,
    loanAmount,
    monthlyPrincipalAndInterest: Math.round(monthlyPrincipalAndInterest),
    monthlyPropertyTax: Math.round(monthlyPropertyTax),
    monthlyInsurance: Math.round(monthlyInsurance),
    monthlyHOA: Math.round(monthlyHOA),
    monthlyPMI: Math.round(monthlyPMI),
    totalMonthlyPayment: Math.round(totalMonthlyPayment),
    totalInterestPaid: Math.round(totalInterest),
    totalCostOfHome: Math.round(totalCostOfHome),
    amortizationSchedule: schedule,
  };
}

// 2. REFINANCE CALCULATOR
export interface RefinanceInput {
  currentBalance: number;
  currentInterestRate: number;
  currentRemainingYears: number;
  newInterestRate: number;
  newLoanTermYears: number;
  refinanceClosingCosts: number;
  rollCostsIntoLoan: boolean;
}

export interface RefinanceResult {
  currentMonthlyPayment: number;
  newMonthlyPayment: number;
  monthlySavings: number;
  currentTotalRemainingInterest: number;
  newTotalInterest: number;
  netLifetimeSavings: number;
  breakEvenMonths: number;
}

export function calculateRefinance(input: RefinanceInput): RefinanceResult {
  const currentMonthlyRate = input.currentInterestRate / 100 / 12;
  const currentMonths = input.currentRemainingYears * 12;
  const currentPayment =
    (input.currentBalance * (currentMonthlyRate * Math.pow(1 + currentMonthlyRate, currentMonths))) /
    (Math.pow(1 + currentMonthlyRate, currentMonths) - 1);
  const currentTotalInterest = currentPayment * currentMonths - input.currentBalance;

  const newLoanAmount = input.rollCostsIntoLoan
    ? input.currentBalance + input.refinanceClosingCosts
    : input.currentBalance;
  const newMonthlyRate = input.newInterestRate / 100 / 12;
  const newMonths = input.newLoanTermYears * 12;

  const newPayment =
    (newLoanAmount * (newMonthlyRate * Math.pow(1 + newMonthlyRate, newMonths))) /
    (Math.pow(1 + newMonthlyRate, newMonths) - 1);
  const newTotalInterest = newPayment * newMonths - newLoanAmount;

  const monthlySavings = currentPayment - newPayment;
  const netLifetimeSavings = currentTotalInterest - newTotalInterest - (input.rollCostsIntoLoan ? 0 : input.refinanceClosingCosts);
  const breakEvenMonths = monthlySavings > 0 ? Math.ceil(input.refinanceClosingCosts / monthlySavings) : 0;

  return {
    currentMonthlyPayment: Math.round(currentPayment),
    newMonthlyPayment: Math.round(newPayment),
    monthlySavings: Math.round(monthlySavings),
    currentTotalRemainingInterest: Math.round(currentTotalInterest),
    newTotalInterest: Math.round(newTotalInterest),
    netLifetimeSavings: Math.round(netLifetimeSavings),
    breakEvenMonths,
  };
}

// 3. CAR LOAN CALCULATOR
export interface CarLoanInput {
  vehiclePrice: number;
  downPayment: number;
  tradeInValue: number;
  salesTaxPercent: number;
  interestRate: number;
  loanTermMonths: number;
}

export interface CarLoanResult {
  salesTaxAmount: number;
  totalLoanAmount: number;
  monthlyEMI: number;
  totalInterestPaid: number;
  totalCostOfVehicle: number;
}

export function calculateCarLoan(input: CarLoanInput): CarLoanResult {
  const netTaxable = Math.max(0, input.vehiclePrice - input.tradeInValue);
  const salesTaxAmount = (netTaxable * input.salesTaxPercent) / 100;
  const totalLoanAmount = Math.max(0, input.vehiclePrice + salesTaxAmount - input.downPayment - input.tradeInValue);

  const monthlyRate = input.interestRate / 100 / 12;
  let monthlyEMI = 0;
  if (monthlyRate > 0 && input.loanTermMonths > 0) {
    monthlyEMI =
      (totalLoanAmount * (monthlyRate * Math.pow(1 + monthlyRate, input.loanTermMonths))) /
      (Math.pow(1 + monthlyRate, input.loanTermMonths) - 1);
  } else if (input.loanTermMonths > 0) {
    monthlyEMI = totalLoanAmount / input.loanTermMonths;
  }

  const totalInterestPaid = monthlyEMI * input.loanTermMonths - totalLoanAmount;
  const totalCostOfVehicle = input.downPayment + input.tradeInValue + monthlyEMI * input.loanTermMonths;

  return {
    salesTaxAmount: Math.round(salesTaxAmount),
    totalLoanAmount: Math.round(totalLoanAmount),
    monthlyEMI: Math.round(monthlyEMI),
    totalInterestPaid: Math.round(Math.max(0, totalInterestPaid)),
    totalCostOfVehicle: Math.round(totalCostOfVehicle),
  };
}

// 4. DEBT PAYOFF PLANNER
export interface DebtItem {
  id: string;
  name: string;
  balance: number;
  interestRate: number;
  minPayment: number;
}

export interface DebtPayoffResult {
  snowballMonths: number;
  snowballTotalInterest: number;
  avalancheMonths: number;
  avalancheTotalInterest: number;
  interestSavedWithAvalanche: number;
  monthsFasterWithAvalanche: number;
}

export function calculateDebtPayoff(debts: DebtItem[], extraMonthlyPayment: number): DebtPayoffResult {
  if (debts.length === 0) {
    return { snowballMonths: 0, snowballTotalInterest: 0, avalancheMonths: 0, avalancheTotalInterest: 0, interestSavedWithAvalanche: 0, monthsFasterWithAvalanche: 0 };
  }

  const runPayoffStrategy = (strategy: "snowball" | "avalanche") => {
    let list = debts.map((d) => ({ ...d }));
    let months = 0;
    let totalInterestPaid = 0;
    const maxMonthsLimit = 360; // 30 years ceiling to avoid infinite loops

    while (list.some((d) => d.balance > 0) && months < maxMonthsLimit) {
      months++;
      // Sort: Snowball = lowest balance first, Avalanche = highest rate first
      list.sort((a, b) => (strategy === "snowball" ? a.balance - b.balance : b.interestRate - a.interestRate));

      let extraBudget = extraMonthlyPayment;

      // Apply monthly interest & min payments
      for (const debt of list) {
        if (debt.balance > 0) {
          const monthInterest = (debt.balance * (debt.interestRate / 100)) / 12;
          debt.balance += monthInterest;
          totalInterestPaid += monthInterest;

          const payment = Math.min(debt.balance, debt.minPayment);
          debt.balance -= payment;
        }
      }

      // Apply extra budget to top debt
      for (const debt of list) {
        if (debt.balance > 0 && extraBudget > 0) {
          const extraPay = Math.min(debt.balance, extraBudget);
          debt.balance -= extraPay;
          extraBudget -= extraPay;
        }
      }
    }

    return { months, totalInterestPaid: Math.round(totalInterestPaid) };
  };

  const snowball = runPayoffStrategy("snowball");
  const avalanche = runPayoffStrategy("avalanche");

  return {
    snowballMonths: snowball.months,
    snowballTotalInterest: snowball.totalInterestPaid,
    avalancheMonths: avalanche.months,
    avalancheTotalInterest: avalanche.totalInterestPaid,
    interestSavedWithAvalanche: Math.max(0, snowball.totalInterestPaid - avalanche.totalInterestPaid),
    monthsFasterWithAvalanche: Math.max(0, snowball.months - avalanche.months),
  };
}

// 5. BUDGET PLANNER (50/30/20 & Zero-Based)
export interface BudgetInput {
  monthlyIncome: number;
  housing: number;
  food: number;
  transport: number;
  utilities: number;
  insurance: number;
  subscriptions: number;
  debtPayments: number;
  savingsInvestment: number;
  entertainment: number;
  misc: number;
}

export interface BudgetResult {
  totalIncome: number;
  totalExpenses: number;
  remainingCash: number;
  savingsRatePercent: number;
  needsTotal: number;
  wantsTotal: number;
  savingsTotal: number;
  needsPercent: number;
  wantsPercent: number;
  savingsPercent: number;
  recommendations: string[];
}

export function calculateBudget(input: BudgetInput): BudgetResult {
  const needsTotal = input.housing + input.food + input.transport + input.utilities + input.insurance + input.debtPayments;
  const wantsTotal = input.subscriptions + input.entertainment + input.misc;
  const savingsTotal = input.savingsInvestment;

  const totalExpenses = needsTotal + wantsTotal + savingsTotal;
  const remainingCash = input.monthlyIncome - totalExpenses;
  const savingsRatePercent = input.monthlyIncome > 0 ? (savingsTotal / input.monthlyIncome) * 100 : 0;

  const needsPercent = input.monthlyIncome > 0 ? (needsTotal / input.monthlyIncome) * 100 : 0;
  const wantsPercent = input.monthlyIncome > 0 ? (wantsTotal / input.monthlyIncome) * 100 : 0;
  const savingsPercent = input.monthlyIncome > 0 ? (savingsTotal / input.monthlyIncome) * 100 : 0;

  const recommendations: string[] = [];

  if (needsPercent > 50) {
    recommendations.push(`Your essential needs (${needsPercent.toFixed(1)}%) exceed the recommended 50% target. Try negotiating utility bills or reducing fixed housing expenses.`);
  } else {
    recommendations.push(`Great job! Essential needs are safely under the 50% threshold (${needsPercent.toFixed(1)}%).`);
  }

  if (wantsPercent > 30) {
    recommendations.push(`Discretionary wants spending (${wantsPercent.toFixed(1)}%) is above the 30% guideline. Consider cancelling unused subscriptions.`);
  }

  if (savingsPercent < 20) {
    recommendations.push(`Your savings rate (${savingsPercent.toFixed(1)}%) is below 20%. Aim to automate transfers on payday to boost long-term wealth.`);
  } else {
    recommendations.push(`Excellent wealth accumulation rate (${savingsPercent.toFixed(1)}%)! You are building solid financial freedom.`);
  }

  return {
    totalIncome: input.monthlyIncome,
    totalExpenses: Math.round(totalExpenses),
    remainingCash: Math.round(remainingCash),
    savingsRatePercent,
    needsTotal: Math.round(needsTotal),
    wantsTotal: Math.round(wantsTotal),
    savingsTotal: Math.round(savingsTotal),
    needsPercent,
    wantsPercent,
    savingsPercent,
    recommendations,
  };
}

// 6. TAX REFUND ESTIMATOR
export interface TaxInput {
  filingStatus: "single" | "married_joint" | "head_of_household";
  grossIncome: number;
  federalTaxPaid: number;
  deductionType: "standard" | "itemized";
  itemizedDeductionAmount: number;
  taxCredits: number;
}

export interface TaxResult {
  grossIncome: number;
  standardDeduction: number;
  appliedDeduction: number;
  taxableIncome: number;
  totalTaxOwed: number;
  effectiveTaxRate: number;
  marginalTaxRate: number;
  estimatedRefundOrOwed: number; // positive = refund, negative = owed
}

export function calculateTaxRefund(input: TaxInput): TaxResult {
  // 2024 / 2025 Standard Deductions
  const standardDeductions = {
    single: 14600,
    married_joint: 29200,
    head_of_household: 21900,
  };

  const standardDed = standardDeductions[input.filingStatus];
  const appliedDeduction = input.deductionType === "standard" ? standardDed : Math.max(standardDed, input.itemizedDeductionAmount);
  const taxableIncome = Math.max(0, input.grossIncome - appliedDeduction);

  // US Federal Tax Brackets Single 2024
  const bracketsSingle = [
    { limit: 11600, rate: 0.10 },
    { limit: 47150, rate: 0.12 },
    { limit: 100525, rate: 0.22 },
    { limit: 191950, rate: 0.24 },
    { limit: 243725, rate: 0.32 },
    { limit: 609350, rate: 0.35 },
    { limit: Infinity, rate: 0.37 },
  ];

  let rawTax = 0;
  let previousLimit = 0;
  let marginalTaxRate = 0.10;

  for (const b of bracketsSingle) {
    if (taxableIncome > previousLimit) {
      const taxableInBracket = Math.min(taxableIncome, b.limit) - previousLimit;
      rawTax += taxableInBracket * b.rate;
      marginalTaxRate = b.rate;
      previousLimit = b.limit;
    } else {
      break;
    }
  }

  const finalTaxOwed = Math.max(0, rawTax - input.taxCredits);
  const effectiveTaxRate = input.grossIncome > 0 ? (finalTaxOwed / input.grossIncome) * 100 : 0;
  const estimatedRefundOrOwed = input.federalTaxPaid - finalTaxOwed;

  return {
    grossIncome: input.grossIncome,
    standardDeduction: standardDed,
    appliedDeduction,
    taxableIncome: Math.round(taxableIncome),
    totalTaxOwed: Math.round(finalTaxOwed),
    effectiveTaxRate,
    marginalTaxRate: marginalTaxRate * 100,
    estimatedRefundOrOwed: Math.round(estimatedRefundOrOwed),
  };
}

// 7. RETIREMENT CALCULATOR
export interface RetirementInput {
  currentAge: number;
  retirementAge: number;
  currentSavings: number;
  monthlyInvestment: number;
  expectedAnnualReturn: number;
  expectedInflation: number;
}

export interface RetirementGrowthYear {
  age: number;
  totalContributions: number;
  totalInterestEarned: number;
  nominalBalance: number;
  realBalance: number;
}

export interface RetirementResult {
  totalYears: number;
  nominalFutureValue: number;
  realInflationAdjustedValue: number;
  totalOutofPocketInvested: number;
  totalCompoundInterestEarned: number;
  growthSchedule: RetirementGrowthYear[];
}

export function calculateRetirement(input: RetirementInput): RetirementResult {
  const years = Math.max(1, input.retirementAge - input.currentAge);
  const monthlyNominalRate = input.expectedAnnualReturn / 100 / 12;
  const realRate = (input.expectedAnnualReturn - input.expectedInflation) / 100 / 12;

  let balance = input.currentSavings;
  let realBalance = input.currentSavings;
  let totalInvested = input.currentSavings;

  const schedule: RetirementGrowthYear[] = [];

  for (let year = 1; year <= years; year++) {
    for (let m = 1; m <= 12; m++) {
      balance = (balance + input.monthlyInvestment) * (1 + monthlyNominalRate);
      realBalance = (realBalance + input.monthlyInvestment) * (1 + realRate);
      totalInvested += input.monthlyInvestment;
    }

    const currentAge = input.currentAge + year;
    const interestEarned = balance - totalInvested;

    schedule.push({
      age: currentAge,
      totalContributions: Math.round(totalInvested),
      totalInterestEarned: Math.round(interestEarned),
      nominalBalance: Math.round(balance),
      realBalance: Math.round(realBalance),
    });
  }

  return {
    totalYears: years,
    nominalFutureValue: Math.round(balance),
    realInflationAdjustedValue: Math.round(realBalance),
    totalOutofPocketInvested: Math.round(totalInvested),
    totalCompoundInterestEarned: Math.round(balance - totalInvested),
    growthSchedule: schedule,
  };
}

// 8. 401(K) CALCULATOR
export interface Four01kInput {
  currentAge: number;
  retirementAge: number;
  currentSalary: number;
  annualSalaryIncrease: number;
  employeeContributionPercent: number;
  employerMatchPercent: number; // e.g. 50%
  employerMatchLimitPercent: number; // up to 6% of salary
  currentBalance: number;
  expectedAnnualReturn: number;
}

export interface Four01kResult {
  finalBalance: number;
  totalEmployeeContributions: number;
  totalEmployerMatch: number;
  totalCompoundGrowth: number;
}

export function calculate401k(input: Four01kInput): Four01kResult {
  const years = Math.max(1, input.retirementAge - input.currentAge);
  let balance = input.currentBalance;
  let salary = input.currentSalary;
  let totalEmployee = 0;
  let totalEmployer = 0;
  const rate = input.expectedAnnualReturn / 100;

  for (let y = 1; y <= years; y++) {
    const employeeContrib = (salary * input.employeeContributionPercent) / 100;
    const matchablePercent = Math.min(input.employeeContributionPercent, input.employerMatchLimitPercent);
    const employerContrib = (salary * matchablePercent * (input.employerMatchPercent / 100)) / 100;

    totalEmployee += employeeContrib;
    totalEmployer += employerContrib;

    balance = (balance + employeeContrib + employerContrib) * (1 + rate);
    salary *= 1 + input.annualSalaryIncrease / 100;
  }

  const growth = balance - input.currentBalance - totalEmployee - totalEmployer;

  return {
    finalBalance: Math.round(balance),
    totalEmployeeContributions: Math.round(totalEmployee),
    totalEmployerMatch: Math.round(totalEmployer),
    totalCompoundGrowth: Math.round(growth),
  };
}

// 9. IRA CALCULATOR
export interface IraInput {
  currentAge: number;
  retirementAge: number;
  annualContribution: number;
  currentMarginalTaxRate: number;
  expectedRetirementTaxRate: number;
  expectedAnnualReturn: number;
}

export interface IraResult {
  traditionalFutureValueTaxed: number;
  rothFutureValue: number;
  upfrontTaxSavings: number;
  betterOption: "Roth IRA" | "Traditional IRA";
}

export function calculateIRA(input: IraInput): IraResult {
  const years = Math.max(1, input.retirementAge - input.currentAge);
  const r = input.expectedAnnualReturn / 100;

  // Traditional IRA: pre-tax contributions compound tax free, taxed at withdrawal
  let tradBalance = 0;
  for (let i = 0; i < years; i++) {
    tradBalance = (tradBalance + input.annualContribution) * (1 + r);
  }
  const traditionalAfterTax = tradBalance * (1 - input.expectedRetirementTaxRate / 100);

  // Roth IRA: post-tax contributions compound tax free, 100% tax free withdrawals
  const rothContribution = input.annualContribution;
  let rothBalance = 0;
  for (let i = 0; i < years; i++) {
    rothBalance = (rothBalance + rothContribution) * (1 + r);
  }

  const upfrontTaxSavings = input.annualContribution * (input.currentMarginalTaxRate / 100) * years;
  const betterOption = rothBalance >= traditionalAfterTax ? "Roth IRA" : "Traditional IRA";

  return {
    traditionalFutureValueTaxed: Math.round(traditionalAfterTax),
    rothFutureValue: Math.round(rothBalance),
    upfrontTaxSavings: Math.round(upfrontTaxSavings),
    betterOption,
  };
}

// 10. NET WORTH CALCULATOR
export interface NetWorthInput {
  cashSavings: number;
  stocksInvestments: number;
  cryptoVal: number;
  realEstateVal: number;
  vehiclesVal: number;
  otherAssetsVal: number;
  creditCardDebt: number;
  personalLoans: number;
  mortgageDebt: number;
  studentLoans: number;
  autoLoans: number;
}

export interface NetWorthResult {
  totalAssets: number;
  totalLiabilities: number;
  netWorth: number;
  liquidAssets: number;
  assetToDebtRatio: number;
}

export function calculateNetWorth(input: NetWorthInput): NetWorthResult {
  const totalAssets =
    input.cashSavings +
    input.stocksInvestments +
    input.cryptoVal +
    input.realEstateVal +
    input.vehiclesVal +
    input.otherAssetsVal;

  const totalLiabilities =
    input.creditCardDebt + input.personalLoans + input.mortgageDebt + input.studentLoans + input.autoLoans;

  const netWorth = totalAssets - totalLiabilities;
  const liquidAssets = input.cashSavings + input.stocksInvestments + input.cryptoVal;
  const assetToDebtRatio = totalLiabilities > 0 ? totalAssets / totalLiabilities : totalAssets > 0 ? 100 : 0;

  return {
    totalAssets: Math.round(totalAssets),
    totalLiabilities: Math.round(totalLiabilities),
    netWorth: Math.round(netWorth),
    liquidAssets: Math.round(liquidAssets),
    assetToDebtRatio: Number(assetToDebtRatio.toFixed(2)),
  };
}
