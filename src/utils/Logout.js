import { redirect } from "react-router-dom";

export function action(){
    localStorage.removeItem("token");
    localStorage.removeItem("userID");
    localStorage.removeItem("expiryDate");
    localStorage.removeItem('avatar');
    return redirect('/')
}

