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

let postId = "";
describe("Posts Tests", () => {
  
    test("Posts test get all", async () => {
        const response = await request(app).get("/api/post/all").set("Authorization", "Bearer " + testUser.token)
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(0);
    });


    test("Test Create Post", async () => {
        const response = await request(app)
          .post("/api/post/add")
          .set({ authorization: "Bearer " + testUser.token })
          .field("author", testUser.email)
          .field("startTime", new Date().toDateString())
          .field("endTime", new Date().toDateString())
          .field("workout", "Test Workout")
          .field("details", "Test Description")
          .attach("image", "src/tests/test.svg");
      
        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe("Post added successfully");
      });


    test("Get My Posts", async () => {
        const response = await request(app)
            .get("/api/post/my")
            .set("Authorization", "Bearer " + testUser.token);

        const parsedData = JSON.parse(response.text);
        const id = parsedData[0]._id;
        postId = id
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });


    test("Like a Post", async () => {
        const response = await request(app)
            .put("/api/post/like")
            .set("Authorization", "Bearer " + testUser.token)
            .send({ postId });

        expect(response.statusCode).toBe(201);
        expect(response.body.likes).toBe(1);
    });

    test("Get Post Comments", async () => {
        const response = await request(app)
            .get("/api/post/comments")
            .set("Authorization", "Bearer " + testUser.token)
            .query({ postId });

        const parsedData = JSON.parse(response.text);
        const comments = parsedData.comments;

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(comments)).toBe(true);
    });

    test("Add Comment to Post", async () => {
        const response = await request(app)
            .put("/api/post/comments")
            .set("Authorization", "Bearer " + testUser.token)
            .send({ postId, comment: "This is a test comment" });

            const parsedData = JSON.parse(response.text);
            const author = parsedData.comments[0].author;

        expect(response.statusCode).toBe(201);
        expect(author).toBe(testUser.email);
    });

    test("Get Post Comments 2", async () => {
        const response = await request(app)
            .get("/api/post/comments")
            .set("Authorization", "Bearer " + testUser.token)
            .query({ postId });

        const parsedData = JSON.parse(response.text);
        const comments = parsedData.comments;

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(comments)).toBe(true)
        expect(comments.length).toBe(1);
    });

    test("Delete Post", async () => {
        const response = await request(app)
            .delete("/api/post")
            .set("Authorization", "Bearer " + testUser.token)
            .query({ postId });

            const parsedData = JSON.parse(response.text);
            const deletedId = parsedData._id;

        expect(response.statusCode).toBe(200);
        expect(deletedId).toBe(postId);
    });
});