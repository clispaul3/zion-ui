import axios from "axios";
import { initReqInterceptor, initResInterceptor } from "./lib/interceptors";
import { addResBodyConfig } from "./lib/addResBodyConfig";
import { addInterceptor } from "./lib/addInterceptor";

const HttpRequest = axios.create({ timeout: 15000 }) as any

initReqInterceptor(HttpRequest)
initResInterceptor(HttpRequest)

HttpRequest.addResBodyConfig = addResBodyConfig.bind(HttpRequest)
HttpRequest.addInterceptor = addInterceptor.bind(HttpRequest)

export default HttpRequest


