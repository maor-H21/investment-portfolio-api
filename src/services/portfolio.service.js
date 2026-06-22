// src/services/portfolio.service.js
import * as portfolioDal from '../dal/portfolio.dal.js';
import { filterArr } from '../utils/filter.js';
import { getFormattedDate } from '../utils/dateTimeFormater_il.js';

export const getAll = () => portfolioDal.getAll();// מחזיר את כל הנתונים מה-DAL

export const getFiltered = (filterBy, condition, value) => {
    return filterArr(portfolioDal.getAll(), filterBy, condition, value);
};

export const getBySymbol = (symbol) => {// פונקציה לשליפת פריט לפי סמל
    const investment = portfolioDal.getBySymbol(symbol);
    if (investment === undefined) {
        throw new Error(`Investment with symbol ${symbol} not found.`);
    }

    return investment;
};

// פונקציה להוספת השקעה חדשה
export const addInvestment = (newInvestment) => {
    const symbol = newInvestment.symbol.toUpperCase();
    const existingInvestment = portfolioDal.getBySymbol(symbol);
    if (existingInvestment !== undefined) {
        throw new Error(`Investment with symbol ${symbol} already exists.`);
    }

    const portfolio = portfolioDal.getAll();
    const nextId = portfolio.length > 0 ? Math.max(...portfolio.map(p => p.id)) + 1 : 1;

    const purchasePrice = Number(newInvestment.purchasePrice);
    const investmentAmount = Number(newInvestment.investmentAmount);
    const shares = Number((investmentAmount / purchasePrice).toFixed(3));

    const addedInvestment = {
        id: nextId,
        symbol,
        purchasePrice,
        investmentAmount,
        shares,
        addedAt: getFormattedDate()
    };

    portfolioDal.push(addedInvestment);
    return addedInvestment;
};

// פונקציה לעדכון השקעה לפי סמל
export const updateInvestment = (symbol, updatedInvestment) => {
    const index = portfolioDal.getAll().findIndex(item => item.symbol.toUpperCase() === symbol.toUpperCase());

    if (index === -1) {
        throw new Error(`Investment with symbol ${symbol} not found.`);
    }
    
    const current = portfolioDal.getAll()[index];
    const purchasePrice = updatedInvestment.purchasePrice !== undefined ? Number(updatedInvestment.purchasePrice) : current.purchasePrice;
    const investmentAmount = updatedInvestment.investmentAmount !== undefined ? Number(updatedInvestment.investmentAmount) : current.investmentAmount;
    const shares = Number((investmentAmount / purchasePrice).toFixed(3));

    const updated = {
        ...updatedInvestment,
        purchasePrice,
        investmentAmount,
        shares
    };

    return portfolioDal.updateInvestment(index, updated);
};

// פונקציה למחיקת השקעה לפי סמל
export const deleteInvestment = (symbol) => {
    const index = portfolioDal.getAll().findIndex(item => item.symbol.toUpperCase() === symbol.toUpperCase());
    if (index === -1) {
        throw new Error(`Investment with symbol ${symbol} not found.`);
    }
    
   return portfolioDal.removeStock(index);
};

// פונקציה לקניית מנייה על בסיס נתונים חיים מה-API
export const buyStockFromQuote = async (symbol, investmentAmount) => {
    const cleanSymbol = symbol.toUpperCase();

    // בדיקה אם המניה כבר קיימת בתיק
    const existingInvestment = portfolioDal.getBySymbol(cleanSymbol);
    if (existingInvestment !== undefined) {
        throw new Error(`Investment with symbol ${cleanSymbol} already exists.`);
    }

    // שליפת הנתונים החיים מה-API
    const liveData = await getLiveStockData(cleanSymbol);
    
    // חילוץ המחיר
    const priceStr = liveData['05. price'];
    if (!priceStr) {
        throw new Error(`Price not found in live data for symbol ${cleanSymbol}`);
    }
    const price = Number(priceStr);

    // חישוב מזהה אוטומטי
    const portfolio = portfolioDal.getAll();
    const nextId = portfolio.length > 0 ? Math.max(...portfolio.map(p => p.id)) + 1 : 1;

    // חישוב כמות המניות
    const shares = Number((Number(investmentAmount) / price).toFixed(3));

    const newStock = {
        id: nextId,
        symbol: cleanSymbol,
        purchasePrice: price,
        investmentAmount: Number(investmentAmount),
        shares,
        addedAt: getFormattedDate()
    };

    portfolioDal.push(newStock);
    return newStock;
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