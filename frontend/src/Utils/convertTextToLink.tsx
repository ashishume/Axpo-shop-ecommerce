/**
 * Replace the text with spaces to - and also handles (triple dash)--- cases to (single dash)-
 * and removes the / and replaces with (single dash) -
 */

export const newTitle = (productName: string) => {
  return productName.replace(/\s+/g, "-").replace(/\//g, "-").replace(/-+/g, "-");
};
