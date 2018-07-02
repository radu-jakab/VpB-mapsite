$(document).ready(function () {
    $('#example').DataTable({
        ajax: "/download/piste_datatable_1.0.json",
        columnDefs: [
            {"className": "dt-center", "targets": "_all"}
        ],
        paging: false,
    });
});
