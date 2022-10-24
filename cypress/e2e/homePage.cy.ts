describe("home page", () => {
  it("click NCU+", () => {
    cy.visit("/");
    cy.contains("NCU+").click();

    cy.url().should("eq", `${Cypress.config().baseUrl}/`);
  });

  it("click 登入", () => {
    cy.visit("/");
    cy.contains("登入").click();

    cy.url().should("contain", "/login");
  });

  it("click Features 大量選課心得", () => {
    cy.visit("/");
    cy.contains("大量選課心得").click();

    cy.url().should("contain", "/courses");
  });

  it("cover background image change", () => {
    cy.visit("/");
    const prev = cy.get(".bg-cover").invoke("attr", "style");
    cy.wait(10000);

    expect(cy.get(".bg-cover").invoke("attr", "style")).to.not.eq(prev);
  });

  it("hover 全校課程", () => {
    cy.visit("/");
    cy.wait(800);
    cy.get("#dropdown").trigger("mouseenter");
    cy.wait(100);

    cy.get("#全校課程").should("be.visible");
    cy.get("#心得總覽").should("be.visible");
    cy.get("#模擬排課").should("be.visible");
  });

  it("click 全校課程 in dropdown", () => {
    cy.visit("/");
    cy.wait(800);
    cy.get("#dropdown").trigger("mouseenter");
    cy.wait(100);
    cy.get("#全校課程").click();

    cy.url().should("contain", "/courses");
  });

  it("click 心得總覽 in dropdown", () => {
    cy.visit("/");
    cy.wait(800);
    cy.get("#dropdown").trigger("mouseenter");
    cy.wait(100);
    cy.get("#心得總覽").click();

    cy.url().should("contain", "/reviews");
  });

  it("click 模擬排課 in dropdown", () => {
    cy.visit("/");
    cy.wait(800);
    cy.get("#dropdown").trigger("mouseenter");
    cy.wait(100);
    cy.get("#模擬排課").click();

    cy.url().should("contain", "/courses/simulation");
  });
});
