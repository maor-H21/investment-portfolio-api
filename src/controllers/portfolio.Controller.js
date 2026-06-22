// src/controllers/portfolio.Controller.js

import * as portfolioService from '../services/portfolio.service.js';

export const getAllInvestments = (req, res) => {
    try {
        const { filterBy, condition, value } = req.query;
        let investments;

        if (filterBy && condition && value) {
            // Parse numeric values if appropriate
            let parsedValue = value;
            if (!isNaN(value) && value.trim() !== '') {
                parsedValue = Number(value);
            }
            investments = portfolioService.getFiltered(filterBy, condition, parsedValue);
        } else {
            investments = portfolioService.getAll();
        }

        res.status(200).json(investments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getInvestmentBySymbol = (req, res) => {
    const { symbol } = req.params;
    try {
        const investment = portfolioService.getBySymbol(symbol);
        res.status(200).json(investment);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

export const addInvestment = (req, res) => {
    const newInvestment = req.body;
    try {
        const addedInvestment = portfolioService.addInvestment(newInvestment);
        res.status(201).json(addedInvestment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateInvestment = (req, res) => {
    const { symbol } = req.params;
    const updatedInvestment = req.body;
    try {
        const investment = portfolioService.updateInvestment(symbol, updatedInvestment);
        res.status(200).json(investment);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

export const deleteInvestment = (req, res) => {
    const { symbol } = req.params;
    try {
        const investment = portfolioService.deleteInvestment(symbol);
        res.status(200).json(investment);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

export const getLiveQuote = async (req, res) => {
    const { symbol } = req.params;
    
    try {
        // מחכים לנתונים של המניה מה-API של Alpha Vantage מה-service
        const liveData = await portfolioService.getLiveStockData(symbol);
        res.status(200).json({ 
            message: `Live data fetched successfully for ${symbol.toUpperCase()}`,
            data: liveData 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const buyStockFromQuote = async (req, res) => {
    const { symbol } = req.params;
    const { investmentAmount } = req.body;

    if (investmentAmount === undefined || isNaN(investmentAmount) || Number(investmentAmount) <= 0) {
        return res.status(400).json({ error: "investmentAmount must be a positive number." });
    }

    try {
        const addedStock = await portfolioService.buyStockFromQuote(symbol, investmentAmount);
        res.status(201).json(addedStock);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};