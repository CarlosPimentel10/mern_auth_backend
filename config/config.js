const config = {
    env: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || "YOUR_SECRET_KEY",
    mongoUri: process.env.MONGODB_URI || process.env.MONGO_HOST ||
    'mongodb://' + (process.env.IP || 'localhost') + ':' + (process.env.MONGO_PORT || '27017') + '/mernSimpleDB'
}

export default config;