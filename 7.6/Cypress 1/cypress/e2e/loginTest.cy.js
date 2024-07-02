describe("login process", () => {
  beforeEach(() => {
    cy.viewport(Cypress.env("viewportWidth"), Cypress.env("viewportHeight"));
    cy.visit("/");
  });

  it("logins successfully with correct credentials", () => {
    cy.login("bropet@mail.ru", "123");
    cy.contains("Добро пожаловать bropet@mail.ru").should("be.visible");
  });

  it("shows ERROR when login is not entered", () => {
    cy.login(null, "123");
    cy.get("#mail")
      .then((el) => el[0].checkValidity())
      .should("be.false");
    cy.get("#mail")
      .then((el) => el[0].validationMessage)
      .should("contain", "Заполните это поле.");
  });

  it("shows ERROR when password is not entered", () => {
    cy.login("bropet@mail.ru", null);
    cy.get("#pass")
      .then((el) => el[0].checkValidity())
      .should("be.false");
    cy.get("#pass")
      .then((el) => el[0].validationMessage)
      .should("contain", "Заполните это поле.");
  });

  it("shows logOut", () => {
    cy.login("bropet@mail.ru", "123");
    cy.contains("Добро пожаловать bropet@mail.ru").should("be.visible");
    cy.contains("Log out").click();
    cy.contains("Log in").should("be.visible");
  });
});