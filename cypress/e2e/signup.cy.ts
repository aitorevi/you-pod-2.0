describe("POST", () => {
  it("should create a new user if the username is not taken", () => {
    cy.intercept("POST", "/api/users", {
      statusCode: 200,
      body: {
        username: "newUser",
        name: "John Doe",
        email: "john@example.com",
        role: "user",
        id: "randomUUID",
      },
    }).as("createUser");

    cy.visit("http://localhost:3000/signup");

    cy.get("#username-input").type("newUser");
    cy.get("#name-input").type("John Doe");
    cy.get("#email-input").type("john@example.com");
    cy.get("#password-input").type("password123");
    cy.get("#submit-button").click();

    cy.wait("@createUser").then((interception: any) => {
      expect(interception.response.statusCode).to.eq(200);
      expect(interception.response.body.username).to.eq("newUser");
      expect(interception.response.body.name).to.eq("John Doe");
      expect(interception.response.body.email).to.eq("john@example.com");
      expect(interception.response.body.role).to.eq("user");
      expect(interception.response.body.id).to.eq("randomUUID");
    });
  });

  it("should display an error message if the username is already taken", () => {
    cy.intercept("POST", "/api/users", {
      statusCode: 409,
      body: JSON.stringify({
        error: "Username already taken",
      }),
    }).as("createUser");

    cy.visit("http://localhost:3000/signup"); // Replace with the URL of the page containing the form

    cy.get("#username-input").type("existingUser");
    cy.get("#name-input").type("Jane Smith");
    cy.get("#email-input").type("jane@example.com");
    cy.get("#password-input").type("password456");
    cy.get("#submit-button").click();

    cy.wait("@createUser").then((interception: any) => {
      expect(interception.response.statusCode).to.eq(409);
      cy.get("#error-message")
        .should("be.visible")
        .and("contain.text", "Username already taken");
    });
  });
});
