export function getColorCodes(color: number): [string, ...string[]] {
  switch (color) {
    case 0:
      return ["#cc5049"];
    case 1:
      return ["#d67722"];
    case 2:
      return ["#955cdb"];
    case 3:
      return ["#40a920"];
    case 4:
      return ["#309eba"];
    case 5:
      return ["#368ad1"];
    case 6:
      return ["#c7508b"];
    case 7:
      return ["#e15052", "#f9ae63"];
    case 8:
      return ["#e0802b", "#fac534"];
    case 9:
      return ["#a05ff3", "#f48fff"];
    case 10:
      return ["#27a910", "#a7dc57"];
    case 11:
      return ["#27acce", "#82e8d6"];
    case 12:
      return ["#3391d4", "#7dd3f0"];
    case 13:
      return ["#dd4371", "#ffbe9f"];
    case 14:
      return ["#247bed", "#f04856", "#ffffff"];
    case 15:
      return ["#d67722", "#1ea011", "#ffffff"];
    case 16:
      return ["#179e42", "#e84a3f", "#ffffff"];
    case 17:
      return ["#2894af", "#6fc456", "#ffffff"];
    case 18:
      return ["#0c9ab3", "#ffad95", "#ffe6b5"];
    case 19:
      return ["#7757d6", "#f79610", "#ffde8e"];
    case 20:
      return ["#1585cf", "#f2ab1d", "#ffffff"];
    default:
      return ["#368ad1"];
  }
}
