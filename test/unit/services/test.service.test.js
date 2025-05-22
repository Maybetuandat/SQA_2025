// // test/unit/services/test.service.test.js
// const { expect } = require("chai");
// const sinon = require("sinon");

// // Import service cần test
// const testServices = require("../../../src/services/test.service");
// const db = require("../../../src/models/index");

// describe("Test Service Unit Tests", () => {
//   // Setup và cleanup cho mỗi test
//   beforeEach(() => {
//     // Chạy trước mỗi test case
//   });

//   afterEach(() => {
//     // Chạy sau mỗi test case - cleanup các stub/mock
//     sinon.restore();
//   });

//   describe("getTestById()", () => {
//     it("Nên trả về bài thi khi ID hợp lệ", async () => {
//       // Arrange (Chuẩn bị)
//       const testId = 1;
//       const mockData = [
//         {
//           MaBaiThi: 1,
//           TenBaithi: "Test bài thi",
//           TrangThai: "Mở",
//         },
//       ];

//       // Tạo stub cho database
//       const findAllStub = sinon.stub(db.Test, "findAll").resolves(mockData);

//       // Act (Thực hiện)
//       const result = await testServices.getTestById(testId);
//       //console.log(result);

//       // Assert (Kiểm tra)
//       expect(result.status).to.equal(200);
//       expect(result.data).to.deep.equal(mockData);
//       expect(findAllStub.calledOnce).to.be.true;
//       expect(
//         findAllStub.calledWith({
//           raw: true,
//           where: { MaBaiThi: testId },
//         })
//       ).to.be.true;
//     });

//     it("Nên trả về 404 khi ID không tồn tại", async () => {
//       // Arrange
//       const testId = 999;



//       const findAllStub = sinon.stub(db.Test, "findAll").resolves([]);

//       // Act
//       const result = await testServices.getTestById(testId);

//       // Assert
//       expect(result.status).to.equal(404);
//       expect(findAllStub.calledOnce).to.be.true;
//     });

//     it("Nên xử lý lỗi database", async () => {
//       // Arrange
//       const testId = 1;
//       const findAllStub = sinon
//         .stub(db.Test, "findAll")
//         .rejects(new Error("Database error"));

//       // Act
//       const result = await testServices.getTestById(testId);

//       // Assert
//       expect(result.status).to.equal(500);
//     });
//   });
// });
