var db = require("../config/mysql-db");

exports.add = dataTrainEntity => {
  const {
    employeeId,
    employeeName,
    descriptions
  } = dataTrainEntity;

  const sql =
    "insert into `data_train`(`employee_id`, `employee_name`, `descriptions`)" +
    `values('${employeeId}', '${employeeName}', '${descriptions}');`;
  return db.save(sql);
};

exports.getAll = () => {
  var sql = `select * from data_train`;
  return db.load(sql);
};