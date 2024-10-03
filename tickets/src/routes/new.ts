import express, {Request, Response} from 'express'
import { requireAuth, validateRequest } from '@spetsartickets/common'
import { body } from 'express-validator';
import { Ticket } from '../models/ticket';

const router = express.Router()


router.post('/api/tickets', requireAuth,  
    [
        body('title').not().isEmpty().withMessage('Title is required'),
        body('price').isFloat({ gt: 0 }).withMessage('price must be greater than 0')
    ],
     validateRequest , 
    async (req: Request, res: Response) => {
    console.log('here')
    const { title, price} = req.body

    const ticket = Ticket.build({
        title,
        price,
        userId: req.currentUser!.id
    })
    await ticket.save()
    res.status(201).send(ticket)
})


export { router as createTicketRouter }