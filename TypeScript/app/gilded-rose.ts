export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    this.items.forEach(this.updateItem);

    return this.items;
  }

  updateItem(item: Item) {
    // "Sulfuras", being a legendary item, never has to be sold or decreases in Quality
    if (item.name === "Sulfuras, Hand of Ragnaros") {
      return;
    }

    // deltas for sellIn and quality
    let sellInDelta = -1, qualityDelta = -1;

    // "Aged Brie" actually increases in Quality the older it gets
    if (item.name === "Aged Brie") {
      qualityDelta = 1;
    }

    // "Backstage passes", like aged brie, increases in Quality as its SellIn value approaches
    if (item.name === "Backstage passes to a TAFKAL80ETC concert") {
      qualityDelta = 1;
      // Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but
      if (item.sellIn <= 10) {
        qualityDelta = 2;
      }
      if (item.sellIn <= 5) {
        qualityDelta = 3;
      }
    }

    // Once the sell by date has passed, Quality degrades twice as fast
    if (item.sellIn <= 0) { qualityDelta *= 2; }

    item.sellIn += sellInDelta;
    item.quality += qualityDelta;

    // The Quality of an item is never negative
    if (item.quality < 0) { item.quality = 0; }

    // The Quality of an item is never more than 50
    if (item.quality >= 50) { item.quality = 50; }

    // For backstage passes Quality drops to 0 after the concert
    if ((item.name === "Backstage passes to a TAFKAL80ETC concert") && (item.sellIn < 0)) {
      item.quality = 0;
    }
  }
}
