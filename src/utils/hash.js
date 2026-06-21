/**
 * Password utilities
 * 
 * Handles password hashing and verification with proper Winston logging.
 */
import bcrypt from 'bcrypt';
import { createLogger } from './logger.js';

// Create a contextualized logger for this utility
const logger = createLogger('HASH-UTIL');

/**
 * Hash a password using bcrypt
 * 
 * @param {string} password - The password to hash
 * @returns {string} The hashed password
 */
export const hashPassword = async (password) => {
  try {
    logger.info('Hashing password');
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    logger.debug('Password hashed successfully');
    return hash;
  } catch (error) {
    logger.error(`Error hashing password: ${error.message}`);
    throw error;
  }
}

/**
 * Verify a password against a hash
 * 
 * @param {string} password - The password to verify
 * @param {string} hashedPassword - The hashed password to verify against
 * @returns {boolean} Whether the password matches the hash
 */
export const verifyPassword = async (password, hashedPassword) => {
  try {
    logger.info('Verifying password');
    const result = await bcrypt.compare(password, hashedPassword);
    logger.debug(`Password verification result: ${result}`);
    return result;
  } catch (error) {
    logger.error(`Error verifying password: ${error.message}`);
    throw error;
  }
}