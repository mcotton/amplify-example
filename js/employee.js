
var EMPLOYEE = {
    create : function (firstName, lastName, role) {
       var employee = {
            firstName: firstName,
            lastName: lastName,
            role: role,
            dateEmployed: new Date()
       };
       amplify.publish('employee-created', employee );
       return employee;
    }
};
