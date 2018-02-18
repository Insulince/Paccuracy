export class PaccurateRequest {
  public readonly key: string = "J6R4eORMcZ2rhrIA0ybLRkDYekWJOTfb_Ix_qOgw4X4";

  public itemSets: Array<ItemSet> = [];
  public boxTypes: Array<BoxType> = [];
  public includeScripts?: boolean;
  public usableSpace?: number;

  // public eye: Coordinates  = new Coordinates(1, 1, 2);

  public constructor(itemSets: Array<ItemSet>, boxTypes: Array<BoxType>, includeScripts?: boolean, usableSpace?: number) {
    this.itemSets = itemSets;
    this.boxTypes = boxTypes;
    this.includeScripts = includeScripts || false;
    this.usableSpace = usableSpace || 1;
  }
}

export class ItemSet {
  public weight: number = 0;
  public dimensions: Coordinates;
  public quantity: number;
  public name: string;

  public constructor(weight: number, dimensions: Coordinates, quantity: number, name: string) {
    this.weight = weight;
    this.dimensions = dimensions;
    this.quantity = quantity;
    this.name = name;
  }
}

export class Coordinates {
  public x: number;
  public y: number;
  public z: number;

  public constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

export class BoxType {
  public weightMax: number = 0;
  public name: string;
  public dimensions: Coordinates;
  public weightTare: number;

  public constructor(weightMax: number, name: string, dimensions: Coordinates, weightTare: number) {
    this.weightMax = weightMax;
    this.name = name;
    this.dimensions = dimensions;
    this.weightTare = weightTare;
  }
}

export class PaccurateResponse {
  public boxes: Array<BoxWrapper> = [];
  public leftovers: Array<ItemWrapper> = [];
  public lenBoxes: number;
  public lenItems: number;
  public lenLeftovers: number;
  public svgs: Array<string> = [];
  public scripts: string;
  public styles: string;

  public constructor(boxes: Array<BoxWrapper>, leftovers: Array<ItemWrapper>, lenBoxes: number, lenItems: number, lenLeftovers: number, svgs: Array<string>, scripts?: string, styles?: string) {
    this.boxes = boxes;
    this.leftovers = leftovers;
    this.lenBoxes = lenBoxes;
    this.lenItems = lenItems;
    this.lenLeftovers = lenLeftovers;
    this.svgs = svgs;
    this.scripts = scripts || "";
    this.styles = styles || "";
  }
}

export class BoxWrapper {
  public box: Box;

  public constructor(box: Box) {
    this.box = box;
  }
}

export class Box {
  public dimensions: Coordinates;
  public id: number;
  public items: Array<ItemWrapper> = [];
  public name: string;
  public volumeMax: number;
  public volumeRemaining: number;
  public volumeUsed: number;
  public volumeUtilization: number;
  public weightMax: number;
  public weightNet: number;
  public weightRemaining: number;
  public weightUsed: number;
  public weightTare: number;
  public weightUtilization: number;

  public constructor(dimensions: Coordinates, id: number, items: Array<ItemWrapper>, name: string, volumeMax: number, volumeRemaining: number, volumeUsed: number, volumeUtilization: number, weightMax: number, weightNet: number, weightRemaining: number, weightUsed: number, weightTare: number, weightUtilization: number) {
    this.dimensions = dimensions;
    this.id = id;
    this.items = items;
    this.name = name;
    this.volumeMax = volumeMax;
    this.volumeRemaining = volumeRemaining;
    this.volumeUsed = volumeUsed;
    this.volumeUtilization = volumeUtilization;
    this.weightMax = weightMax;
    this.weightNet = weightNet;
    this.weightRemaining = weightRemaining;
    this.weightUsed = weightUsed;
    this.weightTare = weightTare;
    this.weightUtilization = weightUtilization;
  }
}

export class ItemWrapper {
  public item: Item;

  public constructor(item: Item) {
    this.item = item;
  }
}

export class Item {
  public color: string;
  public dimensions: Coordinates;
  public index: number;
  public message: string;
  public name: string;
  public origin: Coordinates;
  public refId: number;
  public weight: number;

  public constructor(color: string, dimensions: Coordinates, index: number, message: string, name: string, origin: Coordinates, refId: number, weight: number) {
    this.color = color;
    this.dimensions = dimensions;
    this.index = index;
    this.message = message;
    this.name = name;
    this.origin = origin;
    this.refId = refId;
    this.weight = weight;
  }
}

export class PaccurateResponseDataTable {
  public boxName?: string;
  public boxDim?: string;
  public volumeMax?: number;
  public volumeRemaining?: number;
  public volumeUsed?: number;
  public volumeUtilization?: number;
  public weightMax?: number;
  public weightRemaining?: number;
  public weightUsed?: number;
  public weightUtilization?: number;

  constructor(boxName?: string, boxDim?: string, volumeMax?: number, volumeRemaining?: number, volumeUsed?: number, volumeUtilization?: number, weightMax?: number, weightRemaining?: number, weightUsed?: number, weightUtilization?: number) {
    this.boxName = boxName;
    this.boxDim = boxDim;
    this.volumeMax = volumeMax;
    this.volumeRemaining = volumeRemaining;
    this.volumeUsed = volumeUsed;
    this.volumeUtilization = volumeUtilization;
    this.weightMax = weightMax;
    this.weightRemaining = weightRemaining;
    this.weightUsed = weightUsed;
    this.weightUtilization = weightUtilization;
  }
}

export class PaccurateLeftOverDataTable {
  public count?: number;
  public dimensions?: Coordinates;
  public message?: string;
  public name?: string;

  constructor(count?: number, dimensions?: Coordinates, message?: string, name?: string) {
    this.count = count;
    this.dimensions = dimensions;
    this.message = message;
    this.name = name;
  }
}
