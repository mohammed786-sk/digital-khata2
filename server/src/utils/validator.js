let message=null;

const validatorCustomer = (input) => {
    if(!input.customer_name||input.customer_name.length < 3){
        message = "You have inputted a invalid name";
        return message;
    }

    if(input.customer_name == 'Admin' || input.customer_name == 'admin'){
        message = "You cannot use admin as a customer name";
        return message;
    }
    if(!input.phone||input.phone.length !==10){
       message = "You have inputted a invalid phone number"
        return message;
    }
    return message;
}

module.exports = validatorCustomer;