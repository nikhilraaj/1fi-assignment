"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const client_1 = require("@prisma/client");
dotenv_1.default.config();
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
const PORT = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Get all products
app.get('/api/products', async (req, res) => {
    const products = await prisma.product.findMany({
        include: { variants: true, emiPlans: true }
    });
    res.json(products);
});
// Get home page UI data
app.get('/api/home-data', async (req, res) => {
    const brands = await prisma.brand.findMany();
    const offers = await prisma.offer.findMany();
    const features = await prisma.feature.findMany();
    res.json({ brands, offers, features });
});
// Get product by id
app.get('/api/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await prisma.product.findUnique({
            where: { id },
            include: {
                variants: true,
                emiPlans: true,
            }
        });
        if (!product) {
            res.status(404).json({ error: 'Product not found' });
            return;
        }
        res.json(product);
    }
    catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map