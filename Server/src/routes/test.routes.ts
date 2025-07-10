import { Router, RequestHandler } from 'express';
import {
    getAllTests,
    getTestById,
    createTest,
    updateTest,
    deleteTest
} from '../controllers/test.controller';
import { jwtCheck, getUserProfile } from '../middleware/auth0Middleware';

const router = Router();

/**
 * Get all tests
 * @route GET /api/v1/tests
 * @description Get all tests
 */
router.get('/', jwtCheck, getUserProfile, getAllTests as RequestHandler);

/**
 * Get test by ID
 * @route GET /api/v1/tests/:id
 * @description Get test by ID
 */
router.get('/:id', jwtCheck, getUserProfile, getTestById as RequestHandler);

/**
 * Create test
 * @route POST /api/v1/tests
 * @description Create test
 */
router.post('/', jwtCheck, getUserProfile, createTest as RequestHandler);

/**
 * Update test
 * @route PUT /api/v1/tests/:id
 * @description Update test
 */
router.put('/:id', jwtCheck, getUserProfile, updateTest as RequestHandler);

/**
 * Delete test
 * @route DELETE /api/v1/tests/:id
 * @description Delete test
 */
router.delete('/:id', jwtCheck, getUserProfile, deleteTest as RequestHandler);

export default router;