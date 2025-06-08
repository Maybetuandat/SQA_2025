// // test/unit/services/test.controller.test.js
// const chai = require("chai");
// const sinon = require("sinon");
// const request = require("supertest");
// const express = require("express");

// const testController = require("../../../src/controllers/test.controllers");
// const testServices = require("../../../src/services/test.service");

// const { expect } = chai;

// describe("Test Controller - Lấy Toàn Bộ Danh Sách Bài Thi", function () {
//   let app;
//   let sandbox;

//   before(function () {

//     // define server app for sandbox testing
//     app = express();
//     app.use(express.json());

//     app.get("/tests", async (req, res) => {
//       try {

//         var tests = await testServices.getAllTest();

//         if (tests.status === 200) {
//           const response = {
//             code: 1,
//             status: 200,
//             message: "successfully",
//             data: tests.data,
//           };
//           res.status(200).json(response);
//         } else if (tests.status === 500) {
//           const response = {
//             code: 0,
//             status: 500,
//             message: "Internal Server Error",
//           };
//           res.status(500).json(response);
//         } else {
//           const response = {
//             code: 0,
//             status: 404,
//             message: "Không tìm thấy bài thi",
//           };
//           res.status(404).json(response);
//         }
//       } catch (error) {
//         res.status(500).json({
//           code: 0,
//           status: 500,
//           message: "Internal Server Error",
//         });
//       }
//     });
//   });

//   beforeEach(function () {

//     sandbox = sinon.createSandbox();  // thuc hien tao sandbox cho qua trinh test
//   });

//   afterEach(function () {

//     sandbox.restore();  // thuuc hien khoi phuc ham goc sau khi stub vao sandbox
//   });

//   describe("Lấy toàn bộ danh sách bài thi", function () {
//     it("Nên trả về toàn bộ danh sách bài thi khi có dữ liệu", async function () {
//       // tao du lieu gia lap tra ve
//       const allTests = [
//         {
//           MaBaiThi: "BT001",
//           TenBaithi: "Bài thi Toán học cơ bản",
//           ThoiGianBatDau: "2024-01-15 08:00:00",
//           ThoiGianThi: 90,
//           SoLuongCau: 20,
//           TheLoai: "Trắc nghiệm",
//           TrangThai: "Mở",
//         },
//         {
//           MaBaiThi: "BT002",
//           TenBaithi: "Bài thi Vật lý cơ bản",
//           ThoiGianBatDau: "2024-01-16 08:00:00",
//           ThoiGianThi: 60,
//           SoLuongCau: 15,
//           TheLoai: "Trắc nghiệm",
//           TrangThai: "Đóng",
//         },
//         {
//           MaBaiThi: "BT003",
//           TenBaithi: "Bài thi Hóa học nâng cao",
//           ThoiGianBatDau: "2024-01-17 08:00:00",
//           ThoiGianThi: 120,
//           SoLuongCau: 25,
//           TheLoai: "Trắc nghiệm",
//           TrangThai: "Mở",
//         },
//       ];

//       // gia lap ham getAllTest() trong testServices
//       sandbox.stub(testServices, "getAllTest").resolves({
//         status: 200,
//         data: allTests,
//       });

//       const response = await request(app).get("/tests").expect(200);

//       expect(response.body).to.have.property("code", 1);
//       expect(response.body).to.have.property("status", 200);
//       expect(response.body).to.have.property("message", "successfully");
//       expect(response.body.data).to.be.an("array");

//       // Kiểm tra có đúng số lượng bài thi
//       expect(response.body.data).to.have.lengthOf(3);

//       // Kiểm tra dữ liệu bài thi đầu tiên
//       expect(response.body.data[0]).to.have.property("MaBaiThi", "BT001");
//       expect(response.body.data[0]).to.have.property("TenBaithi", "Bài thi Toán học cơ bản");

//       // Kiểm tra dữ liệu bài thi cuối cùng
//       expect(response.body.data[2]).to.have.property("MaBaiThi", "BT003");
//       expect(response.body.data[2]).to.have.property("TenBaithi", "Bài thi Hóa học nâng cao");

//       // Kiểm tra service getAllTest được gọi đúng 1 lần
//       expect(testServices.getAllTest.calledOnce).to.be.true;
//     });

//     it("Nên trả về thông báo khi không có bài thi nào trong hệ thống", async function () {
//       // Mock service trả về rỗng
//       sandbox.stub(testServices, "getAllTest").resolves({
//         status: 404,
//         data: [],
//       });

//       const response = await request(app).get("/tests").expect(404);

//       expect(response.body).to.have.property("code", 0);
//       expect(response.body).to.have.property("status", 404);
//       expect(response.body).to.have.property("message", "Không tìm thấy bài thi");
//     });

//     it("Nên xử lý lỗi database khi không thể lấy dữ liệu", async function () {
//       // Mock service trả về lỗi
//       sandbox.stub(testServices, "getAllTest").resolves({
//         status: 500,
//         data: null,
//       });

//       const response = await request(app).get("/tests").expect(500);

