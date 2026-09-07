"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    await prisma.emiPlan.deleteMany();
    await prisma.productVariant.deleteMany();
    await prisma.product.deleteMany();
    const product1 = await prisma.product.create({
        data: {
            name: 'Air India Gift Voucher',
            description: 'Book your Euro-phoric Escape with 1Fi. Comes with 1-year validity and is valid only on online bookings.',
            imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a615061c4ca?auto=format&fit=crop&w=500&q=80',
            basePrice: 2000,
            variants: {
                create: [
                    { name: 'Standard Voucher', priceModifier: 0 },
                ]
            },
            emiPlans: {
                create: [
                    { months: 3, interestRate: 0 },
                    { months: 6, interestRate: 0 },
                    { months: 12, interestRate: 5 },
                    { months: 18, interestRate: 8 },
                ]
            }
        }
    });
    const product2 = await prisma.product.create({
        data: {
            name: 'iPhone 15 Pro',
            description: 'Titanium design. A17 Pro chip. 48MP Main camera.',
            imageUrl: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&w=500&q=80',
            basePrice: 134900,
            variants: {
                create: [
                    { name: '128GB, Natural Titanium', priceModifier: 0 },
                    { name: '256GB, Natural Titanium', priceModifier: 10000 },
                ]
            },
            emiPlans: {
                create: [
                    { months: 6, interestRate: 0 },
                    { months: 9, interestRate: 0 },
                    { months: 12, interestRate: 0 },
                    { months: 24, interestRate: 0 },
                ]
            }
        }
    });
    const product3 = await prisma.product.create({
        data: {
            name: 'Sony WH-1000XM5',
            description: 'Wireless Noise Canceling Headphones.',
            imageUrl: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=500&q=80',
            basePrice: 34990,
            variants: {
                create: [
                    { name: 'Black', priceModifier: 0 },
                    { name: 'Silver', priceModifier: 0 },
                ]
            },
            emiPlans: {
                create: [
                    { months: 3, interestRate: 0 },
                    { months: 6, interestRate: 0 },
                ]
            }
        }
    });
    console.log('Seeded products: ', [product1.name, product2.name, product3.name]);
    // Seed Home Page UI Data
    await prisma.brand.createMany({
        data: [
            { name: 'Croma', imageUrl: null },
            { name: 'Vijay Sales', imageUrl: null },
            { name: 'MakeMyTrip', imageUrl: null },
            { name: 'Air India', imageUrl: null },
        ]
    });
    await prisma.offer.create({
        data: {
            title: 'Book Your Euro-phoric Escape with 1Fi',
            tag: 'HOLIDAY VOUCHER DEAL',
            priceText: 'Starts at ₹2,481/mo',
            gradient: 'from-orange-500 to-pink-600'
        }
    });
    await prisma.feature.createMany({
        data: [
            { title: 'Keep growing', description: 'No tax, no exit load.', iconName: 'sparkles', iconColor: 'green' },
            { title: '0% interest', description: 'Repay only what you use.', iconName: 'percent', iconColor: 'purple' },
            { title: 'Quickest approval', description: 'Get approved in seconds.', iconName: 'sparkles', iconColor: 'blue' },
            { title: 'No hidden fees', description: 'Transparent pricing.', iconName: 'percent', iconColor: 'orange' },
        ]
    });
    console.log('Seeded Home Page UI elements.');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map