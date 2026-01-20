const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../public')));

// Serve images from the 'images' directory
app.use('/images', express.static(path.join(__dirname, '../images')));

// API Endpoint to get list of images
app.get('/api/images', (req, res) => {
    const imagesDir = path.join(__dirname, '../images');
    
    // Check if directory exists
    if (!fs.existsSync(imagesDir)) {
        return res.status(404).json({ error: 'Images directory not found' });
    }

    fs.readdir(imagesDir, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to list images' });
        }
        
        // Filter for image files
        const imageFiles = files.filter(file => 
            /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
        );
        
        res.json(imageFiles);
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
