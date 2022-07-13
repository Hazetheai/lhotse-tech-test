/// <reference types="cypress" />

describe("Lhotse Technical Test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });
  it("Displays the supplier data", () => {
    cy.get("h1").should("have.text", "★ Volkswagenzentrum Berlin GmbH");
    cy.get('[data-cy="tags-general"] ul li').should("have.length.at.least", 3);
    cy.get('[data-cy="tags-certificates"] ul li').should(
      "have.length.at.least",
      2
    );
    cy.get('[data-cy="tags-portfolio"] ul').should("exist");
  });

  it("Allows deletion of tags except the first tag", () => {
    cy.get('[data-cy="tags-general"] ul li').should("have.length.at.least", 3);
    cy.get('[data-cy="tags-general"] button').first().should("not.be.visible");
    // cy.get('[data-cy="tags-general"] li').first().trigger("mouseover");
    cy.get('[data-cy="tags-general"] li button')
      .first()
      .should("be.hidden")
      .invoke("show")
      .click();

    cy.get('[data-cy="tags-general"] ul li').should("have.length", 2);

    cy.get('[data-cy="tags-general"] li  [data-cy="deleteTagButton"]').should(
      "not.exist"
    );
  });

  it("Can add new tags", () => {
    //   // TODO For each category
    cy.get('button[data-cy="addTagBtn"]').should("have.length", 3);
    cy.get('[data-cy="tags-general"] ul li').should("have.length", 3);
    cy.get('input[data-cy="general-input"]').should("not.exist");
    cy.get('button[data-cy="addTagBtn"]').first().click();
    cy.get('input[data-cy="general-input"]').should("be.visible");
    cy.get('input[data-cy="general-input"]').type("Sedan");
    cy.get('input[data-cy="general-input"]').type("{Enter}");
    cy.get('[data-cy="tags-general"] ul li').should("have.length", 4);
  });

  it("Only adds a single tag on pressing enter", () => {
    cy.get('[data-cy="tags-certificates"] ul li').should("have.length", 2);
    cy.get('button[data-cy="addTagBtn"]').eq(1).click();
    cy.get('input[data-cy="restricted-input"]').first().should("be.visible");
    cy.get('input[data-cy="restricted-input"]').first().type("V");
    cy.get('[data-cy="restricted-input-option"]')
      .first()
      .should("have.text", "Vegan");
    cy.get('[data-cy="restricted-input-option"]').first().type("{Enter}");
    cy.get('[data-cy="tags-certificates"] ul li').should("have.length", 3);
  });
  it("Adds a single tag and startes a new on when pressing Tab", () => {
    cy.get('[data-cy="tags-portfolio"] ul li').should("have.length", 1);
    cy.get('button[data-cy="addTagBtn"]').eq(2).click();
    cy.get('input[data-cy="restricted-input"]').first().should("be.visible");
    cy.get('input[data-cy="restricted-input"]').first().type("Europe");
    cy.get('[data-cy="restricted-input-option"]')
      .first()
      .should("have.text", "European");
    cy.get('[data-cy="restricted-input-option"]').first().click();
    cy.get('[data-cy="restricted-input"]').first().focus().tab();
    cy.get('[data-cy="tags-portfolio"] ul li').should("have.length", 3);
  });
});
