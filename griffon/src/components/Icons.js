const icons = [
  { id: 1, src: "../../node_modules/cryptocurrency-icons/svg/icon/btc.svg", title: 'BTC', description: 'bitcoin icon' },
  { id: 2, src: "../../node_modules/cryptocurrency-icons/svg/icon/eth.svg", title: 'ETH', description: 'ethereum icon' },
  { id: 3, src: "../../node_modules/cryptocurrency-icons/svg/icon/ltc.svg", title: 'LTC', description: 'litecoin icon' },
  { id: 4, src: "../../node_modules/cryptocurrency-icons/svg/icon/dash.svg", title: 'DASH', description: 'dash icon' },
  { id: 5, src: "../../node_modules/cryptocurrency-icons/svg/icon/usdt.svg", title: 'USDT', description: 'tether icon' }
];


// { this.state.images.map(({id, src, title, description}) => <img key={id} src={src} title={title} alt={description} />) }

function getIcons () {
  return icons;
}

export default getIcons;