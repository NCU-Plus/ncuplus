import type { RuntimeConfig } from "@nuxt/schema";
import type { RouteLocationNormalizedLoaded } from "vue-router";

export class MetaBuilder {
  private readonly _meta: Record<string, any>[] = [];
  private readonly _config: RuntimeConfig;
  private readonly _route: RouteLocationNormalizedLoaded;

  constructor() {
    this._config = useRuntimeConfig();
    this._route = useRoute();
  }

  public add(name: string, content: string) {
    this._meta.push({ name, content });
    return this;
  }

  public addOg(property: string, content: string) {
    this._meta.push({
      property,
      content,
    });
    return this;
  }

  public addDescription(description: string) {
    this.add("description", description);
    this.addOg("description", description);
    this.add("twitter:description", description);
    return this;
  }

  public addImage(image: any) {
    let imageUrl: string = image;
    if (!(image as string).startsWith("http"))
      imageUrl = "https://" + this._config.public.deployDomain + image;
    this.addOg("og:image", imageUrl);
    this.add("twitter:image", imageUrl);
    return this;
  }

  public addTitle(title: string) {
    this.addOg("og:title", title);
    this.add("twitter:title", title);
    return this;
  }

  public addTwitterCard(card: "summary" | "summary_large_image") {
    this.add("twitter:card", card);
    return this;
  }

  public build(): Record<string, any>[] {
    this.addOg(
      "og:url",
      "https://" + this._config.public.deployDomain + this._route.fullPath,
    );
    return this._meta;
  }
}
