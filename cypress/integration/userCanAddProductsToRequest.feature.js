describe("When products are visible", () => {
  before(() => {
    cy.server();
    cy.route({
      method: "GET",
      url: "**/products",
      response: "fixture:products.json",
    });
    cy.route({
      method: "POST",
      url: "**/tasks",
      response: "fixture:task_list_response.json",
    });
    cy.route({
      method: "PUT",
      url: "**/tasks/1",
      response: "fixture:task_list_update_response.json",
    });
    cy.login();
  });

  it("user can successfully add products", () => {
    cy.get("button").contains("Create your request").click();
    cy.get("#product-1").within(() => {
      cy.contains("Potatoes"); //product
      cy.contains("98"); //price
      cy.get("button").should("contain", "Add").click();
    });
    cy.get("#request-list").within(() => {
      cy.contains("Potatoes"); //product
    });
    cy.get("#product-2").within(() => {
      cy.contains("Shampoo"); //product
      cy.contains("130"); //price
      cy.get("button").should("contain", "Add").click();
    });
    cy.get("#request-list").within(() => {
      cy.contains("Potatoes"); //product
      cy.contains("Shampoo"); //product
      cy.get("button").should("contain", "Place Order").click();
    });
    cy.get("#success-message").should(
      "contain",
      "The product has been added to your request"
    );
  });
});
