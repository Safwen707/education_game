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

// Images are now inside public, so this explicit route is optional but good for safety if we wanted aliases.
// But we DO need to update the API path.

// API Endpoint to get list of images
app.get('/api/images', (req, res) => {
    // UPDATED PATH: Images are now inside public/images
    const imagesDir = path.join(__dirname, '../public/images');

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
