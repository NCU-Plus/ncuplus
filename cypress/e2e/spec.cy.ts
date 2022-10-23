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

describe("courses page", () => {
  before(() => {
    cy.exec('pnpm -C "backend" seed:course')
    cy.exec('pnpm -C "backend" seed:department')
  })

  it("type 課名搜尋", () => {
    cy.visit("/courses");
    cy.wait(1000);
    cy.get("input:first").click().type("軟體工程實務").trigger("input");

    cy.get("tbody>tr>th").eq(1).should("have.text", "軟體工程實務");
  });

  it("type 課號搜尋", () => {
    cy.visit("/courses");
    cy.wait(1000);
    cy.get("input:first").click().type("SE6030*").trigger("input");

    cy.get("tbody>tr>th").eq(0).should("have.text", "111-上");
    cy.get("tbody>tr>th").eq(1).should("have.text", "軟體工程實務");
    cy.get("tbody>tr>th").eq(2).should("have.text", "梁德容, 王尉任, 鄭永斌");
    cy.get("tbody>tr>th").eq(3).should("have.text", "資訊工程學系");
  });

  it("type 老師搜尋", () => {
    cy.visit("/courses");
    cy.wait(1000);
    cy.get("input:first").click().type("梁德容").trigger("input");

    cy.get("tbody>tr>th").eq(2).invoke("text").should("contains", "梁德容");
  });
});
