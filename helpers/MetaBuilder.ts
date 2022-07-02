export class MetaBuilder {
  private readonly _meta: Record<string, any>[] = [];

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
    this.addOg("og:image", image);
    this.add("twitter:image", image);
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
      "https://" + useRuntimeConfig().public.deployDomain + useRoute().fullPath
    );
    return this._meta;
  }
}
