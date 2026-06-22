export const portfolioData = [
    { id: 1, symbol: 'SPX', purchasePrice: 5300, investmentAmount: 10600, shares: 2, addedAt: '12/06/2026' },
    { id: 2, symbol: 'NDX', purchasePrice: 18500, investmentAmount: 18500, shares: 1, addedAt: '15/06/2026' },
    { id: 3, symbol: 'CSPX', purchasePrice: 550, investmentAmount: 1100, shares: 2, addedAt: '18/06/2026' }
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














