const express = require('express');
const cors = require('cors');
const { querySPARQL } = require('./sparql');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Route للاستعلام
app.post('/api/search', async (req, res) => {
    const { keyword } = req.body;

    if (!keyword) return res.status(400).json({ error: 'Keyword is required' });

    try {
        const results = await querySPARQL(keyword);
        res.json(results);  // إرسال الـ QID مع الـ label و alias
    } catch (error) {
        console.error('SPARQL error:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
