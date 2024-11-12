import { Item, GildedRose } from '@/gilded-rose';

const testItem = (item: Item, expected: [number, number][]) => {
  const gildedRose = new GildedRose([item]);
  expected.forEach(([sellIn, quality]) => {
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toEqual(sellIn);
    expect(items[0].quality).toEqual(quality);
  });
}

describe('Gilded Rose', () => {
  it('should foo', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('foo');
  });

  it('normal items should behave normally 2', () => {
    testItem(new Item('elixir', 4, 3), [[3, 2], [2, 1], [1, 0], [0, 0], [-1, 0]]);
  });

  it('after sell by date quality degrades twice as fast', () => {
    testItem(new Item('elixir', 2, 10), [[1, 9], [0, 8], [-1, 6], [-2, 4]]);
  });

  it('aged brie', () => {
    testItem(new Item('Aged Brie', 4, 47), [[3, 48], [2, 49], [1, 50], [0, 50], [-1, 50]]);
  });

  it('Sulfuras', () => {
    testItem(new Item('Sulfuras, Hand of Ragnaros', 4, 47), [[4, 47], [4, 47], [4, 47]]);
  });

  it('Backstage passes', () => {
    testItem(new Item('Backstage passes to a TAFKAL80ETC concert', 12, 0), [
      [11, 1],
      [10, 2],
      [9, 4],
      [8, 6],
      [7, 8],
      [6, 10],
      [5, 12],
      [4, 15],
      [3, 18],
      [2, 21],
      [1, 24],
      [0, 27],
      [-1, 0],
      [-2, 0],
    ]);
  });
});
