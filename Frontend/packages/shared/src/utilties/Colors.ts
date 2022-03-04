const componentToHex = (c: number): string => {
    const hex = c.toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
};

export class RGBA {
    public a: number;

    public r: number;

    public g: number;

    public b: number;

    constructor(r: number, g: number, b: number, a?: number) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a || 1;
    }

    public getRGB = (): { r: number; g: number; b: number } => ({
        r: this.r,
        g: this.g,
        b: this.b,
    });

    public setA = (a: number): RGBA => {
        this.a = a;
        return this;
    };

    public toHex = (): string => {
        return `#${componentToHex(this.r)}${componentToHex(
            this.g
        )}${componentToHex(this.b)}`;
    };

    public toRgbaString = (alpha?: number): string =>
        `rgba(${this.r}, ${this.g}, ${this.b}, ${alpha || this.a || 1})`;
}

export const rgba = (r: number, g: number, b: number, a?: number): RGBA =>
    new RGBA(r, g, b, a);

export default RGBA;
