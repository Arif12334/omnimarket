import { InstallmentDetails, InstallmentPlanType, InstallmentScheduleItem } from '../types';

export interface PlanOption {
  id: InstallmentPlanType;
  title: string;
  subtitle: string;
  badge: string;
  installmentsCount: number;
  frequency: 'bi-weekly' | 'monthly' | 'weekly';
  periodLabel: string;
  installmentAmount: number;
  downPaymentToday: number;
  remainingAmount: number;
  apr: number;
  totalCost: number;
  recommended?: boolean;
}

export function formatDueDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

export function getInstallmentPlans(totalAmount: number): PlanOption[] {
  const safeTotal = Math.max(0, totalAmount);

  const payIn4Amount = parseFloat((safeTotal / 4).toFixed(2));
  const payIn4Remainder = parseFloat((safeTotal - payIn4Amount * 3).toFixed(2)); // handle cents rounding on first

  const monthly3Amount = parseFloat((safeTotal / 3).toFixed(2));
  const monthly3Remainder = parseFloat((safeTotal - monthly3Amount * 2).toFixed(2));

  const monthly6Amount = parseFloat((safeTotal / 6).toFixed(2));
  const monthly6Remainder = parseFloat((safeTotal - monthly6Amount * 5).toFixed(2));

  const monthly12Amount = parseFloat((safeTotal / 12).toFixed(2));
  const monthly12Remainder = parseFloat((safeTotal - monthly12Amount * 11).toFixed(2));

  const weekly8Amount = parseFloat((safeTotal / 8).toFixed(2));
  const weekly8Remainder = parseFloat((safeTotal - weekly8Amount * 7).toFixed(2));

  return [
    {
      id: 'pay_in_4',
      title: 'Pay in 4 (Bi-Weekly)',
      subtitle: '4 interest-free payments every 2 weeks',
      badge: 'Most Popular • 0% APR',
      installmentsCount: 4,
      frequency: 'bi-weekly',
      periodLabel: 'every 2 wks',
      installmentAmount: payIn4Amount,
      downPaymentToday: payIn4Remainder,
      remainingAmount: safeTotal - payIn4Remainder,
      apr: 0,
      totalCost: safeTotal,
      recommended: true
    },
    {
      id: 'monthly_3',
      title: '3 Monthly Installments',
      subtitle: 'Spread evenly over 3 months with 0% interest',
      badge: '0% Interest',
      installmentsCount: 3,
      frequency: 'monthly',
      periodLabel: '/ month',
      installmentAmount: monthly3Amount,
      downPaymentToday: monthly3Remainder,
      remainingAmount: safeTotal - monthly3Remainder,
      apr: 0,
      totalCost: safeTotal
    },
    {
      id: 'monthly_6',
      title: '6 Monthly Installments',
      subtitle: 'Extended flexibility with zero hidden fees',
      badge: '0% APR Promo',
      installmentsCount: 6,
      frequency: 'monthly',
      periodLabel: '/ month',
      installmentAmount: monthly6Amount,
      downPaymentToday: monthly6Remainder,
      remainingAmount: safeTotal - monthly6Remainder,
      apr: 0,
      totalCost: safeTotal
    },
    {
      id: 'monthly_12',
      title: '12 Monthly Budget Flex',
      subtitle: 'Lowest monthly payments for maximum budget freedom',
      badge: 'Ultra Low Monthly',
      installmentsCount: 12,
      frequency: 'monthly',
      periodLabel: '/ month',
      installmentAmount: monthly12Amount,
      downPaymentToday: monthly12Remainder,
      remainingAmount: safeTotal - monthly12Remainder,
      apr: 0,
      totalCost: safeTotal
    },
    {
      id: 'weekly_8',
      title: '8 Weekly Micro-Splits',
      subtitle: 'Small, manageable weekly deductions',
      badge: 'Weekly Flex',
      installmentsCount: 8,
      frequency: 'weekly',
      periodLabel: '/ week',
      installmentAmount: weekly8Amount,
      downPaymentToday: weekly8Remainder,
      remainingAmount: safeTotal - weekly8Remainder,
      apr: 0,
      totalCost: safeTotal
    }
  ];
}

export function generateInstallmentSchedule(
  planType: InstallmentPlanType,
  totalAmount: number,
  firstRef: string = `TXN-${Math.floor(100000 + Math.random() * 900000)}`
): InstallmentScheduleItem[] {
  const safeTotal = Math.max(0, totalAmount);
  const now = new Date();
  const schedule: InstallmentScheduleItem[] = [];

  let count = 4;
  let intervalDays = 14;

  if (planType === 'pay_in_4') {
    count = 4;
    intervalDays = 14;
  } else if (planType === 'monthly_3') {
    count = 3;
    intervalDays = 30;
  } else if (planType === 'monthly_6') {
    count = 6;
    intervalDays = 30;
  } else if (planType === 'monthly_12') {
    count = 12;
    intervalDays = 30;
  } else if (planType === 'weekly_8') {
    count = 8;
    intervalDays = 7;
  }

  const baseAmount = parseFloat((safeTotal / count).toFixed(2));
  let accumulated = 0;

  for (let i = 1; i <= count; i++) {
    const isFirst = i === 1;
    let itemAmount = baseAmount;
    if (i === count) {
      itemAmount = parseFloat((safeTotal - accumulated).toFixed(2));
    }
    accumulated += itemAmount;

    const dueDateObj = new Date(now.getTime() + (i - 1) * intervalDays * 24 * 60 * 60 * 1000);
    const dueDateStr = isFirst ? 'Today (Paid at Checkout)' : formatDueDate(dueDateObj);

    schedule.push({
      number: i,
      dueDate: dueDateStr,
      amount: itemAmount,
      status: isFirst ? 'paid' : 'scheduled',
      paidAt: isFirst ? now.toISOString() : undefined,
      transactionRef: isFirst ? firstRef : undefined
    });
  }

  return schedule;
}

export function createInstallmentDetails(
  planType: InstallmentPlanType,
  totalAmount: number,
  provider: InstallmentDetails['provider'] = 'OmniFlex 0%',
  autoDebitCardLast4: string = '4242',
  autoDebitBrand: string = 'Visa'
): InstallmentDetails {
  const schedule = generateInstallmentSchedule(planType, totalAmount);
  const downPayment = schedule[0]?.amount || 0;
  const remaining = totalAmount - downPayment;
  const nextPayment = schedule[1]?.dueDate || 'In 2 weeks';

  const planNames: Record<InstallmentPlanType, string> = {
    pay_in_4: 'Pay in 4 (Bi-Weekly)',
    monthly_3: '3 Monthly Installments (0% APR)',
    monthly_6: '6 Monthly Installments (0% APR)',
    monthly_12: '12 Monthly Budget Flex',
    weekly_8: '8 Weekly Micro-Splits'
  };

  return {
    planType,
    planName: planNames[planType],
    provider,
    totalAmount,
    downPaymentToday: downPayment,
    remainingBalance: Math.max(0, remaining),
    installmentsCount: schedule.length,
    installments: schedule,
    nextPaymentDate: nextPayment,
    autoDebitCardLast4,
    autoDebitBrand,
    apr: 0
  };
}