//       expect(response.body).to.have.property("code", 0);
//       expect(response.body).to.have.property("status", 500);
//       expect(response.body).to.have.property("message", "Internal Server Error");
//     });

//     it("Nên trả về toàn bộ bài thi bao gồm cả bài đóng và mở", async function () {
//       // Test lấy tất cả bài thi (không lọc theo trạng thái)
//       const allTestsWithDifferentStatus = [
//         {
//           MaBaiThi: "BT001",
//           TenBaithi: "Bài thi đang mở",
//           TrangThai: "Mở",
//         },
//         {
//           MaBaiThi: "BT002",
//           TenBaithi: "Bài thi đã đóng",
//           TrangThai: "Đóng",
//         },
//         {
//           MaBaiThi: "BT003",
//           TenBaithi: "Bài thi chưa mở",
//           TrangThai: "Chưa mở",
//         },
//       ];

//       sandbox.stub(testServices, "getAllTest").resolves({
//         status: 200,
//         data: allTestsWithDifferentStatus,
//       });

//       const response = await request(app).get("/tests").expect(200);

//       expect(response.body.data).to.have.lengthOf(3);

//       // Kiểm tra có cả bài thi mở và đóng
//       const statuses = response.body.data.map(test => test.TrangThai);
//       expect(statuses).to.include("Mở");
//       expect(statuses).to.include("Đóng");
//       expect(statuses).to.include("Chưa mở");
//     });

//     it("Nên trả về danh sách bài thi với đầy đủ thông tin", async function () {
//       const completeTestData = [
//         {
//           MaBaiThi: "BT001",
//           TenBaithi: "Bài thi đầy đủ thông tin",
//           ThoiGianBatDau: "2024-01-15 08:00:00",
//           ThoiGianThi: 90,
//           SoLuongCau: 20,
//           TheLoai: "Trắc nghiệm",
//           TrangThai: "Mở",
//           img_url: "https://example.com/test-image.jpg"
//         },
//       ];

//       sandbox.stub(testServices, "getAllTest").resolves({
//         status: 200,
//         data: completeTestData,
//       });

//       const response = await request(app).get("/tests").expect(200);

//       const test = response.body.data[0];

//       // Kiểm tra tất cả các trường thông tin
//       expect(test).to.have.property("MaBaiThi");
//       expect(test).to.have.property("TenBaithi");
//       expect(test).to.have.property("ThoiGianBatDau");
//       expect(test).to.have.property("ThoiGianThi");
//       expect(test).to.have.property("SoLuongCau");
//       expect(test).to.have.property("TheLoai");
//       expect(test).to.have.property("TrangThai");
//       expect(test).to.have.property("img_url");

//       // Kiểm tra kiểu dữ liệu
//       expect(test.MaBaiThi).to.be.a("string");
//       expect(test.TenBaithi).to.be.a("string");
//       expect(test.ThoiGianThi).to.be.a("number");
//       expect(test.SoLuongCau).to.be.a("number");
//     });

//     it("Nên lấy được danh sách lớn (nhiều bài thi)", async function () {
//       // Tạo danh sách 100 bài thi để test performance
//       const largeBatchTests = [];
//       for (let i = 1; i <= 100; i++) {
//         largeBatchTests.push({
//           MaBaiThi: `BT${i.toString().padStart(3, '0')}`,
//           TenBaithi: `Bài thi số ${i}`,
//           ThoiGianBatDau: "2024-01-15 08:00:00",
//           ThoiGianThi: 90,
//           SoLuongCau: 20,
//           TheLoai: "Trắc nghiệm",
//           TrangThai: i % 2 === 0 ? "Mở" : "Đóng",
//         });
//       }

//       sandbox.stub(testServices, "getAllTest").resolves({
//         status: 200,
//         data: largeBatchTests,
//       });

//       const response = await request(app).get("/tests").expect(200);

//       expect(response.body.data).to.have.lengthOf(100);
//       expect(response.body.data[0].MaBaiThi).to.equal("BT001");
//       expect(response.body.data[99].MaBaiThi).to.equal("BT100");
//     });
//   });

//   describe("Test service integration", function () {
//     it("Nên gọi service getAllTest() không có tham số", async function () {
//       const getAllTestStub = sandbox.stub(testServices, "getAllTest").resolves({
//         status: 200,
//         data: [],
//       });

//       await request(app).get("/tests");

//       // Kiểm tra service được gọi đúng cách
//       expect(getAllTestStub.calledOnce).to.be.true;
//       expect(getAllTestStub.calledWith()).to.be.true; // Không có tham số
//     });

//     it("Nên xử lý exception từ service", async function () {
//       // Mock service throw exception
//       sandbox.stub(testServices, "getAllTest").rejects(new Error("Database error"));

//       const response = await request(app).get("/tests").expect(500);

//       expect(response.body).to.have.property("code", 0);
//       expect(response.body).to.have.property("status", 500);
//       expect(response.body).to.have.property("message", "Internal Server Error");
//     });
//   });
// });
