//-----coin Logos-------
import ethLogo from "../../../node_modules/cryptocurrency-icons/svg/color/eth.svg";
import dashLogo from "../../../node_modules/cryptocurrency-icons/svg/color/dash.svg";
import liteLogo from "../../../node_modules/cryptocurrency-icons/svg/color/ltc.svg";
import bitcoinLogo from "../../../node_modules/cryptocurrency-icons/svg/color/btc.svg";
import tetherLogo from "../../../node_modules/cryptocurrency-icons/svg/color/usdt.svg";

import bitcoinCashLogo from "../../../node_modules/cryptocurrency-icons/svg/color/bch.svg";
import etcLogo from "../../../node_modules/cryptocurrency-icons/svg/color/etc.svg";
import repLogo from "../../../node_modules/cryptocurrency-icons/svg/color/rep.svg";
import xrpLogo from "../../../node_modules/cryptocurrency-icons/svg/color/xrp.svg";
import Ox from "../../../node_modules/cryptocurrency-icons/svg/color/zrx.svg";
import ZcashLogo from "../../../node_modules/cryptocurrency-icons/svg/color/zec.svg";
import daiLogo from "../../../node_modules/cryptocurrency-icons/svg/color/dai.svg";
import kncLogo from "../../../node_modules/cryptocurrency-icons/svg/color/knc.svg";
import atomLogo from "../../../node_modules/cryptocurrency-icons/svg/color/atom.svg";
import EOS from "../../../node_modules/cryptocurrency-icons/svg/color/eos.svg";
import LINK from "../../../node_modules/cryptocurrency-icons/svg/color/link.svg";


//contains the logos for each coin as an array. If you wish to access it from another file then just use "{Logos[i].logo}" component where i is the index of the logo you want to refer to
export default[
    {
        logo: bitcoinLogo
    },
    {
        logo:ethLogo
    },
    {
        logo:liteLogo
    },
    {
        logo:dashLogo
    },  
    {
        logo:tetherLogo
    }

]

// returns the icon based on currency symbol passed
export function getIcon(coin_symbol) {
    switch(coin_symbol) {
        case "BTC":
            return bitcoinLogo;
        case "ETH":
            return ethLogo;
        case "USDT":
            return tetherLogo;
        case "LTC":
            return liteLogo;
        case "DASH":
            return dashLogo;
        case "BCH":
            return bitcoinCashLogo;
        case "ETC":
            return etcLogo;
        case "REP":
            return repLogo;
        case "XRP":
            return xrpLogo;
        case "ZRX":
            return Ox;
        case "ZEC":
            return ZcashLogo;
        case "DAI":
            return daiLogo;
        case "KNC":
            return kncLogo;
        case "ATOM":
            return atomLogo;
        case "EOS":
            return EOS;
        case "LINK":
            return LINK;
        default:
            return null;
    }
}