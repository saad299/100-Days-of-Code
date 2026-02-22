import axios from 'axios'

const UNSPLASH_ACCESS_KEY = "";

export const fetchImages = async (query = "city", count = 6) => {
    const { imagesData } = await axios.get(`https://api.unsplash.com/photos/random?count=${count}&query=${query}&client_id=${UNSPLASH_ACCESS_KEY}`)
    return imagesData
}