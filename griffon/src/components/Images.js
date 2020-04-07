const images = [
  { id: 1, src: "../../node_modules/cryptocurrency-icons/svg/color/btc.svg", title: 'BTC', description: 'bitcoin logo' },
  { id: 2, src: "../../node_modules/cryptocurrency-icons/svg/color/eth.svg", title: 'ETH', description: 'ethereum logo' },
  { id: 3, src: "../../node_modules/cryptocurrency-icons/svg/color/ltc.svg", title: 'LTC', description: 'litecoin logo' },
  { id: 4, src: "../../node_modules/cryptocurrency-icons/svg/color/dash.svg", title: 'DASH', description: 'dash logo' },
  { id: 5, src: "../../node_modules/cryptocurrency-icons/svg/color/usdt.svg", title: 'USDT', description: 'tether logo' }
];

function getImages () {
  return images;
}

export default getImages;