const express = require('express');
const path = require('path');
const app = express();

// Servir les fichiers statiques
app.use(express.static(__dirname));

// Route pour l'index
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Démarrer le serveur
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`✅ Frontend Classic server running on http://localhost:${PORT}`);
}); 