export const expensesRefresh = function(item=null){

    return {
        type : "REFRESH",
        payload : item
    }
};

export const addExpense = function(item=null){

    return {
        type : "ADD_EXPENSE",
        payload : item
    }
};
