const config = {
    env: {
        apiEndpoint: process.env.NEXT_PUBLIC_API_ENDPOINT!,
        prodApiEndpoint: process.env.NEXT_PUBLIC_PRODUCTION_API_ENDPOINT,
        imagekit: {
            urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
            publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_KEY!,
            privateKey: process.env.IMAGEKIT_PRIVATE_KEY!
        },
        databaseUrl: process.env.DATABASE_URL!,
        upstash: {
            redisUrl: process.env.UPSTASH_REDIS_REST_URL!,
            redisToken: process.env.UPSTASH_REDIS_REST_TOKEN!,
            qstashUrl: process.env.QSTASH_URL!,
            qstashToken: process.env.QSTASH_TOKEN!,
        },
        GMAIL_USER: process.env.GMAIL_USER!,
        GMAIL_PASS: process.env.GMAIL_PASS!,
    },
}



export default config