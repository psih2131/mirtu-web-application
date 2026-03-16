//get auth token utils function
import { getCdekToken } from '../../utils/cdekAuth'

export default defineEventHandler(async (event) => {
    const COUNTRY_CODE = 'KZ'

    let cityList = <any>null
    
    let token = <null | string>null

    const tokenRequest = await getCdekToken() 

    if (tokenRequest?.message && tokenRequest.message.access_token) {
        token = tokenRequest.message.access_token
        
        console.log('token',token)

        cityList = await getCityList()
    }
    else{
        return sendError(event, createError({ statusCode: 401, message: 'Failed to get CDEK token' }))
    }

    //city list request function
    async function getCityList(){

        const cdecApiUrl = useRuntimeConfig().cdecApiUrl

        const query = getQuery(event)
        const name = (query.name as string) || ''
        try {
            const cityListRequest = await fetch(`${cdecApiUrl}/v2/location/suggest/cities?country_code=${COUNTRY_CODE}&name=${encodeURIComponent(name)}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })

            if (!cityListRequest.ok) {
                const errData = await cityListRequest.text()
                throw new Error(`CDEK API error ${cityListRequest.status}: ${errData}`)
            }
            return await cityListRequest.json()
        }
        catch(error){
            console.error('Error getting city list:', error)

            return {
                error
            }
        }
    }


    return {
        message: cityList
    }
 
})