import axios from "axios";

const Instance= axios.create({
    baseURL: "https://localhost:7118"
})

export default  Instance ;