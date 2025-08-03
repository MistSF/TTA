const apiKeyAuth = (req, res, next) => {
  const apiKey = req.get('X-API-KEY'); // Récupère la clé depuis l'en-tête

  if (!apiKey || apiKey !== process.env.API_KEY) {
    // Si la clé est manquante ou incorrecte
    return res.status(401).json({ message: 'Accès non autorisé' });
  }

  // Si la clé est valide, on passe à la suite
  next();
};

module.exports = apiKeyAuth;