import { last } from "cypress/types/lodash";

describe("class information", () => {
  before(() => {
    cy.exec('pnpm -F "backend" seed:course:clear');
    cy.exec('pnpm -F "backend" seed:course');
  });
  it("case24: type 留言板 & Shift+Enter(送出) ", () => {
    cy.login();
    cy.visit("/courses/1");
    cy.wait(1000);
    cy.get('textarea[placeholder="留言... (Shift + Enter來發送訊息)"]')
      .type("hello world")
      .type("{shift+enter}");
    cy.wait(1000);
    cy.get(".bg-gray-300.h-fit.min-h-full.rounded-xl.text-center")
      .last()
      .find(".flex.justify-between.items-center.w-full")
      .last()
      .find("p")
      .first()
      .should("have.text", "hello world");
  });
  it("case25: click 插入樣板課程心得 ", () => {
    cy.visit("/courses/1");
    cy.wait(1000);
    cy.contains("插入樣板課程心得").click();
    cy.wait(1000);
    cy.get(".CodeMirror-line").its("length").should("eq", 12);
  });
  it("case26: type 課程心得/討論 & 送出(已登入) ", () => {
    cy.login();
    cy.visit("/courses/1");
    cy.wait(1000);
    cy.get('pre[role="presentation"]').type("hello world");
    cy.wait(1000);
    cy.get(".flex.flex-col.pl-5.mb-4.border-l-4.border-green-400.space-y-2")
      .contains("送出")
      .click();
    cy.wait(1000);
    cy.get("article")
      .find("p")
      .last()
      .should("have.text", "hello world");
  });
  it("case27: 確認在未登入的情況是否能正常撰寫及送出課程心得 ", () => {
    cy.visit("/courses/1");
    cy.wait(1000);
    cy.get('pre[role="presentation"]').type("hello world");
    cy.wait(1000);
    cy.get(".flex.flex-col.pl-5.mb-4.border-l-4.border-green-400.space-y-2")
      .contains("送出")
      .click();
    cy.wait(1000);
    cy.wait(1000);
    cy.url().should("contain", "/login");
  });
  it("case28: hover 心得右下角 & click 三個點(已登入) ", () => {
    cy.login();
    cy.visit("/courses/1");
    cy.wait(1000);
    cy.get('pre[role="presentation"]').type("hello world");
    cy.wait(1000);
    cy.get(".flex.flex-col.pl-5.mb-4.border-l-4.border-green-400.space-y-2")
      .contains("送出")
      .click();
    cy.wait(1000);
    cy.get('div[class="flex flex-col pl-5 mb-4 border-l-4 border-green-400"]')
      .last()
      .trigger("mouseenter")
      .find("svg")
      .eq(2)
      .click();
    cy.get('div[class="flex flex-col pl-5 mb-4 border-l-4 border-green-400"]')
      .last()
      .find("#dropdown-menu")
      .find(".flex.flex-col")
      .should("have.text", "編輯刪除檢舉");
  });

  it("case29: hover 心得右下角 & click 三個點(未登入) ", () => {
    cy.visit("/courses/1");
    cy.wait(1000);
    cy.get('div[class="flex flex-col pl-5 mb-4 border-l-4 border-green-400"]')
      .last()
      .trigger("mouseenter")
      .find("svg")
      .eq(2)
      .click();
    cy.wait(2000);
    cy.contains("檢舉").should("have.text", "檢舉");
  });
  it("case30: click 編輯(送出) ", () => {
    cy.login();
    cy.visit("/courses/1");
    cy.wait(1000);
    cy.get('pre[role="presentation"]').type("hello world");
    cy.wait(1000);
    cy.get(".flex.flex-col.pl-5.mb-4.border-l-4.border-green-400.space-y-2")
      .contains("送出")
      .click();
    cy.wait(1000);
    cy.get('div[class="flex flex-col pl-5 mb-4 border-l-4 border-green-400"]')
      .last()
      .trigger("mouseenter")
      .find("svg")
      .eq(2)
      .click();
    cy.wait(300);
    cy.get('div[class="flex flex-col pl-5 mb-4 border-l-4 border-green-400"]')
      .last()
      .find("#dropdown-menu")
      .contains("編輯")
      .click();
    cy.wait(1000);
    cy.get('div[class="flex flex-col pl-5 mb-4 border-l-4 border-green-400"]')
      .last()
      .find(".CodeMirror-line")
      .type("hello again");
    cy.wait(300);
    cy.get('div[class="flex flex-col pl-5 mb-4 border-l-4 border-green-400"]')
      .last()
      .find(".flex.space-x-2")
      .find("button")
      .eq(1)
      .click();
    cy.wait(1000);
    cy.get('div[class="flex flex-col pl-5 mb-4 border-l-4 border-green-400"]')
      .last()
      .find("p")
      .last()
      .should("have.text", "hello worldhello again");
  });
  it("case31: click 編輯(取消) ", () => {
    cy.login();
    cy.visit("/courses/1");
    cy.wait(1000);
    cy.get('pre[role="presentation"]').type("hello world");
    cy.wait(1000);
    cy.get(".flex.flex-col.pl-5.mb-4.border-l-4.border-green-400.space-y-2")
      .contains("送出")
      .click();
    cy.wait(1000);
    cy.get("div[class='flex flex-col pl-5 mb-4 border-l-4 border-green-400']")
      .last()
      .trigger("mouseenter")
      .find("svg")
      .eq(2)
      .click();
    cy.wait(300);
    cy.get("div[class='flex flex-col pl-5 mb-4 border-l-4 border-green-400']")
      .last()
      .find("#dropdown-menu")
      .contains("編輯")
      .click();
    cy.wait(1000);
    cy.get("div[class='flex flex-col pl-5 mb-4 border-l-4 border-green-400']")
      .last()
      .find(".flex.space-x-2")
      .find("button")
      .first()
      .click();
    cy.wait(1000);
    cy.get("div[class='flex flex-col pl-5 mb-4 border-l-4 border-green-400']")
      .last()
      .find(".flex.space-x-2")
      .find("button")
      .first()
      .should("not.be.visible");
  });
  it("case32: click 我要上傳（第一次） ", () => {
    cy.visit("/courses/1");
    cy.wait(1000);
    cy.get("#upload-pastexam-btn").click();
    cy.wait(1000);
    cy.get('input[type="file"]').should("be.visible");
  });
  it("case33: click 我要上傳（第二次） ", () => {
    cy.visit("/courses/1");
    cy.wait(1000);
    cy.get("#upload-pastexam-btn").click();
    cy.get("#upload-pastexam-btn").click();
    cy.wait(1000);
    cy.get('input[type="file"]').should("not.be.visible");
  });
});
