// src/routes/portfolio.routes.js
import {Router} from 'express';
import * as portfolioController from '../controllers/portfolio.Controller.js';

const router = Router();

router.get('/', portfolioController.getAllInvestments);
router.get('/quote/:symbol', portfolioController.getLiveQuote);
router.get('/:symbol', portfolioController.getInvestmentBySymbol);
router.post('/', portfolioController.addInvestment);
router.put('/:symbol', portfolioController.updateInvestment);
router.delete('/:symbol', portfolioController.deleteInvestment);

export default router;
