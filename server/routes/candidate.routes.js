import {Router} from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
import Candidate from '../models/candidate.model.js';

const candidateRouter = Router();

candidateRouter.post('/apply/job/:id', authenticate, async (req, res) => {
    try{
        const jobId = req.params.id
        const {phone} = req.body;
        const userId = req.user.id;
        const newCandidate = new Candidate({
            jobId,
            userId,
            phone
        });

        await newCandidate.save();

        res.status(201).json({
            success: true,
            message: "Application Successful",
            code: "SUCCESS",
            data: newCandidate
        });
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: "Internal Server Error",
            code: "SERVER_FAULT",
            success: false
        })
    }
});

export default candidateRouter;