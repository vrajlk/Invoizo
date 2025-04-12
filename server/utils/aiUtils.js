exports.parseBillInput = (input) => {
    const lines = input.split('\n');
    let billName = '';
    let deliveryDate = '';
    let billNumber = '';
    let customer = '';
    const lineItems = [];
  
    for (const line of lines) {
      if (line.toLowerCase().includes('invoice') || line.toLowerCase().includes('bill')) {
        billName = line.trim();
      } else if (line.toLowerCase().includes('delivery') || line.toLowerCase().includes('date')) {
        const dateMatch = line.match(/\d{1,2}[/\-.]\d{1,2}[/\-.]\d{2,4}/);
        if (dateMatch) {
          const dateParts = dateMatch[0].split(/[/\-.]/);
          deliveryDate = `${dateParts[2]}-${dateParts[1].padStart(2, '0')}-${dateParts[0].padStart(2, '0')}`;
        }
      } else if (line.toLowerCase().includes('number') || line.toLowerCase().includes('#')) {
        const numberMatch = line.match(/\d+/);
        if (numberMatch) billNumber = numberMatch[0];
      } else if (line.toLowerCase().includes('customer') || line.toLowerCase().includes('client')) {
        const parts = line.split(':');
        if (parts.length > 1) customer = parts[1].trim();
      } else if (line.match(/\d+\s*x\s*[\d.]+/) || line.match(/qty|quantity|price/i)) {
        const itemMatch = line.match(/(.+?)(?:\s+(\d+)\s*x\s*\$?([\d.]+)|\s+(\d+)\s+\$?([\d.]+))/i);
        if (itemMatch) {
          const itemName = itemMatch[1]?.trim() || 'Item';
          const quantity = itemMatch[2] || itemMatch[4] || '1';
          const price = itemMatch[3] || itemMatch[5] || '0';
          lineItems.push({ itemName, quantity: Number.parseInt(quantity), price: Number.parseFloat(price) });
        }
      }
    }
  
    if (!billName) billName = 'Invoice #' + Math.floor(1000 + Math.random() * 9000);
    if (!deliveryDate) {
      const date = new Date();
      date.setDate(date.getDate() + 7);
      deliveryDate = date.toISOString().split('T')[0];
    }
    if (!billNumber) billNumber = Math.floor(1000 + Math.random() * 9000).toString();
    if (!customer) customer = 'Customer';
    if (lineItems.length === 0) {
      lineItems.push({ itemName: 'Product A', quantity: 2, price: 100 });
      lineItems.push({ itemName: 'Service B', quantity: 1, price: 150 });
    }
  
    return { name: billName, deliveryDate, number: billNumber, customer, lineItems };
  };