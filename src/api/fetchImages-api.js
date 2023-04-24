import axios from 'axios';

 const fetchImagesWithQuery=async (imagesForSearch, currentPage) => {
   
    const BASE_URL = "https://pixabay.com/api/";
        const KEY = "34144660-7b9b8b2468352e1d4cb8415b4";
        
        let url = `${BASE_URL}?key=${KEY}&q=${imagesForSearch}
        &image_type=photo&orientation=horizontal&safesearch=true
        &page=${currentPage}&per_page=12`;
          
         const newImages  = await axios.get(url); 
        
         return newImages;         
     
    }
const API={fetchImagesWithQuery};
export default API;

 