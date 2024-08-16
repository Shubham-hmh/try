const express = require('express');
const puppeteer = require('puppeteer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the 'public' folder
app.use(express.static('public'));

// API route to open the browser using Puppeteer
app.get('/open-browser', async (req, res) => {
  try {
    // Launch Puppeteer in non-headless mode
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // Navigate to a webpage
    await page.goto('https://example.com');

    // Take a screenshot to confirm browser actions
    await page.screenshot({ path: 'screenshot.png' });

    // Close the browser after 5 seconds (optional)
    setTimeout(async () => {
      await browser.close();
    }, 5000);

    // Respond to the frontend
    res.json({ message: 'Browser opened successfully!' });
  } catch (error) {
    console.error('Error opening browser:', error);
    res.status(500).json({ message: 'Failed to open browser', error });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
