// src/dal/portfolio.js

export const portfolioData = [
    { id: 1, symbol: 'SPX', name: 'S&P 500 Index', type: 'Index', value: 5300 },
    { id: 2, symbol: 'NDX', name: 'NASDAQ 100', type: 'Index', value: 18500 },
    { id: 3, symbol: 'CSPX', name: 'iShares Core S&P 500 UCITS ETF', type: 'Irish-Domiciled ETF', value: 550 }
];

// פונקציה לשליפת כל הנתונים
export const getAll = () => portfolioData;

export const getBySymbol = (symbol) => portfolioData.find(item => item.symbol.toUpperCase() === symbol.toUpperCase()); // פונקציה לשליפת פריט לפי סמל

export const updateInvestment = (index,updatedInvestment) => {
   portfolioData[index] = { ...portfolioData[index], ...updatedInvestment };
   return portfolioData[index];
};

export const push = (item) => portfolioData.push(item);// פונקציה להוספת השקעה חדשה

export const removeStock = (index) => portfolioData.splice(index, 1);














