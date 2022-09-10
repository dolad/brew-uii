import axios, { AxiosError } from "axios";

type ServerError = {
    error: string;
}

type Data = {
    data: unknown
}

const BASE_URL = "https://api.openbrewerydb.org/breweries";
const PARAMS = "?per_page=5";

const baseServices = async (endpoint: string): Promise<Data | ServerError> => {
    try {
        const param = `${BASE_URL}${endpoint}`;
        console.log(param);
        return await axios.get<Data>(param);;
    } catch (error) {
        if(axios.isAxiosError(error)){
            const serverError = error as AxiosError<ServerError>;
            if (serverError && serverError.response) {
                return serverError.response.data
            }
        }
        return {error: "something went wrong!"}
    }
}

export const getAllBreweries = async () : Promise<Data | ServerError> => {
    return await baseServices(PARAMS)
}

export const getBreweriesByCities = async (city: string) : Promise<Data | ServerError> => {
    const param = `?by_city=${city}&per_page=10`
    const response = await baseServices(param)
    console.log(response);
    return response;
}

export const getBreweriesByName = async (name: string) : Promise<Data | ServerError> => {
    const param = `?by_name=${name}&per_page=10`
    return await baseServices(param)
}

export const getBreweriesByLatitude = async (lat: string, long: string) : Promise<Data | ServerError> => {
    const param = `?by_dist=${lat},${long}&per_page=10`
    return await baseServices(param)
}