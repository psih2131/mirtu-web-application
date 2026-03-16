export async function getCdekToken() {
    const cdecAccountId = useRuntimeConfig().cdecAccountId
    const cdecApiKey = useRuntimeConfig().cdecApiKey
    const cdecApiUrl = useRuntimeConfig().cdecApiUrl

    const body = new URLSearchParams({
        grant_type: 'client_credentials',
    }).toString()

    let cdecAuthRequest = await fetch(`${cdecApiUrl}/v2/oauth/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${Buffer.from(`${cdecAccountId}:${cdecApiKey}`).toString('base64')}`
        },
        body,
    })

    console.log({
        cdecAccountId,
        cdecApiKey,
        cdecApiUrl,
    })

    console.log(cdecAuthRequest)

    return {
        message: await cdecAuthRequest.json(),
    }
}