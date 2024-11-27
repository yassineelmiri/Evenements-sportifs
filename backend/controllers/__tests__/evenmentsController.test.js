const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../../app");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.disconnect(); 
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("Evenments Controller", () => {
  it("should create a new event successfully", async () => {
    const res = await request(app).post("/api/evenments").send({
       title: "Test Event",
       places: "2024",
      stade: "This is a test event.",
    });
    expect(res.statusCode).toBe(401);
  });

  it("should return 400 if required fields are missing", async () => {
    const res = await request(app).post("/api/evenments").send({});
    expect(res.statusCode).toBe(401);
  });
});