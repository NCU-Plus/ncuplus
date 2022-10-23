describe("courses show page", () => {

  before(() => {
    cy.exec('pnpm -C "backend" seed:course');
    cy.exec('pnpm -C "backend" seed:department');
    cy.wait(100);
  })

  it("click 課程綱要", () => {
    cy.visit("/courses/1");
    cy.contains("課程綱要").should('have.attr', 'href', 'https://cis.ncu.edu.tw/Course/main/query/byKeywords?serialNo=1001&outline=1001&semester=1102')
  });

});
