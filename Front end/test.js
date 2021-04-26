const fetch = require("node-fetch")
// Requiring module
const assert = require('assert');

const {poolPromise} = require('./DBconnection');
const sql = require("mssql");



  
// We can group similar tests inside a describe block
describe("Backend Function Tests", () => {
  before(() => {
    console.log( "Speedie Bean Test Suite" );
  });
  
  after(() => {
    console.log( "All tests have been conducted!" );
  });
      
  // We can add nested blocks for different tests
  describe( "Backend Functional Testing", async () => {

    it("New Employee was inserted", async () => {
      await fetch("http://localhost:7071/api/AddEmployee", {
      method: "POST",
      body: JSON.stringify({
        email: "test email",
        password: "test password",
        phone: "test phone",
        location: "test location",
        role: "test role",
        name: "test name"
      }),});

      const pool = await poolPromise;
      const request = pool.request();
      var sqlString = "SELECT * FROM Employee WHERE Employee_Name = 'test name'";
      var query = await request.query(sqlString);



      assert.equal(query.recordset[0].Employee_Name, "test name");
    });

    it("Inventory was updated", async () => {
      const pool = await poolPromise;
      const request = pool.request();
      var sqlString1 = "SELECT * FROM Inventory WHERE Location = 'Miami'";
      var query1 = await request.query(sqlString1);
      var amt1 = query1.recordset[0].HalfGals
      await fetch("http://localhost:7071/api/AddInventory", {
      method: "POST",
      body: JSON.stringify({
        size: "HG",
        amount: 15,
        location: "Miami",
      }),});

      var query2 = await request.query(sqlString1);
      var amt2 = query2.recordset[0].HalfGals
      assert.equal(amt2 - amt1, 15);
    });

    it("Login was succesfull", async () => {
      const pool = await poolPromise;
      const request = pool.request();
      await fetch("http://localhost:7071/api/Login", {
      method: "POST",
      body: JSON.stringify({
        email: "test email",
        password: "test password",
      }),});
      var sqlString = "SELECT * FROM Employee WHERE Employee_Name = 'test name'";
      var query = await request.query(sqlString);
      var name = query.recordset[0].Employee_Name
      assert.equal(name, "test name");
    });

    it("Password was updated", async () => {
      const pool = await poolPromise;
      const request = pool.request();
      await fetch("http://localhost:7071/api/ForgotPassword", {
      method: "POST",
      body: JSON.stringify({
        email: "test email",
        password: "test new password",
      }),});
      var sqlString = "SELECT * FROM Employee WHERE Password = HASHBYTES('SHA2_256','test new password')";
      var query = await request.query(sqlString);
      var name = query.recordset[0].Employee_Name
      assert.equal(name, "test name");
    });



  });
});