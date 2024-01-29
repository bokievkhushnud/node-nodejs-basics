const parseEnv = () => {
    // Write your code here
    const envVars = process.env;
    for (const key in envVars) {
        if (key.startsWith('RSS_')) {
            console.log(`${key}=${envVars[key]}`);
        }
    }
};

parseEnv();