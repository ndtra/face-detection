var db = require("../config/mysql-db");

exports.add = dataCheckinEntity => {
  const {
    employeeId,
    employeeName
  } = dataCheckinEntity;

  const sql =
    "insert into `data_checkin`(`employee_id`, `employee_name`)" +
    `values('${employeeId}', '${employeeName}');`;
  return db.save(sql);
};

exports.getAll = () => {
  var sql = `select * from data_checkin`;
  return db.load(sql);
};