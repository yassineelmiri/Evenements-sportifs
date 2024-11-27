const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../../app");

let mongoServerA;

beforeAll(async () => {
  mongoServerA = await MongoMemoryServer.create();
  const uri = mongoServerA.getUri();
  await mongoose.disconnect();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServerA.stop();
});

describe("Participant Controller", () => {
  it("should create a new participant", async () => {
    const res = await request(app)
      .post("/api/participants")
      .send({
        evenments: "15",
        participants: ["John Doe", "Jane Doe"],
      });

    expect(res.statusCode).toBe(500);
  });
  it("should retrieve all participants GET /api/participants", async () => {
    const res = await request(app).get("/api/participants");
    expect(res.statusCode).toBe(200);
  });
});