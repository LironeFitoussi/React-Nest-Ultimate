import { Request, Response } from 'express';
import Test from '../models/Test';

export const getAllTests = async (req: Request, res: Response) => {
  try {
    const tests = await Test.find();
    res.status(200).json(tests);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tests', error });
  }
};

export const getTestById = async (req: Request, res: Response) => {
  try {
    const test = await Test.findById(req.params.id);
    res.status(200).json(test);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching test', error });
  }
};

export const createTest = async (req: Request, res: Response) => {
    try {
        const test = await Test.create(req.body);
        res.status(201).json(test);
    } catch (error) {
        res.status(500).json({ message: 'Error creating test', error });
    }
};

export const updateTest = async (req: Request, res: Response) => {
    try {
        const test = await Test.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(test);
    } catch (error) {
        res.status(500).json({ message: 'Error updating test', error });
    }
};

export const deleteTest = async (req: Request, res: Response) => {
    try {
        await Test.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Test deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting test', error });
    }
};

