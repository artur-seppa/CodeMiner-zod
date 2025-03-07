// import { beforeEach, afterAll, beforeAll, describe, it, expect } from 'vitest';
// import { makeServer } from "../src/http/ser";
// import { makeDatabase } from "../src/infra/database.js";
// import {UserModel} from "../src/infra/database/models/userModel.js";

// describe('Integration - Create Users', () => {
//     let server;
//     const database = makeDatabase();

//     beforeAll(async () => {
//         await database.connect();
//         server = makeServer();
//         await server.listen({ port: config.http.port });
//     });

//     beforeEach(async () => {
//         await UserModel.query().delete();
//     });

//     afterAll(async () => {
//         await UserModel.query().delete();
//         await server.close();
//         await database.disconnect();
//     });

//     describe('POST /users', () => {
//         it('should create a new user with valid data', async () => {
//             const validUser = {
//                 username: 'testuser123',
//                 email: 'test@example.com',
//                 birthDate: '2000-01-01'
//             };

//             const response = await server.inject({
//                 method: 'POST',
//                 url: '/users',
//                 payload: validUser
//             });

//             expect(response.statusCode).toBe(201);
//             const createdUser = JSON.parse(response.payload);
//             expect(createdUser).toMatchObject({
//                 username: validUser.username,
//                 email: validUser.email
//             });
//             expect(new Date(createdUser.birthDate)).toBeInstanceOf(Date);
//         });

//         it('should return 400 for invalid username', async () => {
//             const invalidUser = {
//                 username: 'a',
//                 email: 'test@example.com',
//                 birthDate: '2000-01-01'
//             };

//             const response = await server.inject({
//                 method: 'POST',
//                 url: '/users',
//                 payload: invalidUser
//             });

//             expect(response.statusCode).toBe(400);
//             const error = JSON.parse(response.payload);
//             expect(error.message).toBe('Validation failed');
//             expect(error.details.username._errors).toContain('Username must be at least 3 characters');
//         });

//         it('should return 400 for invalid email', async () => {
//             const invalidUser = {
//                 username: 'testuser123',
//                 email: 'invalid-email',
//                 birthDate: '2000-01-01'
//             };

//             const response = await server.inject({
//                 method: 'POST',
//                 url: '/users',
//                 payload: invalidUser
//             });

//             expect(response.statusCode).toBe(400);
//             const error = JSON.parse(response.payload);
//             expect(error.message).toBe('Validation failed');
//             expect(error.details.email._errors).toContain('Invalid email format');
//         });

//         it('should return 400 for invalid birth date', async () => {
//             const invalidUser = {
//                 username: 'testuser123',
//                 email: 'test@example.com',
//                 birthDate: '2020-01-01' // muito recente
//             };

//             const response = await server.inject({
//                 method: 'POST',
//                 url: '/users',
//                 payload: invalidUser
//             });

//             expect(response.statusCode).toBe(400);
//             const error = JSON.parse(response.payload);
//             expect(error.message).toBe('Validation failed');
//             expect(error.details.birthDate._errors).toContain('Invalid date format or out of range');
//         });

//         it('should persist user in database', async () => {
//             const validUser = {
//                 username: 'testuser123',
//                 email: 'test@example.com',
//                 birthDate: '2000-01-01'
//             };

//             const response = await server.inject({
//                 method: 'POST',
//                 url: '/users',
//                 payload: validUser
//             });

//             expect(response.statusCode).toBe(201);

//             // Verifica se o usuário foi realmente persistido
//             const savedUser = await UserModel.query()
//                 .where('email', validUser.email)
//                 .first();

//             expect(savedUser).not.toBeNull();
//             expect(savedUser.username).toBe(validUser.username);
//             expect(savedUser.email).toBe(validUser.email);
//             expect(new Date(savedUser.birthDate)).toBeInstanceOf(Date);
//         });

//         it('should handle database errors gracefully', async () => {
//             // Primeiro, cria um usuário
//             const user = {
//                 username: 'testuser123',
//                 email: 'test@example.com',
//                 birthDate: '2000-01-01'
//             };

//             await server.inject({
//                 method: 'POST',
//                 url: '/users',
//                 payload: user
//             });

//             // Tenta criar outro usuário com o mesmo email (assumindo que email é único)
//             const response = await server.inject({
//                 method: 'POST',
//                 url: '/users',
//                 payload: user
//             });

//             expect(response.statusCode).toBe(400);
//             const error = JSON.parse(response.payload);
//             expect(error.message).toBe('Failed to create user');
//         });
//     });
// });