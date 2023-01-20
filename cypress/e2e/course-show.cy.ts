describe("courses show page", () => {
  before(() => {
    cy.exec('pnpm -F "backend" seed:department:clear');
    cy.exec('pnpm -F "backend" seed:department');
    cy.exec('pnpm -F "backend" seed:course:clear');
    cy.exec('pnpm -F "backend" seed:course');
    cy.wait(100);
  });

  beforeEach(() => {
    cy.wait(1000);
    cy.visit("/courses/1");
    cy.wait(1000);
    Cypress.on("uncaught:exception", (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      return false;
    });
  });

  it("click 課程綱要", () => {
    cy.visit("/courses/1");
    cy.contains("課程綱要").should(
      "have.attr",
      "href",
      "https://cis.ncu.edu.tw/Course/main/query/byKeywords?serialNo=1001&outline=1001&semester=1102"
    );
  });

  it("case26: click 插入樣板課程心得 ", () => {
    //when
    cy.wait(1000);
    cy.contains("插入樣板課程心得").click();
    // cy.contains("插入樣板課程心得").trigger('click');
    cy.wait(5000);
    //then
    cy.get(".CodeMirror-line").its("length").should("eq", 12);
  });

  it("case34: click 我要上傳（第一次） ", () => {
    //when
    cy.get("#upload-pastexam-btn").click();
    //then
    cy.wait(1000);
    cy.get('input[type="file"]').should("be.visible");
  });

  it("case36: click 我要上傳（第二次） ", () => {
    //given
    cy.get("#upload-pastexam-btn").click();
    //when
    cy.get("#upload-pastexam-btn").click();
    cy.wait(1000);
    //then
    cy.get('input[type="file"]').should("not.be.visible");
  });
});
