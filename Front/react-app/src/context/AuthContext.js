import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE ={
    user:{
        _id:"6477d2696513adc015525f7a",
        username:"lorena",
        email:"chrisjijijigmail.com",
        password:"1278934",
        profilePicture:"https://s.yimg.com/ny/api/res/1.2/KSwY0mCb.k9.DaZpwcVFJA--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTQ4MA--/https://s.yimg.com/uu/api/res/1.2/1RpU8.IyT528H2qL0vO8Nw--~B/aD02MDA7dz04MDA7YXBwaWQ9eXRhY2h5b24-/http://l.yimg.com/os/275/2012/05/20/Arely-09-jpg_231552.jpg",
        coverPicture:"https://s.yimg.com/ny/api/res/1.2/KSwY0mCb.k9.DaZpwcVFJA--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTQ4MA--/https://s.yimg.com/uu/api/res/1.2/1RpU8.IyT528H2qL0vO8Nw--~B/aD02MDA7dz04MDA7YXBwaWQ9eXRhY2h5b24-/http://l.yimg.com/os/275/2012/05/20/Arely-09-jpg_231552.jpg",
        followers:[],
        followins:[],
    },
    isFetching:false,
    error:false
};

export const AuthContext = createContext(INITIAL_STATE);
export const AuthContextProvider =({children})=>{
    const [state,dispatch]= useReducer(AuthReducer,INITIAL_STATE);
    return (
        <AuthContext.Provider value={
            {
                user:state.user, 
                isFetching:state.isFetching, 
                error:state.error,
                dispatch
            }}
        >{children}</AuthContext.Provider>
    );
};