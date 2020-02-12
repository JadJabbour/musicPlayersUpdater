
/**
 * Mocked response list
 */
const responses  = [
    {
        "profile": {    
            "applications": [
                {
                    "applicationId": "music_app",
                    "version": "v1.4.10"
                },
                {
                    "applicationId": "diagnostic_app",
                    "version": "v1.2.6"
                },
                {
                    "applicationId": "settings_app",
                    "version": "v1.1.5"
                }
            ]
        }
    },
    {
        "statusCode": 401,
        "error": "Unauthorized",
        "message": "invalid clientId or token supplied"
    },
    {
        "statusCode": 404,
        "error": "Not Found",
        "message": "profile of client does not exist"
    },
    {
        "statusCode": 409,
        "error": "Conflict",
        "message": "child \"profile\" fails because [child \"applications\" fails because [\"applications\" is required]]"
    },
    {
        "statusCode": 500,
        "error": "Internal Server Error",
        "message": "An internal server error occurred"
    }
];

/**
 * 90% success rate 10% random error
 */
const randomizeResponse = (): any => Math.floor(Math.random() * 10) <= 9 ? responses[0] : responses[Math.floor(Math.random() * 4)];

/**
 * mock http fetch function
 * @param url url to mock call
 * @param opts mock request options
 */
const fetch = (url: string, opts: { method: string, body: any, headers: any }) => {
    return Promise.resolve({ json: () => randomizeResponse()})
}

export default fetch;