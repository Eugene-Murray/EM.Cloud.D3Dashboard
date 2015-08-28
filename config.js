var config = {}

config.host = process.env.HOST || "https://em-cloud.documents.azure.com:443/";
config.authKey = process.env.AUTH_KEY || "Px8s2c2IZdkcbJuaO+bT9UjdgHWPBN6pKTUwFvB7+1AIeihG6YIaeu5TU6x7edh9ez5sTVumRVancgSlqKFPtg==";
config.databaseId = "AllSites";
config.collectionId = "D3Dashboard";

module.exports = config;