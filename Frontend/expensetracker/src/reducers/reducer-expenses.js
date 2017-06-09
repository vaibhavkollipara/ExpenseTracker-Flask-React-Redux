export default function(state=null, action){

    switch(action.type){
        case "REFRESH":
            console.log("Data Refreshed...");
            return action.payload;
        default:
            return null;
    }
}

