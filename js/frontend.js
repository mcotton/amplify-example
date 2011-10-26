

var employeeModal = $('#add-employee-modal').modal({ backdrop: 'static' });
var employeeTable = TABLE.create($('#employee-table'));
var employeeStore = amplify.store('employees') || [];


function loadFromStorage(lStore)  {
    if(lStore.length > 0)  {
        for(var i = 0; i < lStore.length; i++)  {
            employeeTable.add([lStore[i].firstName, lStore[i].lastName, lStore[i].role, lStore[i].dateEmployed]);
        };
        newAlert('success', 'Previous Employee Data Loaded');
    };
};

function newAlert (type, message) {
    $('#alert-area').append($('<div class="alert-message ' + type + ' fade in" data-alert><p> ' + message + ' </p></div>')); 
    setTimeout(function () {
        $('.alert-message').fadeOut('slow', function () { this.parentNode.removeChild(this); });
    }, 2000);
};


$(document).ready(function() {
    
    loadFromStorage(employeeStore);

    $('#create-employee').click(function () {
        var form = $('#employee-form');
        employeeModal.modal('hide');
        EMPLOYEE.create(
            form.find('[name=firstName]').val(),
            form.find('[name=lastName]').val(),
            form.find('[name=role]').val()
        );
        form.find('input').val('');
    });
    
    
    amplify.subscribe('employee-created', function (employee) {
      employeeTable.add([employee.firstName, employee.lastName, employee.role, employee.dateEmployed]);
      newAlert('success', 'New Employee Added');
    });
    
    amplify.subscribe('employee-created', function (employee) {
        employeeStore.push(employee);
        amplify.store('employees', employeeStore);
    });
 
 
});