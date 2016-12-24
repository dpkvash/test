
var GDATA = "";
function getEmployee() {
    $.get('Emp/GetEmployee', null, function (data) { chkGetEmployee(data); });
}
function chkGetEmployee(abc) {
    GDATA = abc;
    grid(GDATA, 0);
}
function grid(abc, eid) {
    var tab = "<table>";
    tab += "<tr>";
    tab += "<td style='width:100px;background-color:silver;'>Emp Id</td>";
    tab += "<td style='width:100px;background-color:silver;'>Emp Name</td>";
    tab += "<td style='width:100px;background-color:silver;'>Emp Salary</td>";
    tab += "<td style='width:100px;background-color:silver;'>Updation</td>";
    tab += "<td style='width:100px;background-color:silver;'>Operation</td>";
    tab += "</tr>";
    for (var it in abc) {
        tab += "<tr>";

        tab += "<td style='width:100px;background-color:silver;'>" + abc[it].EmpId + "</td>";

        if (abc[it].EmpId != eid) {
            tab += "<td style='width:100px;background-color:silver;'>" + abc[it].EmpName + "</td>";
            tab += "<td style='width:100px;background-color:silver;'>" + abc[it].EmpSalary + "</td>";
            tab += "<td style='width:100px;background-color:silver;'>"
            + "<input onclick='EditEmployee(" + abc[it].EmpId + ")' id='btnEdit' type=button value='Edit' /></td>";
        }
        else {
            tab += "<td style='width:100px;background-color:silver;'>"
                + "<input id='txtEditEmpName' type='text' value='" + abc[it].EmpName + "' /></td>";
            tab += "<td style='width:100px;background-color:silver;'>"
                + "<input id='txtEditEmpSalary' type='text' value='" + abc[it].EmpSalary + "' /></td>";
            tab += "<td style='width:100px;background-color:silver;'>"
            + "<input onclick='UpdateEmployee(" + abc[it].EmpId + ")' id='btnUpdate' type=button value='Update' />"
            + "<input onclick='CancelEmployee()' id='btnCancel' type=button value='Cancel' /></td>";

        }

        tab += "<td style='width:100px;background-color:silver;'>"
            + "<input onclick='DeleteEmployee(" + abc[it].EmpId + ")' id='btnDelete' type=button value='Delete' /></td>";


        tab += "</tr>";
    }
    tab += "<tr>";
    tab += "<td style='width:100px;background-color:silver;'>"
        + "<input id='txtEmpId' type='text' /></td>";
    tab += "<td style='width:100px;background-color:silver;'>"
        + "<input id='txtEmpName' type='text' /></td>";
    tab += "<td style='width:100px;background-color:silver;'>"
        + "<input id='txtEmpSalary' type='text' /></td>";
    tab += "<td style='width:100px;background-color:silver;'>"
      + "</td>";
    tab += "<td style='width:100px;background-color:silver;'>"
        + "<input onclick='AddEmployee()' id='btnSave' type=button value='Save' /></td>";

    tab += "</tr>";
    tab += "</table>";
    $('#d1').html(tab);
}

function EditEmployee(eid) {
    grid(GDATA, eid);
}
function CancelEmployee() {
    grid(GDATA, 0);
}

function UpdateEmployee(eid) {
    var empName = $('#txtEditEmpName').val();
    var empSalary = $('#txtEditEmpSalary').val();
    $.post('Emp/UpdateEmployee',
        { EmpId: eid, EmpName: empName, EmpSalary: empSalary },
        function (data) { chkUpdateEmployee(data); });
}
function chkUpdateEmployee(abc) {
    alert(abc);
    getEmployee();
}


//Coding For Add Record.
function AddEmployee() {
    var empId = $('#txtEmpId').val();
    var empName = $('#txtEmpName').val();
    var empSalary = $('#txtEmpSalary').val();
    $.post('Emp/AddEmployee',
        { EmpId: empId, EmpName: empName, EmpSalary: empSalary },
        function (data) { chkAddEmployee(data); });
}
function chkAddEmployee(abc) {
    alert(abc);
    getEmployee();
}

function DeleteEmployee(eid) {
    if (!confirm('Do you want to Delete.')) {
        return;
    }
    $.post('Emp/DeleteEmployee',
        { EmpId: eid },
        function (data) { chkDeleteEmployee(data); });
}
function chkDeleteEmployee(abc) {
    alert(abc);
    getEmployee();
}