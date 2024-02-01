import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import AnimationBackground from "~/components/AnimationBackground.vue";
import { describe, expect, it } from "vitest";

describe("AnimationBackground test", () => {
  it("should render the image", async () => {
    const img1 = "test-img1";
    const img2 = "test-img2";
    const wrapper = mount(AnimationBackground, {
      props: {
        backgroundImages: [img1, img2],
        duration: { enter: 10, leave: 10, stay: 10, transfer: 10 },
      },
    });
    const backgroundBlock = wrapper.find("div");
    expect(backgroundBlock.exists()).toBe(true);
    expect(backgroundBlock.attributes("style")).toContain(`url(${img1})`);
  });

  it("image should change after 35 ms", async () => {
    const img1 = "test-img1";
    const img2 = "test-img2";
    const wrapper = mount(AnimationBackground, {
      props: {
        backgroundImages: [img1, img2],
        duration: { enter: 100, leave: 100, stay: 100, transfer: 10 },
      },
    });
    const backgroundBlock = wrapper.find("div");
    expect(backgroundBlock.attributes("style")).toContain(`url(${img1})`);
    await new Promise((resolve) => setTimeout(resolve, 350));
    await nextTick();
    expect(backgroundBlock.attributes("style")).toContain(`url(${img2})`);
  });

  it("should emit image index when changing background", async () => {
    const img1 = "test-img1";
    const img2 = "test-img2";
    const wrapper = mount(AnimationBackground, {
      props: {
        backgroundImages: [img1, img2],
        duration: { enter: 100, leave: 100, stay: 100, transfer: 100 },
      },
    });
    await new Promise((resolve) => setTimeout(resolve, 350));
    await nextTick();
    expect(wrapper.emitted()).toHaveProperty("change");
    const changeEvent = wrapper.emitted("change") as number[];
    expect(changeEvent).toHaveLength(1);
    expect(changeEvent[0]).toEqual([1]);
  });
});
