const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/product');

// Helper function to get card type from card number
const getCardType = (cardNumber) => {
    const num = cardNumber.replace(/\s/g, '');
    if (num.startsWith('4')) return 'Visa';
    if (num.startsWith('5') || num.startsWith('2')) return 'Mastercard';
    if (num.startsWith('3')) return 'American Express';
    if (num.startsWith('6')) return 'Discover';
    return 'Unknown';
};

// Helper function to get payment method display name
const getPaymentMethodName = (method) => {
    const methods = {
        'card': 'Credit/Debit Card',
        'upi': 'UPI',
        'netbanking': 'Net Banking',
        'cod': 'Cash on Delivery'
    };
    return methods[method] || method;
};

//place an order
exports.placeOrder = async (req, res) => {
    try{
        
        const userId = req.user.id; // CHANGED FROM ._id to .id
        const { address, paymentMethod, cardDetails } = req.body;

        // Validate address fields
        const requiredFields = [
            'fullName', 'email', 'phone', 'addressLine1', 'city', 'state', 'postalCode', 'country'
        ];
        for (const field of requiredFields) {
            if (!address || !address[field]) {
                return res.status(400).json({ message: `Missing address field: ${field}` });
            }
        }

        // Validate payment method
        if (!paymentMethod) {
            return res.status(400).json({ message: 'Payment method is required' });
        }

        const validPaymentMethods = ['card', 'upi', 'netbanking', 'cod'];
        if (!validPaymentMethods.includes(paymentMethod)) {
            return res.status(400).json({ message: 'Invalid payment method' });
        }

        // Validate card details if card payment is selected
        if (paymentMethod === 'card') {
            if (!cardDetails || !cardDetails.cardNumber || !cardDetails.expiryDate || 
                !cardDetails.cvv || !cardDetails.cardName) {
                return res.status(400).json({ message: 'Card details are required for card payment' });
            }
        }

        const cart = await Cart.findOne({ user: userId }).populate('items.product'); 

        if(!cart || !cart.items || cart.items.length === 0){
            return res.status(400).json({ 
                message: 'Cart is empty. Please add items to your cart before placing an order.',
            });
        }
        const total = cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

        const orderData = {
            user: userId,
            items: cart.items.map(item => ({
                product: item.product._id,
                quantity: item.quantity,
            })),
            total,
            address,
            paymentMethod,
        };

        if (paymentMethod === 'card' && cardDetails) {
            const cardNumber = cardDetails.cardNumber.replace(/\s/g, '');
            orderData.cardInfo = {
                lastFourDigits: cardNumber.slice(-4),
                cardType: getCardType(cardNumber)
            };
        }

        if (paymentMethod === 'cod') {
            orderData.paymentStatus = 'pending'; 
        } else {
            orderData.paymentStatus = 'pending'; 
        }


        //create order
        const order = new Order(orderData);
        await order.save();
        for (const item of cart.items) {
            const product = await Product.findById(item.product._id);
            if (product) {
                product.stock = Math.max(0, product.stock - item.quantity); 
                await product.save();
            }
        }

        //clear cart
        cart.items = [];
        await cart.save();

        res.status(201).json({ 
            message: 'Order placed successfully', 
            order: {
                _id: order._id,
                total: order.total,
                paymentMethod: order.paymentMethod,
                status: order.status,
                createdAt: order.createdAt
            }
        });
    } catch (error) {
        console.error('Order placement error:', error);
        res.status(500).json({ message: 'Failed to place order', error: error.message });
    }
}

//get user's orders
exports.getOrders = async (req, res) => {
    try{
        const userId = req.user.id;
        const orders = await Order.find({ user: userId })
            .populate('items.product')
            .sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
    }
}

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('user')
            .populate('items.product')
            .sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch all orders', error: error.message });
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        
        const validStatuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        const order = await Order.findByIdAndUpdate(id, { status }, { new: true })
            .populate('items.product');
            
        if (!order) return res.status(404).json({ message: 'Order not found' });
        if (status === 'cancelled') {
            for (const item of order.items) {
                const product = await Product.findById(item.product._id);
                if (product) {
                    product.stock += item.quantity;
                    await product.save();
                }
            }
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update order status', error: error.message });
    }
};