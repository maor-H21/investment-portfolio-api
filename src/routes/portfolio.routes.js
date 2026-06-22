// src/routes/portfolio.routes.js
import {Router} from 'express';
import * as portfolioController from '../controllers/portfolio.Controller.js';
import { isReqHasBody } from '../utils/reqValidation.js';

const router = Router();

router.get('/', portfolioController.getAllInvestments);
router.get('/quote/:symbol', portfolioController.getLiveQuote);
router.get('/:symbol', portfolioController.getInvestmentBySymbol);
router.post('/', isReqHasBody, portfolioController.addInvestment);
router.post('/quote/:symbol', isReqHasBody, portfolioController.buyStockFromQuote);
router.put('/:symbol', isReqHasBody, portfolioController.updateInvestment);
router.delete('/:symbol', portfolioController.deleteInvestment);

export default router;
