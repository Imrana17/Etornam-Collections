// ============================================
// CART SYSTEM - Etornam's Collections
// ============================================

class Cart {
  constructor() {
    this.items = JSON.parse(localStorage.getItem('etornamCart')) || [];
  }

  addItem(productId, quantity = 1) {
    const existing = this.items.find(item => item.id === productId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      const product = products.find(p => p.id === productId);
      if (product) {
        this.items.push({ 
          ...product, 
          quantity: quantity 
        });
      }
    }
    this.save();
  }

  removeItem(productId) {
    this.items = this.items.filter(item => item.id !== productId);
    this.save();
  }

  updateQuantity(productId, quantity) {
    const item = this.items.find(item => item.id === productId);
    if (item) {
      if (quantity <= 0) {
        this.removeItem(productId);
      } else {
        item.quantity = quantity;
        this.save();
      }
    }
  }

  getTotal() {
    return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  getTotalItems() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  clear() {
    this.items = [];
    this.save();
  }

  save() {
    localStorage.setItem('etornamCart', JSON.stringify(this.items));
  }

  getWhatsAppMessage() {
    if (this.items.length === 0) return '';

    let message = "Hello, my products I want to buy from 'Etornam's Collections' are:\n\n";
    
    this.items.forEach(item => {
      message += `• ${item.name} - Quantity: ${item.quantity} - Price: ${item.price} cedis\n`;
    });
    
    message += `\nTotal: ${this.getTotal()} cedis\n`;
    message += "Delivery will be priced by the customer and agent based on location.";
    
    return encodeURIComponent(message);
  }
}