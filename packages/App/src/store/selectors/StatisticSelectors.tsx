import {createDraftSafeSelector} from '@reduxjs/toolkit';
import {Category, DayOfWeek, TransactionType} from '../../types/types';
import {RootState} from '../Store';
import {allTransactionsArray} from './WalletSelectors';

export const getMonthSelector = (state: RootState) => {
  return state.statistic.month;
};

export const category = createDraftSafeSelector(
  allTransactionsArray,
  getMonthSelector,
  (state, month) => {
    const allTransactions = state;
    const allTransactionsByMonth = allTransactions.filter(
      it => new Date(it.date).getMonth() === month,
    );
    const allTransactionExpenses = allTransactionsByMonth.filter(
      it => it.type === TransactionType.expenses,
    );
    const allTransactionExpensesSum = allTransactionExpenses.reduce(
      (sum, cur) => {
        return (sum * 100 + cur.amountTransaction * 100) / 100;
      },
      0,
    );
    const categoryUnknownSum = allTransactionExpenses
      .filter(it => it.category === Category.Unknown)
      .reduce((sum, cur) => {
        return (sum * 100 + cur.amountTransaction * 100) / 100;
      }, 0);

    const categoryGrocerySum = allTransactionExpenses
      .filter(it => it.category === Category.Grocery)
      .reduce((sum, cur) => {
        return (sum * 100 + cur.amountTransaction * 100) / 100;
      }, 0);

    const categoryHealthSum = allTransactionExpenses
      .filter(it => it.category === Category.Health)
      .reduce((sum, cur) => {
        return (sum * 100 + cur.amountTransaction * 100) / 100;
      }, 0);

    const categoryRestaurantSum = allTransactionExpenses
      .filter(it => it.category === Category.Restaurant)
      .reduce((sum, cur) => {
        return (sum * 100 + cur.amountTransaction * 100) / 100;
      }, 0);

    const categoryShoppingSum = allTransactionExpenses
      .filter(it => it.category === Category.Shopping)
      .reduce((sum, cur) => {
        return (sum * 100 + cur.amountTransaction * 100) / 100;
      }, 0);

    const categoryCarSum = allTransactionExpenses
      .filter(it => it.category === Category.Car)
      .reduce((sum, cur) => {
        return (sum * 100 + cur.amountTransaction * 100) / 100;
      }, 0);

    const allCategoriesData = [
      {x: Category.Car, y: categoryCarSum},
      {x: Category.Grocery, y: categoryGrocerySum},
      {x: Category.Health, y: categoryHealthSum},
      {x: Category.Restaurant, y: categoryRestaurantSum},
      {x: Category.Unknown, y: categoryUnknownSum},
      {x: Category.Shopping, y: categoryShoppingSum},
    ];

    const CategoriesWasUsed = allCategoriesData.filter(it => it.y > 0);

    const list = CategoriesWasUsed.map(it => {
      return {
        category: it.x,
        pro: `${Math.round((it.y / allTransactionExpensesSum) * 100)}%`,
      };
    });

    return {list: list, categories: CategoriesWasUsed};
  },
);

export const flow = createDraftSafeSelector(
  allTransactionsArray,
  getMonthSelector,
  (state, month) => {
    const allTransactions = state;

    const allTransactionsByMonth = allTransactions.filter(
      it => new Date(it.date).getMonth() === month,
    );

    const allIncomeSum = allTransactionsByMonth
      .filter(it => it.type === TransactionType.income)
      .reduce((sum, cur) => {
        return (sum * 100 + cur.amountTransaction * 100) / 100;
      }, 0);

    const allExpensesSum = allTransactionsByMonth
      .filter(it => it.type === TransactionType.expenses)
      .reduce((sum, cur) => {
        return (sum * 100 + cur.amountTransaction * 100) / 100;
      }, 0);

    let left;
    let overExpenses;
    let greenPercent;
    let redPercent;
    let styleGreen;
    let styleRed;

    if (allIncomeSum > allExpensesSum) {
      greenPercent = 100 - Math.round((allExpensesSum / allIncomeSum) * 100);
      left = allIncomeSum - allExpensesSum;
      styleGreen = {width: `${greenPercent}%`, opacity: 1};
      styleRed = {opacity: 0};
    }

    if (allIncomeSum < allExpensesSum) {
      redPercent = 100 - Math.round((allIncomeSum / allExpensesSum) * 100);
      overExpenses = allExpensesSum - allIncomeSum;
      styleGreen = {opacity: 0};
      styleRed = {width: `${redPercent}%`, opacity: 1};
    }

    return {
      styleGreen: styleGreen,
      styleRed: styleRed,
      left: left,
      overExpenses: overExpenses,
      allIncomeSum: allIncomeSum,
      allExpensesSum: allExpensesSum,
    };
  },
);


export const weekly = createDraftSafeSelector(
    allTransactionsArray,
    getMonthSelector,
    (state, month) => {

        const allTransactions = state;

        const daysInMonth = new Date(new Date().getFullYear(), month + 1, 1);
        daysInMonth.setDate(daysInMonth.getDate() - 1);
      
        const allDaysInMonth: Array<{
          DayOfWeek: number;
          day: number;
          x: string;
          y: number;
        }> = [];
      
        for (let i = 1; i <= daysInMonth.getDate(); i++) {
          const day = new Date(new Date().getFullYear(), month, i);
          const dayOfMonth = {
            DayOfWeek: day.getDay(),
            day: day.getDate(),
            x: `${DayOfWeek[day.getDay()]}` + `${day.getDate()}`,
            y: 0,
          };
          allDaysInMonth.push(dayOfMonth);
        }


        const allTransactionsByMonth =  allTransactions.filter(it => new Date(it.date).getMonth() === month);
        
          const allTransactionExpenses = allTransactionsByMonth
              .filter(it => it.type === TransactionType.expenses)
              .reverse()
              .map(it => ({
                x:
                  `${DayOfWeek[new Date(it.date).getDay()]}` +
                  ` ${new Date(it.date).getDate()}`,
                day: new Date(it.date).getDate(),
                DayOfWeek: new Date(it.date).getDay(),
                y: it.amountTransaction,
              }));
      
        
          const allTransactionsDurMonth = allDaysInMonth.map(it => {
            if (allTransactionExpenses.find(item => item.day === it.day)) {
              const sum = allTransactionExpenses
                .filter(items => items.day === it.day)
                .reduce((sum, cur) => {
                  return sum + cur.y;
                }, 0);
              it.y = sum;
              return it;
            } else {
              return it;
            }
          });
        
          const arrayOfCharts = [
            allTransactionsDurMonth.splice(0, 5),
            allTransactionsDurMonth.splice(0, 5),
            allTransactionsDurMonth.splice(0, 5),
            allTransactionsDurMonth.splice(0, 5),
            allTransactionsDurMonth.splice(0, 5),
            allTransactionsDurMonth,
            [],
          ];
        
          return arrayOfCharts

    })
