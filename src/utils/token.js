/**
 * JWT Token utilities
 * 
 * Handles JWT token creation and verification with proper Winston logging.
 */
import jwt from 'jsonwebtoken';
import {jwtKey} from '../config/index.js';
import { createLogger } from './logger.js';

// Create a contextualized logger for this utility
const logger = createLogger('TOKEN-UTIL');

/**
 * Create a new JWT token
 * 
 * @param {Object} payload - The data to include in the token
 * @param {string} expiresIn - Token expiration time
 * @returns {string} The signed JWT token
 */
export const createToken = async (payload, expiresIn = '24h') => {
    try {
        logger.info('Creating new JWT token');
        const token = await jwt.sign(payload, jwtKey, { expiresIn });
        logger.debug(`Token created successfully with expiry ${expiresIn}`);
        return token;
    } catch (error) {
        logger.error(`Error creating token: ${error.message}`);
        throw error;
    }
}

/**
 * Verify a JWT token
 * 
 * @param {string} token - The token to verify
 * @returns {Object} The decoded token payload
 */
export const verifyToken = async(token) => {
    try {
        logger.info('Verifying JWT token');
        const decoded = await jwt.verify(token, jwtKey);
        logger.debug('Token verified successfully');
        return decoded;
    } catch (error) {
        logger.error(`Error verifying token: ${error.message}`);
        throw error;
    }
}