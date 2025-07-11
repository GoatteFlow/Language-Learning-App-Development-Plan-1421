import axios from 'axios';

class PaymentService {
  constructor() {
    this.apiKey = 'demo-key'; // In production, use environment variables
    this.baseURL = 'https://api.paddle.com/v1'; // Using Paddle as payment processor
  }

  async createCheckoutSession(priceId, userId, userEmail) {
    // Mock payment session creation
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      checkoutUrl: `https://checkout.paddle.com/checkout?product_id=${priceId}&customer_email=${userEmail}`,
      sessionId: `session_${Date.now()}`,
      success: true
    };
  }

  async verifyPayment(sessionId) {
    // Mock payment verification
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      status: 'completed',
      amount: 8.99,
      currency: 'USD',
      customerEmail: 'user@example.com',
      subscriptionId: `sub_${Date.now()}`
    };
  }

  async cancelSubscription(subscriptionId) {
    // Mock subscription cancellation
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      message: 'Subscription cancelled successfully'
    };
  }

  async getSubscriptionStatus(subscriptionId) {
    // Mock subscription status check
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      status: 'active',
      nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      plan: 'pro'
    };
  }

  // Demo payment simulation
  async simulatePayment(plan) {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return {
      success: true,
      transactionId: `txn_${Date.now()}`,
      plan: plan,
      amount: plan === 'pro' ? 8.99 : 12.99,
      message: 'Payment successful! Your subscription is now active.'
    };
  }
}

export default new PaymentService();