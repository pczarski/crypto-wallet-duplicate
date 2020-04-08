//-----coin Logos-------
import ethLogo from "../../../node_modules/cryptocurrency-icons/svg/color/eth.svg";
import dashLogo from "../../../node_modules/cryptocurrency-icons/svg/color/dash.svg";
import liteLogo from "../../../node_modules/cryptocurrency-icons/svg/color/ltc.svg";
import bitcoinLogo from "../../../node_modules/cryptocurrency-icons/svg/color/btc.svg";
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
    }

]