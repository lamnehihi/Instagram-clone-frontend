export function add3Dots(string, limit) {
  var dots = "...";
  if(string) {
    if (string.length > limit) {
      // you can also use substr instead of substring
      string = string.substring(0, limit) + dots ;
    }
  }
  return string;
}