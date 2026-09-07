import express, { Request, Response, Router } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const server = express();
const dbClient = new PrismaClient();
const port = process.env.PORT || 3001; // Change to 3001 to avoid conflict

server.use(cors());
server.use(express.json());

const apiRouter = Router();

// Fetch all available products
apiRouter.get('/products', async (_req: Request, res: Response) => {
  try {
    const allProducts = await dbClient.product.findMany({
      include: { variants: true, emiPlans: true }
    });
    res.status(200).json(allProducts);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving products' });
  }
});

// Fetch layout data for the home screen
apiRouter.get('/home-data', async (_req: Request, res: Response) => {
  try {
    const [brandList, offerList, featureList] = await Promise.all([
      dbClient.brand.findMany(),
      dbClient.offer.findMany(),
      dbClient.feature.findMany(),
    ]);
    res.status(200).json({ brands: brandList, offers: offerList, features: featureList });
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving home data' });
  }
});

// Fetch single product details
apiRouter.get('/products/:productId', async (req: Request, res: Response) => {
  try {
    const prodId = req.params.productId;
    const itemData = await dbClient.product.findUnique({
      where: { id: prodId },
      include: { variants: true, emiPlans: true }
    });
    
    if (!itemData) {
       res.status(404).json({ message: 'Item not found' });
       return;
    }
    res.status(200).json(itemData);
  } catch (err) {
    res.status(500).json({ message: 'Server error occurred' });
  }
});

server.use('/api', apiRouter);

server.listen(port, () => {
  console.log(`[API] Listening for requests on port ${port}`);
});
