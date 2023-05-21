# JWT (JSON Web Token) Documentation

## Introduction
JSON Web Token (JWT) is an open standard for securely transmitting information between parties as a JSON object. It is commonly used for authentication and authorization purposes in web applications and APIs. JWTs consist of three parts: a header, a payload, and a signature. In this documentation, we will explore how JWT works and how to add metadata like roles to a JWT, focusing on the flow between the frontend and backend.

## JWT Flow: Frontend to Backend

The JWT flow between the frontend and backend typically involves the following steps:

1. **User Authentication**: The user provides their credentials (e.g., username and password) on the frontend (client-side) and sends a request to the backend (server-side) for authentication.

2. **Backend Authentication**: The backend verifies the user's credentials and generates a JWT. The JWT contains information about the user, such as their user ID and roles. The backend signs the JWT using a secret key that only the backend knows.

3. **JWT Issuance**: The backend sends the JWT back to the frontend as a response to the authentication request.

4. **Frontend Storage**: The frontend receives the JWT and stores it securely. Common storage options include browser storage mechanisms like `localStorage` or `sessionStorage`, or HTTP-only cookies.

5. **Subsequent Requests**: For each subsequent request that requires authentication, the frontend includes the JWT in the request headers. This allows the backend to identify and verify the user.

6. **Backend Verification**: The backend receives the request with the JWT in the headers. It verifies the signature of the JWT using the secret key it used during JWT generation. If the signature is valid, the backend knows that the JWT has not been tampered with.

7. **Access Control**: After verifying the JWT, the backend extracts the user information and performs any necessary access control checks based on the roles or other claims included in the JWT's payload. This ensures that the user has the required permissions to access the requested resources.

8. **Response**: The backend processes the request and sends the appropriate response back to the frontend.

## Diagram

Here's a diagram illustrating the flow between the frontend and backend when using JWT for authentication:

```
          +-----------------------+            +----------------------+
          |       Frontend        |            |       Backend        |
          +-----------------------+            +----------------------+
                      |                                   |
      1. User          |                                   |
         Authentication                                  |
          Request        |                                   |
          +------->+                                   |
                      |  2. Backend Authentication        |
                      |  +---------------------------->  |
                      |                                   |
                      |        3. JWT Issuance             |
                      |  <----------------------------+   |
                      |                                   |
                      |  4. Frontend Storage               |
                      |                                   |
                      |                                   |
      5. Subsequent    |                                   |
         Request        |                                   |
          +------->+                                   |
                      |                                   |
                      |  6. Backend Verification           |
                      |  +---------------------------->  |
                      |                                   |
                      |        7. Access Control           |
                      |                                   |
                      |                                   |
      8. Response      |                                   |
         Received      |                                   |
          <-------+|                                   |
                      |                                   |
```
