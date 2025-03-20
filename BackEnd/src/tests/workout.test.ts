import request from "supertest";
import {initApp} from "../server";
import mongoose from "mongoose";
import Post from "../db/models/postModel"; 
import { Express } from "express";
import User from "../db/models/userModel";

var app: Express;

interface IUser {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

type User = IUser & { token?: string };
const testUser: User = {
    email: "test@user.com",
    password: "testpassword",
    firstName: "Test",
    lastName: "User",
  }

  beforeAll(async () => {
    try {
      console.log("beforeAll");
      app = await initApp();
      await Post.deleteMany();
      await User.deleteMany();
  
      const registerRes = await request(app).post("/api/user/register").send(testUser);
      console.log("Register Response:", registerRes.body);
      const res = await request(app).post("/api/user/login").send(testUser);
      testUser.token = res.body.token;
      expect(testUser.token).toBeDefined();
    } catch (error) {
      console.error("Error in beforeAll:", error);
    }
  });

afterAll((done) => {
  console.log("afterAll");
  mongoose.connection.close();
  done();
});


describe("Workout Tests", () => {
     test("get my workout", async () => {
            const response = await request(app).get("/api/workout/my").set("Authorization", "Bearer " + testUser.token)
            expect(response.statusCode).toBe(200);
            expect(response.text).toBe('null');
    });
});