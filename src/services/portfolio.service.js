// src/services/portfolio.service.js
import * as portfolioDal from '../dal/portfolio.dal.js';

export const getAll = () => portfolioDal.getAll();// מחזיר את כל הנתונים מה-DAL

export const getBySymbol = (symbol) => {// פונקציה לשליפת פריט לפי סמל
    const investment = portfolioDal.getBySymbol(symbol);
    if (investment === undefined) {
        throw new Error(`Investment with symbol ${symbol} not found.`);
    }

    return investment;
};

// פונקציה להוספת השקעה חדשה
export const addInvestment = (newInvestment) => {
    const existingInvestment = portfolioDal.getBySymbol(newInvestment.symbol);
    if (existingInvestment !== undefined) {
        throw new Error(`Investment with symbol ${newInvestment.symbol} already exists.`);
    }

    portfolioDal.push(newInvestment);
    return newInvestment;
};

// פונקציה לעדכון השקעה לפי סמל
export const updateInvestment = (symbol, updatedInvestment) => {
    const index = portfolioDal.getAll().findIndex(item => item.symbol.toUpperCase() === symbol.toUpperCase());

    if (index === -1) {
        throw new Error(`Investment with symbol ${symbol} not found.`);
    }
    
    return portfolioDal.updateInvestment(index, updatedInvestment);
};

// פונקציה למחיקת השקעה לפי סמל
export const deleteInvestment = (symbol) => {
    const index = portfolioDal.getAll().findIndex(item => item.symbol.toUpperCase() === symbol.toUpperCase());
    if (index === -1) {
        throw new Error(`Investment with symbol ${symbol} not found.`);
    }
    
   return portfolioDal.removeStock(index);
};



// הפונקציה שמביאה את הנתונים החיים מה-API של Alpha Vantage
export const getLiveStockData = async (symbol) => {
    // לוקח את מפתח ה-API מהקובץ .env
    const apiKey = process.env.Alpha_Vantage_API_Key;
     
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;

    // מחכה לתגובה מה-API של Alpha Vantage
    const response = await fetch(url);
    
    if (!response.ok) {
        throw new Error('Failed to connect to Alpha Vantage API');
    }

    const data = await response.json();
    
    if (data['Global Quote'] && Object.keys(data['Global Quote']).length > 0) {
        return data['Global Quote'];
    } else {
        throw new Error(`Could not find live data for symbol: ${symbol}`);
    }
};